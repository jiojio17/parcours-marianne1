/* Parcours Marianne — service worker.
   Stratégie :
   - NOUVEAUTÉS : réseau d'abord pour les fichiers applicatifs (html/js/css/manifest) ;
     en ligne, le site sert TOUJOURS le dernier build déployé. Le cache ne sert qu'en
     secours hors-ligne.
   - VIDEOS : cache-first mais estampillé par build : chaque déploiement rafraîchit le cache média.
   Chaque déploiement réécrit BUILD_STAMP par l'empreinte du commit → le SW est
   remplacé, les anciens caches sont purgés au activate. */
const BUILD_STAMP = '34020833334-1';
const SHELL = 'marianne-shell-' + BUILD_STAMP;
const VIDEOS = 'marianne-videos-' + BUILD_STAMP;
const SHELL_FILES = ['./', './index.html', './style.css', './data.js', './lesson-extras.js', './exam-bank.js', './app.js', './app-coach-online.js', './videos-catalog.js', './manifest.json', './downloads.html', './icons/icon.svg'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== VIDEOS).map(k => caches.delete(k)))).then(() => self.clients.claim())
));

async function networkFirst(request) {
  try {
    const r = await fetch(request, { cache: 'no-store' });
    if (r.ok) caches.open(SHELL).then(c => c.put(request, r.clone()));
    return r;
  } catch (_) {
    const hit = await caches.match(request);
    return hit || caches.match('./index.html');
  }
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  if (u.pathname.startsWith('/api/')) return;             // les API vivent toujours en ligne
  if (u.pathname.includes('/videos/') && (u.pathname.endsWith('.mp4') || u.pathname.endsWith('.jpg'))) {
    e.respondWith(caches.open(VIDEOS).then(c => c.match(e.request, { ignoreVary: true }).then(hit =>
      hit || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })
        .catch(() => c.match(e.request, { ignoreVary: true })))));
    return;
  }
  if (u.pathname.includes('/videos/') && u.pathname.endsWith('.vtt')) {
    e.respondWith(networkFirst(e.request));
    return;
  }
  e.respondWith(networkFirst(e.request));
});
