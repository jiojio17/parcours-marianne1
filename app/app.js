/* Parcours Marianne — moteur de quiz (vanilla JS, aucune dépendance) */
(function () {
  'use strict';

  var DATA = window.QUIZ_DATA;
  var QUESTIONS = DATA.questions;
  var META = DATA.meta;
  var THEMES = META.themes;
  var QMAP = new Map(QUESTIONS.map(function (q) { return [q.id, q]; }));
  var app = document.getElementById('app');

  var HIST_KEY = 'pm.historique';
  var LAST_KEY = 'pm.dernierResultat';

  /* ---------------- utilitaires ---------------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) { return iso; }
  }

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HIST_KEY)) || []; } catch (e) { return []; }
  }
  function saveHistory(entry) {
    var h = loadHistory();
    h.unshift(entry);
    try { localStorage.setItem(HIST_KEY, JSON.stringify(h.slice(0, 60))); } catch (e) { /* stockage indisponible */ }
  }
  function themeLabel(t) { return (THEMES[t] && THEMES[t].label) || t; }

  var PROF_KEY = 'pm.profil';
  var STATS_KEY = 'pm.stats';

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* stockage indisponible */ }
  }
  function getProfile() { return loadJSON(PROF_KEY, null); }
  function getStats() { return loadJSON(STATS_KEY, {}); }
  function bumpStats(theme, ok) {
    var st = getStats();
    st[theme] = st[theme] || { ok: 0, total: 0 };
    st[theme].total++;
    if (ok) st[theme].ok++;
    saveJSON(STATS_KEY, st);
  }
  // Objectifs quotidiens conseillés selon le temps disponible (en minutes)
  var SESSION_SIZE = { 10: 6, 15: 10, 20: 14, 30: 20, 45: 30, 60: 40 };
  var THEME_ORDER = ['valeurs', 'institutions', 'droits', 'histoire', 'vivre'];

  /* ---------------- préparation d'un questionnaire ---------------- */

  function prepare(q) {
    var order = shuffle(q.options.map(function (_, i) { return i; }));
    return { q: q, order: order, correct: order.indexOf(q.correct) };
  }

  function buildSession(ids, label) {
    return {
      label: label,
      durationMin: META.exam.durationMin,
      pass: META.exam.pass,
      items: ids.map(function (id) { return prepare(QMAP.get(id)); }),
      answers: ids.map(function () { return null; }),
      current: 0,
      remaining: META.exam.durationMin * 60,
      startedAt: Date.now(),
      done: false
    };
  }

  // Tirage d'un examen à la volée, en respectant la répartition officielle.
  // Chaque appel compose une liste différente : les questions vues récemment
  // sont écartées, puis reviennent une fois le reste de la banque épuisé.
  var SEEN_KEY = 'pm.examVus';

  function loadSeen() {
    var s = { ids: [], ts: 0 };
    try { s = JSON.parse(localStorage.getItem(SEEN_KEY)) || s; } catch (e) { /* ignore */ }
    if (!Array.isArray(s.ids)) s.ids = [];
    return s;
  }
  function saveSeen(s) {
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }
  // Marquage des questions vues au cours des <cap> dernières tentatives.
  function seenPool(seen, cap) {
    var cutoff = seen.ts - cap * META.exam.questions;
    var recent = {};
    seen.ids.forEach(function (id, i) { if (i >= cutoff) recent[id] = true; });
    return recent;
  }
  // Pioche n questions d'un thème en évitant les questions récentes quand c'est possible.
  function pickQuestions(theme, n, exclude) {
    var pool = QUESTIONS.filter(function (q) {
      return q.theme === theme && !q.dupOf && !exclude[q.id];
    });
    if (pool.length < n) pool = QUESTIONS.filter(function (q) { return q.theme === theme && !q.dupOf; });
    return shuffle(pool).slice(0, n);
  }
  // Identifiants des dernières tentatives (sauts entre questions compris), plus récents d'abord.
  function recentHistoryIds(hist, count) {
    var out = [];
    for (var i = hist.length - 1; i >= 0 && out.length < count; i--) {
      var ids = hist[i] && hist[i].ids;
      for (var j = (ids ? ids.length - 1 : -1); j >= 0 && out.length < count; j--) out.push(ids[j]);
    }
    return out;
  }

  function buildRandomSession() {
    var seen = loadSeen();
    var hist = loadHistory();
    var cap = Math.min(META.exam.seriesCount, 3 + hist.length);
    var avoid = seenPool(seen, cap);
    recentHistoryIds(hist, 4 * META.exam.questions * 2).forEach(function (id) { avoid[id] = true; });

    var ids = [];
    var mix = META.exam.mix;
    Object.keys(mix).forEach(function (theme) {
      var picked = pickQuestions(theme, mix[theme], avoid);
      picked.forEach(function (q) { avoid[q.id] = true; ids.push(q.id); });
    });

    var sits = pickQuestions('situation', META.exam.situations, avoid);
    var sitIds = sits.map(function (q) { return q.id; });

    // alternance connaissances / mises en situation
    var out = [], i = 0, j = 0;
    while (i < ids.length || j < sitIds.length) {
      if (i < ids.length) out.push(ids[i++]);
      if (i < ids.length) out.push(ids[i++]);
      if (j < sitIds.length) out.push(sitIds[j++]);
    }

    var session = buildSession(out, 'Examen blanc · ' + new Date().toLocaleString('fr-FR', {
      dateStyle: 'short', timeStyle: 'short'
    }));

    // Mémorise ce tirage : il sera évité lors des prochaines tentatives.
    seen.ids = seen.ids.concat(out);
    if (seen.ids.length > META.exam.seriesCount * META.exam.questions) {
      seen.ids = seen.ids.slice(-META.exam.seriesCount * META.exam.questions);
    }
    seen.ts = seen.ids.length;
    saveSeen(seen);

    return session;
  }

  /* ---------------- minuteur ---------------- */

  var timerId = null;

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function startTimer(onTick, onTimeout) {
    stopTimer();
    var last = Date.now();
    timerId = setInterval(function () {
      var now = Date.now();
      session.remaining -= (now - last) / 1000;
      last = now;
      if (session.remaining <= 0) { session.remaining = 0; stopTimer(); onTick(); onTimeout(); return; }
      onTick();
    }, 500);
  }

  /* ---------------- navigation ---------------- */

  var session = null;
  var lastResult = null;
  try { lastResult = JSON.parse(sessionStorage.getItem(LAST_KEY)); } catch (e) { lastResult = null; }

  function go(hash) { location.hash = hash; }

  // Empêche de quitter un examen en cours par inadvertance (clic sur un lien du menu).
  document.addEventListener('click', function (e) {
    if (!session || session.done) return;
    var link = e.target.closest('a[href^="#/"]');
    if (!link) return;
    var dest = link.getAttribute('href');
    if (dest === location.hash || dest.indexOf('#/examen/') === 0) return;
    var started = session.answers.some(function (a) { return a !== null; });
    if (started && !confirm('Un examen est en cours. Le quitter maintenant ? Vos réponses seront perdues.')) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      stopTimer();
      session = null;
    }
  }, true);

  window.addEventListener('beforeunload', function (e) {
    if (session && !session.done && session.answers.some(function (a) { return a !== null; })) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  window.addEventListener('hashchange', function () {
    render();
    window.scrollTo(0, 0);
  });

  /* ---------------- vues ---------------- */

  function render() {
    var hash = location.hash || '#/';
    setNavActive(hash);
    var m;

    // le clavier de la révision ne doit pas rester actif sur les autres écrans
    if (!/^#\/revision\/\w+/.test(hash)) { revisionState = null; document.onkeydown = null; }

    if (hash === '#/' || hash === '') return renderHome();
    if (hash === '#/bilan') return renderBilan();
    if (hash === '#/parcours') return renderParcours();
    if (hash === '#/seance') return renderSeance();
    if (hash === '#/series') return renderSeries();
    if (hash === '#/revision') return renderRevisionHome();
    if ((m = hash.match(/^#\/revision\/(\w+)/))) return renderRevisionTheme(m[1]);
    if (hash === '#/questions') return renderQuestions();
    if (hash === '#/fiches') return renderFiches();
    if (hash === '#/capsules') return renderCapsules();
    if ((m = hash.match(/^#\/examen\/([\w-]+)/))) return renderExam(m[1]);
    if (hash === '#/resultat') return renderResult();
    if (hash === '#/historique') return renderHistorique();
    renderHome();
  }

  function setNavActive(hash) {
    Array.prototype.forEach.call(document.querySelectorAll('.topnav a'), function (a) {
      var href = a.getAttribute('href');
      var active = href === hash || (href !== '#/' && hash.indexOf(href) === 0);
      a.classList.toggle('active', active);
    });
  }

  /* ---------- accueil ---------- */

  function renderHome() {
    stopTimer();
    var profile = getProfile();
    var hist = loadHistory();
    var best = hist.reduce(function (m, h) { return Math.max(m, h.score); }, 0);
    var lastEntries = hist.slice(0, 5);

    app.innerHTML =
      '<section class="card">' +
        '<h1>Entraînez-vous à l\'examen civique, dans les conditions du jour J</h1>' +
        '<p class="muted">Examen blanc de <strong>' + META.exam.questions + ' questions</strong> en <strong>' +
          META.exam.durationMin + ' minutes</strong>, correction immédiate, seuil de réussite à <strong>' +
          META.exam.pass + '/' + META.exam.questions + ' (80 %)</strong> — comme à l\'examen officiel de naturalisation.</p>' +
        '<div class="btn-row">' +
          (profile
            ? '<a class="btn" href="#/seance">Lancer ma séance du jour</a>' +
              '<a class="btn secondary" href="#/examen/aleatoire">Examen blanc (40 questions · 45 min)</a>' +
              '<a class="btn ghost" href="#/bilan">Refaire mon bilan</a>'
            : '<a class="btn" href="#/bilan">Faire mon bilan de départ (1 min)</a>' +
              '<a class="btn secondary" href="#/examen/aleatoire">Examen blanc direct</a>' +
              '<a class="btn ghost" href="#/revision">Réviser par thème</a>') +
        '</div>' +
      '</section>' +

      '<div class="grid cols-4" style="margin-top:16px">' +
        stat(META.total, 'questions au total') +
        stat(META.exam.questions, 'questions par examen') +
        stat(META.exam.durationMin + ' min', 'chronométré') +
        stat(best ? best + '/' + META.exam.questions : '—', 'meilleur score') +
      '</div>' +

      (profile
        ? '<h2>Ton parcours</h2><div class="card"><p style="margin:0 0 10px">Ton programme est actif : ' +
          esc((LEVELS.filter(function (l) { return l.id === profile.level; })[0] || LEVELS[1]).label) +
          ' · ' + profile.minutes + ' min par jour' +
          (profile.examDate ? ' · examen le ' + esc(new Date(profile.examDate + 'T00:00:00').toLocaleDateString('fr-FR')) : '') +
          '.</p><div class="btn-row"><a class="btn secondary" href="#/parcours">Voir mon programme</a></div></div>'
        : '<h2>Un parcours, pas juste un quiz</h2><div class="card"><p style="margin:0 0 10px">' +
          'Réponds à 5 questions et Marianne construit ton programme : rythme quotidien, thèmes prioritaires, ' +
          'objectifs jusqu\'au jour de l\'examen. Tout reste sur ton appareil.</p>' +
          '<div class="btn-row"><a class="btn secondary" href="#/bilan">Faire mon bilan de départ</a></div></div>') +

      '<h2>Comment ça marche</h2>' +
      '<div class="grid cols-3">' +
        card('1. Choisissez un format', 'Examen complet de 40 questions chronométré, ou révision libre question par question.') +
        card('2. Répondez', '4 réponses possibles par question, une seule est correcte. Vous pouvez naviguer et revenir en arrière.') +
        card('3. Corrigez-vous', 'Score, détail par thème et explication de chaque réponse, avec rappel de la règle de droit.') +
      '</div>' +

      '<h2>Fiches et capsules</h2>' +
      '<div class="grid cols-2">' +
        '<a class="serie" href="#/fiches"><span>14 fiches de révision<small>Objectif, texte d\'écoute, cartes mémoire, mise en situation et piège fréquent</small></span><span>→</span></a>' +
        '<a class="serie" href="#/capsules"><span>22 capsules vidéo<small>18 révisions éclair + 4 mises en situation, avec sous-titres</small></span><span>→</span></a>' +
      '</div>' +

      '<h2>Ce que contient la banque</h2>' +
      '<div class="grid cols-3">' + Object.keys(THEMES).map(function (t) {
        return '<a class="serie" href="#/revision/' + t + '"><span>' + esc(THEMES[t].label) +
          '<small>' + (META.counts[t] || 0) + ' questions</small></span><span>→</span></a>';
      }).join('') + '</div>' +

      (lastEntries.length
        ? '<h2>Vos derniers essais</h2><div class="card"><table><thead><tr><th>Date</th><th>Examen</th><th>Score</th><th>Temps</th><th></th></tr></thead><tbody>' +
          lastEntries.map(function (h) {
            return '<tr><td>' + fmtDate(h.date) + '</td><td>' + esc(h.label) + '</td><td><strong>' + h.score + '/' + h.total +
              '</strong> ' + (h.passed ? '✅' : '❌') + '</td><td>' + fmtTime(h.durationSec) + '</td></tr>';
          }).join('') + '</tbody></table><p style="margin-top:12px"><a href="#/historique">Voir tout l\'historique</a></p></div>'
        : '') +

      '<h2>Format officiel de l\'examen</h2>' +
      '<div class="card"><table><tbody>' +
        row('Nombre de questions', META.exam.questions + ' (28 de connaissances + 12 mises en situation)') +
        row('Durée (examen officiel)', '45 minutes — entraînement ici sur ' + META.exam.durationMin + ' minutes') +
        row('Seuil de réussite', META.exam.pass + '/' + META.exam.questions + ' (80 %)') +
        row('Thèmes', 'Valeurs de la République · Institutions · Droits et devoirs · Histoire et culture · Vivre en société') +
      '</tbody></table></div>';
  }

  function stat(value, label) {
    return '<div class="stat"><b>' + esc(value) + '</b><span>' + esc(label) + '</span></div>';
  }
  function card(title, text) {
    return '<div class="card"><h3>' + esc(title) + '</h3><p class="muted" style="margin:0">' + esc(text) + '</p></div>';
  }
  function row(a, b) {
    return '<tr><th style="width:38%">' + esc(a) + '</th><td>' + esc(b) + '</td></tr>';
  }

  /* ---------- examens blancs ---------- */

  function renderSeries() {
    stopTimer();
    var hist = loadHistory();
    var best = hist.reduce(function (m, h) { return Math.max(m, h.score); }, 0);

    app.innerHTML =
      '<h1>Examens blancs</h1>' +
      '<p class="muted">Chaque examen pose ' + META.exam.questions + ' questions tirées <strong>au sort au moment du lancement</strong> ' +
        'dans la banque de ' + META.total + ' questions, en respectant la répartition officielle (' +
        META.exam.knowledge + ' connaissances + ' + META.exam.situations + ' mises en situation), ' +
        'chronométré sur ' + META.exam.durationMin + ' minutes, seuil ' + META.exam.pass + '/' + META.exam.questions + '.</p>' +

      '<section class="card">' +
        '<h2>Nouvel examen blanc</h2>' +
        '<p class="muted">Les questions vues récemment ne reviennent qu\'une fois le reste de la banque utilisé : ' +
        'vous ne retomberez pas deux fois de suite sur le même examen.</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="#/examen/aleatoire">Commencer un examen blanc</a>' +
          '<a class="btn secondary" href="#/revision">Réviser par thème</a>' +
          '<a class="btn ghost" href="#/historique">Voir mes essais</a>' +
        '</div>' +
      '</section>' +

      '<div class="grid cols-4" style="margin-top:16px">' +
        stat(META.exam.questions, 'questions par examen') +
        stat(META.exam.durationMin + ' min', 'chronométré') +
        stat(META.exam.pass + '/' + META.exam.questions, 'seuil de réussite') +
        stat(best ? best + '/' + META.exam.questions : '—', 'meilleur score') +
      '</div>' +

      '<h2>Comment les questions sont-elles choisies ?</h2>' +
      '<div class="card"><ul style="margin:0;padding-left:20px">' +
        '<li style="margin-bottom:6px">Le tirage respecte la répartition officielle de l\'examen civique, thème par thème.</li>' +
        '<li style="margin-bottom:6px">La position des réponses est mélangée à chaque question.</li>' +
        '<li style="margin-bottom:6px">Les questions posées lors des derniers examens sont écartées quand c\'est possible, ' +
          'puis reviennent petit à petit une fois la banque parcourue.</li>' +
        '<li style="margin-bottom:6px">Les questions signalées comme doublons ne sont jamais tirées deux fois dans le même examen.</li>' +
      '</ul><p class="muted" style="margin:12px 0 0">Résultat : deux tentatives successives posent des questions différentes — ' +
        'de quoi s\'entraîner sur l\'ensemble du programme au lieu de mémoriser un questionnaire figé.</p></div>' +
      '<p style="margin-top:16px"><a href="#/">← Retour à l\'accueil</a></p>';
  }

  /* ---------- examen ---------- */

  function renderExam(serieId) {
    // Tous les examens blancs sont désormais tirés au sort au lancement :
    // chaque tentative (même lancée depuis un raccourci de série) pose des
    // questions différentes. Les identifiants de série ne servent plus qu'à
    // garder des liens stables et l'historique par étiquette.
    void serieId;
    session = buildRandomSession();
    startExamUI(session.label, 'examen blanc · conditions réelles');
  }

  // Interface commune : examen blanc et séance guidée du parcours
  function startExamUI(label, subtitle) {
    var total = session.items.length;

    app.innerHTML =
      '<div class="exam-bar">' +
        '<div><strong>' + esc(label) + '</strong><div class="muted" style="margin:0">' +
          total + ' questions · ' + esc(subtitle) + ' · une seule bonne réponse</div></div>' +
        '<div class="timer" id="timer">--:--</div>' +
        '<div class="btn-row"><button class="btn secondary" id="btn-finish">Terminer l\'examen</button></div>' +
      '</div>' +
      '<div class="progress-line"><i id="progress" style="width:0%"></i></div>' +
      '<div class="question-card" id="qcard"></div>' +
      '<div class="card" style="margin-top:16px"><strong>Accès direct aux questions</strong>' +
        '<div class="grid-nav" id="qgrid"></div></div>';

    document.getElementById('btn-finish').addEventListener('click', function () { finishExam(false); });
    document.getElementById('qgrid').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]');
      if (!b) return;
      session.current = parseInt(b.getAttribute('data-i'), 10);
      paintQuestion();
    });

    paintQuestion();
    var timerEl = document.getElementById('timer');
    function tick() {
      var el = document.getElementById('timer');
      el = el || timerEl;
      el.textContent = fmtTime(session.remaining);
      el.className = 'timer' + (session.remaining <= 300 ? (session.remaining <= 60 ? ' critical' : ' warn') : '');
    }
    tick();
    startTimer(tick, function () { finishExam(true); });
  }

  function onKey(e) {
    if (!session || session.done || !document.getElementById('qcard')) return;
    if (['1', '2', '3', '4'].indexOf(e.key) >= 0) {
      var i = parseInt(e.key, 10) - 1;
      if (i < 4) { answer(i); }
    } else if (e.key === 'ArrowRight') { nav(1); }
    else if (e.key === 'ArrowLeft') { nav(-1); }
  }

  function nav(delta) {
    var n = session.items.length;
    session.current = Math.min(n - 1, Math.max(0, session.current + delta));
    paintQuestion();
  }

  function answer(choice) {
    session.answers[session.current] = choice;
    paintQuestion();
  }

  function paintQuestion() {
    var i = session.current;
    var item = session.items[i];
    var q = item.q;
    var card = document.getElementById('qcard');
    if (!card) return;

    card.innerHTML =
      '<div class="question-meta">' +
        '<span>Question ' + (i + 1) + ' / ' + session.items.length + '</span>' +
        '<span class="tag' + (q.theme === 'situation' ? ' situation' : '') + '">' + esc(THEMES[q.theme].short) + '</span>' +
        (q.page ? '<span>source : page ' + esc(q.page) + '</span>' : '') +
      '</div>' +
      '<div class="question-text">' + esc(q.q) + '</div>' +
      '<div class="options" id="opts">' + item.order.map(function (optIdx, pos) {
        var sel = session.answers[i] === pos;
        return '<button class="option' + (sel ? ' selected' : '') + '" data-pos="' + pos + '">' +
          '<span class="key">' + 'ABCD'[pos] + '</span><span>' + esc(q.options[optIdx]) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="btn-row" style="margin-top:16px">' +
        '<button class="btn ghost" id="btn-prev"' + (i === 0 ? ' disabled' : '') + '>← Précédente</button>' +
        '<button class="btn" id="btn-next"' + (i === session.items.length - 1 ? ' disabled' : '') + '>Suivante →</button>' +
      '</div>';

    card.querySelector('#opts').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-pos]');
      if (b) answer(parseInt(b.getAttribute('data-pos'), 10));
    });
    card.querySelector('#btn-prev').addEventListener('click', function () { nav(-1); });
    card.querySelector('#btn-next').addEventListener('click', function () { nav(1); });

    var answered = session.answers.filter(function (a) { return a !== null; }).length;
    var prog = document.getElementById('progress');
    if (prog) prog.style.width = (answered / session.items.length * 100) + '%';

    var grid = document.getElementById('qgrid');
    if (grid) {
      grid.innerHTML = session.items.map(function (_, k) {
        return '<button data-i="' + k + '" class="' + (k === i ? 'current ' : '') +
          (session.answers[k] !== null ? 'answered' : '') + '">' + (k + 1) + '</button>';
      }).join('');
    }

    var finish = document.getElementById('btn-finish');
    if (finish) finish.textContent = 'Terminer l\'examen (' + answered + '/' + session.items.length + ')';
  }

  function finishExam(auto) {
    var unanswered = session.answers.filter(function (a) { return a === null; }).length;
    if (!auto && unanswered > 0) {
      if (!confirm(unanswered + ' question(s) sans réponse. Terminer quand même ?')) return;
    }
    stopTimer();
    session.done = true;

    var score = 0;
    var byTheme = {};
    var details = [];
    session.items.forEach(function (item, i) {
      var q = item.q;
      var chosen = session.answers[i];
      var ok = chosen === item.correct;
      if (ok) score++;
      bumpStats(q.theme, ok);
      byTheme[q.theme] = byTheme[q.theme] || { ok: 0, total: 0 };
      byTheme[q.theme].total++;
      if (ok) byTheme[q.theme].ok++;
      details.push({
        id: q.id, theme: q.theme, question: q.q, ok: ok,
        chosen: chosen === null ? null : q.options[item.order[chosen]],
        correct: q.options[item.order[item.correct]],
        why: q.why, page: q.page || null
      });
    });

    var durationSec = Math.round((Date.now() - session.startedAt) / 1000);
    lastResult = {
      date: new Date().toISOString(),
      label: session.label,
      total: session.items.length,
      score: score,
      pass: session.pass,
      passed: score >= session.pass,
      durationSec: durationSec,
      byTheme: byTheme,
      details: details
    };
    try { sessionStorage.setItem(LAST_KEY, JSON.stringify(lastResult)); } catch (e) { /* ignore */ }
    saveHistory({
      date: lastResult.date, label: lastResult.label, score: score,
      total: lastResult.total, passed: lastResult.passed, durationSec: durationSec,
      ids: session.items.map(function (item) { return item.q.id; })
    });
    session = null;
    go('#/resultat');
  }

  /* ---------- résultats ---------- */

  function renderResult() {
    stopTimer();
    var r = lastResult;
    if (!r) { go('#/'); return; }
    var pct = Math.round(r.score / r.total * 100);
    var color = r.passed ? 'var(--vert)' : 'var(--rouge)';
    var grad = 'conic-gradient(' + color + ' ' + (pct * 3.6) + 'deg, #e6e6e6 0)';

    var themesHtml = Object.keys(r.byTheme).map(function (t) {
      var d = r.byTheme[t];
      var p = Math.round(d.ok / d.total * 100);
      return '<tr><td>' + esc(themeLabel(t)) + '</td><td>' + d.ok + '/' + d.total + '</td><td>' +
        '<div class="progress-line" style="margin:0"><i style="width:' + p + '%;background:' +
        (p >= 80 ? 'var(--vert)' : p >= 50 ? 'var(--orange)' : 'var(--rouge)') + '"></i></div></td></tr>';
    }).join('');

    var wrong = r.details.filter(function (d) { return !d.ok; });

    app.innerHTML =
      '<div class="card center">' +
        '<div class="score-ring" style="background:' + grad + '"><div class="inner">' +
          '<div><b>' + r.score + '</b><div class="muted">/ ' + r.total + '</div></div>' +
        '</div></div>' +
        '<div class="verdict ' + (r.passed ? 'pass' : 'fail') + '">' +
          (r.passed ? '✅ Examen réussi (' + pct + ' %)' : '❌ Examen non validé (' + pct + ' %)') + '</div>' +
        '<p class="muted">Seuil de réussite : ' + r.pass + '/' + r.total + ' (80 %). Temps utilisé : ' +
          fmtTime(r.durationSec) + ' — ' + esc(r.label) + '.</p>' +
        '<div class="btn-row center" style="justify-content:center">' +
          '<a class="btn" href="#/examen/aleatoire">Nouvel examen</a>' +
          '<a class="btn secondary" href="#/revision">Réviser les thèmes</a>' +
          '<a class="btn ghost" href="#/historique">Historique</a>' +
        '</div>' +
      '</div>' +

      '<h2>Résultat par thème</h2>' +
      '<div class="card"><table><thead><tr><th>Thème</th><th>Score</th><th>Niveau</th></tr></thead><tbody>' +
        themesHtml + '</tbody></table></div>' +

      '<h2>Corrigé détaillé (' + wrong.length + ' erreur' + (wrong.length > 1 ? 's' : '') + ')</h2>' +
      (wrong.length === 0
        ? '<div class="card">🎉 Aucune erreur : tous les thèmes sont maîtrisés.</div>'
        : wrong.map(function (d, i) {
            return '<div class="correction"><div class="q">' + (i + 1) + '. ' + esc(d.question) + '</div>' +
              '<div class="line bad">Votre réponse : ' + (d.chosen === null ? '<em>aucune réponse</em>' : esc(d.chosen)) + '</div>' +
              '<div class="line good">Bonne réponse : ' + esc(d.correct) + '</div>' +
              '<div class="explanation">' + esc(d.why) + '</div>' +
              (d.page ? '<div class="muted" style="margin-top:6px">Source : sujet d\'entraînement, page ' + esc(d.page) + '</div>' : '') +
            '</div>';
          }).join('')) +

      '<h2>Toutes les questions de cet examen</h2>' +
      '<div class="card">' + r.details.map(function (d, i) {
        return '<div style="padding:8px 0;border-bottom:1px solid var(--gris-300)">' +
          '<strong>' + (i + 1) + '.</strong> ' + esc(d.question) + ' ' +
          (d.ok ? '<span style="color:var(--vert)">✔</span>' : '<span style="color:var(--rouge)">✘</span>') +
          '<div class="muted">' + esc(d.correct) + '</div></div>';
      }).join('') + '</div>';
  }

  function renderHistorique() {
    var hist = loadHistory();
    app.innerHTML =
      '<h1>Historique de vos essais</h1>' +
      (hist.length === 0
        ? '<div class="card">Aucun essai enregistré pour l\'instant. <a href="#/examen/aleatoire">Commencer un examen blanc</a>.</div>'
        : '<div class="card"><table><thead><tr><th>Date</th><th>Examen</th><th>Score</th><th>Temps</th><th>Résultat</th></tr></thead><tbody>' +
          hist.map(function (h) {
            return '<tr><td>' + fmtDate(h.date) + '</td><td>' + esc(h.label) + '</td><td><strong>' + h.score + '/' + h.total +
              '</strong></td><td>' + fmtTime(h.durationSec) + '</td><td>' + (h.passed ? '✅ réussi' : '❌ échec') + '</td></tr>';
          }).join('') + '</tbody></table>' +
          '<p class="muted" style="margin-top:12px">Les résultats sont enregistrés uniquement dans votre navigateur.</p>' +
          '<button class="btn ghost" id="btn-clear">Effacer l\'historique</button></div>') +
      '<p style="margin-top:16px"><a href="#/">← Retour à l\'accueil</a></p>';

    var btn = document.getElementById('btn-clear');
    if (btn) btn.addEventListener('click', function () {
      if (confirm('Effacer tout l\'historique ?')) { localStorage.removeItem(HIST_KEY); render(); }
    });
  }

  /* ---------- révision ---------- */

  function renderRevisionHome() {
    stopTimer();
    app.innerHTML =
      '<h1>Réviser par thème</h1>' +
      '<p class="muted">Correction immédiate après chaque réponse, avec l\'explication de la règle.</p>' +
      '<div class="grid cols-2">' + Object.keys(THEMES).map(function (t) {
        return '<a class="serie" href="#/revision/' + t + '"><span>' + esc(THEMES[t].label) +
          '<small>' + (META.counts[t] || 0) + ' questions</small></span><span>→</span></a>';
      }).join('') + '</div>' +
      '<p style="margin-top:16px"><a href="#/questions">Voir la banque complète avec les corrigés →</a></p>';
  }

  var revisionState = null;

  function renderRevisionTheme(theme) {
    stopTimer();
    if (!THEMES[theme]) { go('#/revision'); return; }
    var pool = QUESTIONS.filter(function (q) { return q.theme === theme; });
    revisionState = { theme: theme, pool: shuffle(pool), i: 0, answered: null, score: 0, done: 0 };
    paintRevision();
  }

  function paintRevision() {
    var st = revisionState;
    if (!st) { go('#/revision'); return; }
    if (st.i >= st.pool.length) {
      app.innerHTML =
        '<h1>Thème terminé</h1>' +
        '<div class="card center"><p><strong>' + st.score + ' / ' + st.done + '</strong> bonnes réponses.</p>' +
        '<div class="btn-row" style="justify-content:center">' +
          '<a class="btn" href="#/revision">Choisir un autre thème</a>' +
          '<a class="btn secondary" href="#/examen/aleatoire">Passer un examen blanc</a></div></div>';
      return;
    }

    var question = st.pool[st.i];      // objet question complet
    var prep = prepare(question);

    app.innerHTML =
      '<div class="question-card">' +
        '<div class="question-meta">' +
          '<span>' + esc(THEMES[st.theme].short) + ' — question ' + (st.i + 1) + ' / ' + st.pool.length + '</span>' +
          '<span>score : ' + st.score + '/' + st.done + '</span>' +
        '</div>' +
        '<div class="question-text">' + esc(question.q) + '</div>' +
        '<div class="options" id="opts">' + prep.order.map(function (optIdx, pos) {
          return '<button class="option" data-pos="' + pos + '"><span class="key">' + 'ABCD'[pos] +
            '</span><span>' + esc(question.options[optIdx]) + '</span></button>';
        }).join('') + '</div>' +
        '<div id="feedback"></div>' +
        '<div class="btn-row" style="margin-top:16px"><button class="btn" id="btn-next" disabled>Question suivante →</button>' +
        '<a class="btn ghost" href="#/revision">Changer de thème</a></div>' +
        '<p class="muted" style="margin-top:10px">Astuce : touches 1 à 4 pour répondre.</p>' +
      '</div>';

    var opts = document.getElementById('opts');
    var next = document.getElementById('btn-next');

    function choose(pos) {
      if (revisionState.answered !== null) return;
      revisionState.answered = pos;
      var ok = pos === prep.correct;
      revisionState.done++;
      if (ok) revisionState.score++;
      bumpStats(question.theme, ok);
      Array.prototype.forEach.call(opts.querySelectorAll('.option'), function (b) {
        var p = parseInt(b.getAttribute('data-pos'), 10);
        b.disabled = true;
        if (p === prep.correct) b.classList.add('correct');
        else if (p === pos) b.classList.add('wrong');
      });
      document.getElementById('feedback').innerHTML =
        '<div class="explanation"><strong>' + (ok ? 'Bonne réponse !' : 'Réponse incorrecte') + '</strong><br>' +
        'Bonne réponse : <strong>' + esc(question.options[question.correct]) + '</strong><br>' + esc(question.why) + '</div>';
      next.disabled = false;
      next.focus();
    }

    opts.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-pos]');
      if (b) choose(parseInt(b.getAttribute('data-pos'), 10));
    });
    next.addEventListener('click', function () {
      revisionState.i++; revisionState.answered = null; paintRevision();
      window.scrollTo(0, 0);
    });

    document.onkeydown = function (e) {
      if (!revisionState) return;
      if (revisionState.answered === null && ['1', '2', '3', '4'].indexOf(e.key) >= 0) {
        choose(parseInt(e.key, 10) - 1);
      } else if (revisionState.answered !== null && (e.key === 'Enter' || e.key === 'ArrowRight')) {
        revisionState.i++; revisionState.answered = null; paintRevision(); window.scrollTo(0, 0);
      }
    };
    void focus;
  }


  /* ---------- bilan de départ et parcours personnalisé ---------- */

  var bilan = null;

  var LEVELS = [
    { id: 'debut', label: 'Je découvre', help: 'Je pars de zéro ou presque.' },
    { id: 'reperes', label: 'J\'ai quelques repères', help: 'Je connais certaines notions.' },
    { id: 'consolider', label: 'Je veux consolider', help: 'Je comprends déjà l\'essentiel.' }
  ];
  var MINUTES = [10, 15, 20, 30, 45, 60];

  function renderBilan() {
    stopTimer();
    if (!bilan) {
      var p = getProfile();
      bilan = {
        step: 0,
        level: p ? p.level : null,
        examDate: p && p.examDate ? p.examDate : '',
        minutes: p ? p.minutes : 30,
        priorities: p ? p.priorities.slice() : []
      };
    }
    var b = bilan;
    var card = document.getElementById('bilan-card');
    var html = '';

    if (b.step === 0) {
      html = '<div class="question-meta"><span>Étape 1 / 3 · ton point de départ</span></div>' +
        '<div class="question-text">Comment te sens-tu aujourd\'hui ?</div><div class="options">' +
        LEVELS.map(function (l) {
          return '<button class="option' + (b.level === l.id ? ' selected' : '') + '" data-level="' + l.id + '">' +
            '<span class="key">' + (b.level === l.id ? '✓' : '') + '</span><span><strong>' + esc(l.label) +
            '</strong><br><span class="muted">' + esc(l.help) + '</span></span></button>';
        }).join('') + '</div>';
    } else if (b.step === 1) {
      html = '<div class="question-meta"><span>Étape 2 / 3 · ton calendrier</span></div>' +
        '<div class="question-text">Combien de temps peux-tu donner par jour ?</div>' +
        '<p class="muted">Et, si tu en as une, indique la date de ton examen : le programme s\'y adaptera.</p>' +
        '<div class="chips">' + MINUTES.map(function (m) {
          return '<button class="chip' + (b.minutes === m ? ' active' : '') + '" data-min="' + m + '">' + m + ' min</button>';
        }).join('') + '</div>' +
        '<p style="margin-top:16px"><label class="muted" for="exam-date">Date de l\'examen (facultative)</label><br>' +
        '<input id="exam-date" type="date" value="' + esc(b.examDate) + '" style="padding:10px;border:1px solid var(--gris-300);border-radius:8px;font-family:inherit;font-size:1rem"></p>';
    } else {
      html = '<div class="question-meta"><span>Étape 3 / 3 · tes priorités</span></div>' +
        '<div class="question-text">Quels thèmes veux-tu renforcer ?</div>' +
        '<p class="muted">Tu peux en choisir plusieurs. Laisse vide si tu n\'as pas de préférence : le programme te guidera.</p>' +
        '<div class="chips">' + THEME_ORDER.map(function (t) {
          var on = b.priorities.indexOf(t) >= 0;
          return '<button class="chip' + (on ? ' active' : '') + '" data-theme="' + t + '">' + esc(THEMES[t].short) + '</button>';
        }).join('') + '</div>' +
        '<label class="muted" style="display:flex;gap:8px;align-items:flex-start;margin-top:16px">' +
        '<input type="checkbox" checked disabled> Tes réponses servent uniquement à construire le programme sur cet appareil ; rien n\'est envoyé ni conservé ailleurs.</label>';
    }

    var canNext = (b.step === 0 && b.level) || b.step === 1 || b.step === 2;

    app.innerHTML = '<div class="card" id="bilan-card">' +
      '<div class="progress-line"><i style="width:' + ((b.step + 1) / 3 * 100) + '%"></i></div>' +
      html +
      '<div class="btn-row" style="margin-top:18px">' +
        (b.step > 0 ? '<button class="btn ghost" id="btn-back">← Retour</button>' : '') +
        '<button class="btn" id="btn-next"' + (canNext ? '' : ' disabled') + '>' +
        (b.step === 2 ? 'Créer mon parcours personnalisé' : 'Continuer →') + '</button>' +
      '</div></div>' +
      '<p class="muted" style="margin-top:12px">Bilan de départ · 1 minute · gratuit et sans compte</p>';

    card = document.getElementById('bilan-card');
    card.addEventListener('click', function (e) {
      var lvl = e.target.closest('button[data-level]');
      var min = e.target.closest('button[data-min]');
      var th = e.target.closest('button[data-theme]');
      if (lvl) { bilan.level = lvl.getAttribute('data-level'); renderBilan(); }
      if (min) {
        bilan.minutes = parseInt(min.getAttribute('data-min'), 10);
        var dateEl = document.getElementById('exam-date');
        if (dateEl) bilan.examDate = dateEl.value;
        renderBilan();
      }
      if (th) {
        var t = th.getAttribute('data-theme');
        var i = bilan.priorities.indexOf(t);
        if (i >= 0) bilan.priorities.splice(i, 1); else bilan.priorities.push(t);
        var dateEl2 = document.getElementById('exam-date');
        if (dateEl2) bilan.examDate = dateEl2.value;
        renderBilan();
      }
    });
    var dateInput = document.getElementById('exam-date');
    if (dateInput) dateInput.addEventListener('change', function () { bilan.examDate = dateInput.value; });
    document.getElementById('btn-back') && document.getElementById('btn-back').addEventListener('click', function () {
      var d = document.getElementById('exam-date'); if (d) bilan.examDate = d.value;
      bilan.step--; renderBilan();
    });
    document.getElementById('btn-next').addEventListener('click', function () {
      var d = document.getElementById('exam-date'); if (d) bilan.examDate = d.value;
      if (bilan.step < 2) { bilan.step++; renderBilan(); return; }
      saveJSON(PROF_KEY, {
        level: bilan.level || 'reperes',
        examDate: bilan.examDate || '',
        minutes: bilan.minutes,
        priorities: bilan.priorities.slice(),
        createdAt: new Date().toISOString()
      });
      bilan = null;
      go('#/parcours');
    });
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return null;
    return Math.ceil((d - new Date()) / 86400000);
  }

  function sessionSize(minutes) {
    return SESSION_SIZE[minutes] || Math.max(6, Math.round(minutes * 0.7));
  }

  // Ordre de travail : thèmes choisis au bilan, puis les thèmes les moins maîtrisés.
  function orderedThemes(profile) {
    var stats = getStats();
    var prio = profile.priorities.filter(function (t) { return THEME_ORDER.indexOf(t) >= 0; });
    var rest = THEME_ORDER.filter(function (t) { return prio.indexOf(t) < 0; });
    rest.sort(function (a, b) {
      var ra = stats[a] && stats[a].total ? stats[a].ok / stats[a].total : -1;
      var rb = stats[b] && stats[b].total ? stats[b].ok / stats[b].total : -1;
      return ra - rb;
    });
    return prio.concat(rest);
  }

  // Séance du jour : questions des thèmes prioritaires + quelques mises en situation.
  function buildDailySession(profile) {
    var size = sessionSize(profile.minutes);
    var themes = orderedThemes(profile).slice(0, 3);
    var sitsCount = Math.max(2, Math.round(size * 0.2));
    var ids = [];
    var sitIds = shuffle(QUESTIONS.filter(function (q) { return q.theme === 'situation'; }))
      .slice(0, sitsCount).map(function (q) { return q.id; });
    var remaining = size - sitIds.length;
    var perTheme = Math.ceil(remaining / themes.length);
    themes.forEach(function (t) {
      if (ids.length >= remaining) return;
      var pool = shuffle(QUESTIONS.filter(function (q) { return q.theme === t && !q.dupOf; }));
      pool.slice(0, Math.min(perTheme, remaining - ids.length)).forEach(function (q) { ids.push(q.id); });
    });
    var all = ids.concat(sitIds);
    while (all.length < size) {
      var extra = shuffle(QUESTIONS.filter(function (q) { return !q.dupOf && all.indexOf(q.id) < 0; }))[0];
      if (!extra) break;
      all.push(extra.id);
    }
    return buildSession(shuffle(all), 'Séance du jour');
  }

  function renderSeance() {
    var profile = getProfile();
    if (!profile) { go('#/bilan'); return; }
    session = buildDailySession(profile);
    // pas de chronomètre serré en séance d'entraînement : on chronomètre sur la base d'une minute par question
    session.durationMin = session.items.length;
    session.remaining = session.items.length * 60;
    startExamUI('Séance du jour', 'entraînement guidé');
  }

  function renderParcours() {
    stopTimer();
    var profile = getProfile();
    if (!profile) {
      app.innerHTML = '<h1>Mon parcours</h1>' +
        '<div class="card"><p>Pour te proposer un programme adapté (rythme, priorités, révisions), commence par le ' +
        '<strong>bilan de départ</strong> : une minute, cinq questions, sans compte.</p>' +
        '<div class="btn-row"><a class="btn" href="#/bilan">Faire mon bilan de départ</a>' +
        '<a class="btn ghost" href="#/examen/aleatoire">Passer directement un examen blanc</a></div></div>';
      return;
    }

    var stats = getStats();
    var hist = loadHistory();
    var totalAnswered = Object.keys(stats).reduce(function (n, t) { return n + stats[t].total; }, 0);
    var totalOk = Object.keys(stats).reduce(function (n, t) { return n + stats[t].ok; }, 0);
    var rate = totalAnswered ? Math.round(totalOk / totalAnswered * 100) : 0;
    var best = hist.reduce(function (m, h) { return Math.max(m, h.score); }, 0);
    var days = daysUntil(profile.examDate);
    var size = sessionSize(profile.minutes);
    var themes = orderedThemes(profile);
    var levelLabel = (LEVELS.filter(function (l) { return l.id === profile.level; })[0] || LEVELS[1]).label;

    var plan = themes.map(function (t) {
      var st = stats[t] || { ok: 0, total: 0 };
      var p = st.total ? Math.round(st.ok / st.total * 100) : 0;
      var prio = profile.priorities.indexOf(t) >= 0;
      return '<tr><td>' + esc(THEMES[t].label) + (prio ? ' <span class="tag">prioritaire</span>' : '') +
        '</td><td>' + st.ok + '/' + st.total + '</td>' +
        '<td><div class="progress-line" style="margin:0"><i style="width:' + p + '%;background:' +
        (st.total === 0 ? 'var(--gris-300)' : p >= 80 ? 'var(--vert)' : p >= 50 ? 'var(--orange)' : 'var(--rouge)') +
        '"></i></div></td><td><a href="#/revision/' + t + '">réviser</a></td></tr>';
    }).join('');

    var countdown = days === null
      ? 'Date d\'examen non fixée : on travaille le socle, thème par thème.'
      : days > 1 ? 'J−' + days + ' avant ton examen. Vise 36/40 aux examens blancs pour avoir de la marge.'
      : days === 1 ? 'C\'est demain ! Aujourd\'hui : une révision légère et une bonne nuit.'
      : 'Jour J. Respire, lis bien chaque question, réponds à tout.';

    var strategy = profile.level === 'debut'
      ? 'Tu démarres : enchaîne d\'abord des séances courtes de révision, puis un examen blanc par semaine. L\'objectif n\'est pas le score mais la régularité.'
      : profile.level === 'reperes'
        ? 'Tu as des bases : alterne une séance d\'entraînement et un examen blanc, et relis systématiquement l\'explication de chaque erreur.'
        : 'Tu maîtrises l\'essentiel : vise la vitesse. Un examen blanc chronométré tous les deux jours, et ne révise que les thèmes sous 80 %.';

    var recommended = [];
    if (days !== null && days <= 7) {
      recommended.push('Un examen blanc chronométré (45 min) chaque jour jusqu\'au jour J.');
      recommended.push('Le jour précédent : pas de nouvel examen, relis tes erreurs et dors tôt.');
    } else {
      recommended.push('Une séance guidée de ' + size + ' questions par jour (environ ' + profile.minutes + ' min).');
      recommended.push('Un examen blanc complet tous les 3 jours pour mesurer ta progression.');
    }
    if (themes.length) recommended.push('Priorité de révision : ' + themes.slice(0, 3).map(function (t) { return THEMES[t].short; }).join(', ') + '.');

    app.innerHTML =
      '<div class="card">' +
        '<div class="question-meta"><span class="tag">Mon parcours</span><span>niveau : ' + esc(levelLabel) +
        '</span><span>' + profile.minutes + ' min / jour</span></div>' +
        '<h1>Ta séance du jour</h1>' +
        '<p class="muted">' + esc(countdown) + '</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="#/seance">Lancer ' + size + ' questions guidées</a>' +
          '<a class="btn secondary" href="#/examen/aleatoire">Examen blanc (40 questions · 45 min)</a>' +
          '<a class="btn ghost" href="#/bilan">Refaire mon bilan</a>' +
        '</div>' +
      '</div>' +

      '<div class="grid cols-4" style="margin-top:16px">' +
        stat(totalAnswered, 'questions travaillées') +
        stat(rate + ' %', 'taux de réussite') +
        stat(best ? best + '/40' : '—', 'meilleur examen blanc') +
        stat(days === null ? '—' : (days + ' j'), 'avant l\'examen') +
      '</div>' +

      '<h2>Ton plan</h2>' +
      '<div class="card"><ul style="margin:0;padding-left:20px">' +
        recommended.map(function (r) { return '<li style="margin-bottom:6px">' + esc(r) + '</li>'; }).join('') +
      '</ul><p class="muted" style="margin:12px 0 0">' + esc(strategy) + '</p></div>' +

      '<h2>Où tu en es, thème par thème</h2>' +
      '<div class="card"><table><thead><tr><th>Thème</th><th>Score</th><th>Maîtrise</th><th></th></tr></thead>' +
      '<tbody>' + plan + '</tbody></table>' +
      '<p class="muted" style="margin:12px 0 0">Les thèmes sous 80 % sont proposés en priorité dans ta séance du jour.</p></div>' +

      (hist.length > 1 ? '<p style="margin-top:16px"><a href="#/historique">Voir l\'historique de mes examens blancs →</a></p>' : '') +
      '<p class="muted" style="margin-top:12px">Ton profil reste sur cet appareil (aucune donnée envoyée). ' +
      '<button class="btn ghost" id="btn-reset" style="padding:4px 10px;font-size:.82rem">Effacer mon profil</button></p>';

    var reset = document.getElementById('btn-reset');
    reset && reset.addEventListener('click', function () {
      if (confirm('Effacer ton profil et tes statistiques ?')) {
        try { localStorage.removeItem(PROF_KEY); localStorage.removeItem(STATS_KEY); } catch (e) { /* ignore */ }
        bilan = null;
        render();
      }
    });
  }


  /* ---------- fiches et capsules du site Marianne ---------- */

  function siteData() { return window.SITE_DATA || null; }

  function renderFiches() {
    stopTimer();
    var d = siteData();
    if (!d) {
      app.innerHTML = '<h1>Fiches</h1><div class="card">Les fiches ne sont pas disponibles : relance <code>npm run build</code>.</div>';
      return;
    }
    app.innerHTML =
      '<h1>Les 14 fiches du parcours</h1>' +
      '<p class="muted">Reprises du site <a href="' + esc(d.origine) + '" target="_blank" rel="noopener">Marianne · Examen civique</a> : ' +
        'pour chaque journée, l\'objectif, le texte d\'écoute, quatre cartes mémoire, un rappel actif, ' +
        'une mise en situation et le piège fréquent.</p>' +
      '<div class="btn-row" style="margin-bottom:16px">' +
        '<a class="btn secondary" href="#/capsules">Voir les 22 capsules vidéo</a></div>' +
      d.lecons.map(function (l) {
        return '<details class="qa"><summary>' +
            '<span class="tag">Fiche ' + l.id + '</span> ' + esc(l.title) +
            ' <span class="muted">· ' + esc(l.theme) + ' · ' + l.videoMin + ' min de vidéo</span>' +
          '</summary>' +
          '<p class="muted" style="margin:10px 0 4px"><strong>Objectif :</strong> ' + esc(l.objective) + '</p>' +
          '<p style="margin:0 0 10px"><em>' + esc(l.intro) + '</em></p>' +
          '<h3 style="margin:10px 0 6px">À écouter</h3>' +
          '<p style="margin:0 0 12px">' + esc(l.listen) + '</p>' +
          '<h3 style="margin:10px 0 6px">Cartes mémoire</h3>' +
          '<table><tbody>' + l.facts.map(function (f) {
            return '<tr><th style="width:32%">' + esc(f.front) + '</th><td>' + esc(f.back) + '</td></tr>';
          }).join('') + '</tbody></table>' +
          (l.warmup ? '<h3 style="margin:14px 0 6px">Rappel actif</h3><p style="margin:0">' + esc(l.warmup) + '</p>' : '') +
          (l.retain ? '<p class="explanation" style="margin-top:10px"><strong>À retenir :</strong> ' + esc(l.retain) + '</p>' : '') +
          (l.scenario ? '<h3 style="margin:14px 0 6px">Mise en situation</h3><p style="margin:0 0 8px">' + esc(l.scenario) + '</p>' +
            '<ol type="A">' + l.scenarioOptions.map(function (o, i) {
              return '<li class="' + (i === l.scenarioCorrect ? 'ok' : '') + '">' + esc(o) + (i === l.scenarioCorrect ? ' ✔' : '') + '</li>';
            }).join('') + '</ol>' : '') +
          '<h3 style="margin:14px 0 6px">Question de contrôle</h3>' +
          '<p style="margin:0 0 8px"><strong>' + esc(l.quiz.q) + '</strong></p>' +
          '<ol type="A">' + l.quiz.options.map(function (o, i) {
            return '<li class="' + (i === l.quiz.correct ? 'ok' : '') + '">' + esc(o) + (i === l.quiz.correct ? ' ✔' : '') + '</li>';
          }).join('') + '</ol>' +
          '<p class="muted" style="margin:8px 0 0">' + esc(l.quiz.why) + '</p>' +
          (l.confusion ? '<p class="muted" style="margin:8px 0 0"><strong>Piège fréquent :</strong> ' + esc(l.confusion) + '</p>' : '') +
          '<p style="margin:12px 0 0"><a href="' + esc(l.video) + '" target="_blank" rel="noopener">▶ Voir la capsule « ' +
            esc(l.videoTitle) + ' »</a></p>' +
        '</details>';
      }).join('') +
      '<p class="muted" style="margin-top:16px">Contenus repris du site d\'origine, sans modification.</p>';
  }

  function renderCapsules() {
    stopTimer();
    var d = siteData();
    if (!d) { app.innerHTML = '<h1>Capsules</h1><div class="card">Catalogue indisponible.</div>'; return; }
    var groupes = [
      { kind: 'qa', titre: 'Révisions éclair', desc: 'Une capsule par série de questions, avec la correction commentée.' },
      { kind: 'sit', titre: 'Mises en situation', desc: 'Des scènes concrètes : quel est le bon réflexe ?' }
    ];
    var total = d.capsules.reduce(function (n, c) { return n + c.durationMin; }, 0);
    app.innerHTML =
      '<h1>Les capsules vidéo</h1>' +
      '<p class="muted">' + d.capsules.length + ' capsules (environ ' + Math.round(total) + ' minutes), hébergées sur ' +
        '<a href="' + esc(d.origine) + '" target="_blank" rel="noopener">' + esc(d.origine.replace(/^https?:\/\//, '')) + '</a>. ' +
        'Chaque capsule existe en vidéo et en sous-titres. Les 36 fichiers de sous-titres sont aussi archivés dans le dépôt ' +
        '(<code>extraction/site/videos/</code>) pour la recherche et la révision écrite.</p>' +
      groupes.map(function (g) {
        var liste = d.capsules.filter(function (c) { return c.kind === g.kind; });
        if (!liste.length) return '';
        return '<h2>' + esc(g.titre) + ' <span class="muted">(' + liste.length + ')</span></h2>' +
          '<p class="muted">' + esc(g.desc) + '</p>' +
          '<div class="card"><table><thead><tr><th>Capsule</th><th>Thèmes</th><th>Questions</th><th>Durée</th><th>Liens</th></tr></thead><tbody>' +
          liste.map(function (c) {
            return '<tr><td><strong>' + esc(c.title) + '</strong></td>' +
              '<td>' + esc(c.themes.join(', ')) + '</td>' +
              '<td>' + c.count + '</td>' +
              '<td>' + c.durationMin + ' min</td>' +
              '<td><a href="' + esc(c.mp4) + '" target="_blank" rel="noopener">▶ vidéo</a> · ' +
                  '<a href="' + esc(c.vtt) + '" target="_blank" rel="noopener">sous-titres</a></td></tr>';
          }).join('') + '</tbody></table></div>';
      }).join('') +
      '<h2>Ce que fait le site d\'origine</h2>' +
      '<div class="card"><ul style="margin:0;padding-left:20px">' +
        d.fonctionnalites.map(function (f) { return '<li style="margin-bottom:6px">' + esc(f) + '</li>'; }).join('') +
      '</ul></div>' +
      '<p style="margin-top:16px"><a href="#/fiches">← Voir les 14 fiches</a></p>';
  }

  /* ---------- banque complète ---------- */

  function renderQuestions() {
    stopTimer();
    document.onkeydown = null;
    var html = '<h1>Toutes les questions et leurs corrigés</h1>' +
      '<p class="muted">' + META.total + ' questions issues des sujets d\'entraînement, avec la bonne réponse et son explication.</p>';

    Object.keys(THEMES).forEach(function (t) {
      var pool = QUESTIONS.filter(function (q) { return q.theme === t; });
      html += '<h2>' + esc(THEMES[t].label) + ' <span class="muted">(' + pool.length + ')</span></h2>';
      html += pool.map(function (q) {
        return '<details class="qa"><summary>' + esc(q.q) + '</summary>' +
          '<ol type="A">' + q.options.map(function (o, i) {
            return '<li class="' + (i === q.correct ? 'ok' : '') + '">' + esc(o) + (i === q.correct ? ' ✔' : '') + '</li>';
          }).join('') + '</ol>' +
          '<div class="why">' + esc(q.why) + '</div>' +
          (q.page ? '<div class="src">Sujet d\'entraînement : page ' + esc(q.page) + '</div>' : '') +
        '</details>';
      }).join('');
    });
    app.innerHTML = html;
  }

  /* ---------------- démarrage ---------------- */

  document.addEventListener('keydown', onKey);
  render();
})();
