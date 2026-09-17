/* Parcours Marianne — service worker.
   Stratégie : « réseau d'abord » pour les fichiers applicatifs (le site sert toujours la
   dernière version en ligne), avec repli sur le cache quand l'appareil est hors-ligne.
   Permet d'utiliser l'application sans réseau (métro, salle d'attente, zone blanche). */

const VERSION = 'marianne-1';
const SHELL = 'shell-' + VERSION;
const FICHIERS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data/questions.js',
  './data/series.js',
  './data/site.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL)
      .then((c) => c.addAll(FICHIERS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const requete = e.request;
  if (requete.method !== 'GET') return;
  const url = new URL(requete.url);
  if (url.origin !== location.origin) return;   // vidéos et liens externes : réseau direct

  e.respondWith(
    fetch(requete)
      .then((reponse) => {
        if (reponse && reponse.ok) {
          const copie = reponse.clone();
          caches.open(SHELL).then((c) => c.put(requete, copie)).catch(() => {});
        }
        return reponse;
      })
      .catch(async () => {
        const enCache = await caches.match(requete, { ignoreSearch: true });
        if (enCache) return enCache;
        if (requete.mode === 'navigate') {
          const application = await caches.match('./index.html');
          if (application) return application;
        }
        return new Response('Hors-ligne : ce contenu n’a pas encore été consulté.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      })
  );
});
