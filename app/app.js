/* Parcours Marianne — moteur de quiz (vanilla JS, aucune dépendance) */
(function () {
  'use strict';

  var DATA = window.QUIZ_DATA;
  var QUESTIONS = DATA.questions;
  var META = DATA.meta;
  var THEMES = META.themes;
  var SERIES = window.QUIZ_SERIES;
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
  function buildRandomSession() {
    var taken = {};
    var ids = [];
    var mix = META.exam.mix;
    Object.keys(mix).forEach(function (theme) {
      var pool = shuffle(QUESTIONS.filter(function (q) { return q.theme === theme && !q.dupOf; }));
      pool.slice(0, mix[theme]).forEach(function (q) { taken[q.id] = true; ids.push(q.id); });
    });
    var sits = shuffle(QUESTIONS.filter(function (q) { return q.theme === 'situation'; }))
      .slice(0, META.exam.situations);
    var sitIds = sits.map(function (q) { return q.id; });
    // alternance connaissances / mises en situation
    var out = [], i = 0, j = 0;
    while (i < ids.length || j < sitIds.length) {
      if (i < ids.length) out.push(ids[i++]);
      if (i < ids.length) out.push(ids[i++]);
      if (j < sitIds.length) out.push(sitIds[j++]);
    }
    return buildSession(out, 'Tirage aléatoire');
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
    if (hash === '#/series') return renderSeries();
    if (hash === '#/revision') return renderRevisionHome();
    if ((m = hash.match(/^#\/revision\/(\w+)/))) return renderRevisionTheme(m[1]);
    if (hash === '#/questions') return renderQuestions();
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
          '<a class="btn" href="#/examen/aleatoire" data-random>Commencer un examen blanc</a>' +
          '<a class="btn secondary" href="#/series">Choisir une série</a>' +
          '<a class="btn ghost" href="#/revision">Réviser par thème</a>' +
        '</div>' +
      '</section>' +

      '<div class="grid cols-4" style="margin-top:16px">' +
        stat(META.total, 'questions au total') +
        stat(SERIES.length, 'séries d\'examen blanc') +
        stat(META.exam.durationMin + ' min', 'chronométré') +
        stat(best ? best + '/' + META.exam.questions : '—', 'meilleur score') +
      '</div>' +

      '<h2>Comment ça marche</h2>' +
      '<div class="grid cols-3">' +
        card('1. Choisissez un format', 'Examen complet de 40 questions chronométré, ou révision libre question par question.') +
        card('2. Répondez', '4 réponses possibles par question, une seule est correcte. Vous pouvez naviguer et revenir en arrière.') +
        card('3. Corrigez-vous', 'Score, détail par thème et explication de chaque réponse, avec rappel de la règle de droit.') +
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

  /* ---------- liste des séries ---------- */

  function renderSeries() {
    stopTimer();
    var hist = loadHistory();
    var bestBySerie = {};
    hist.forEach(function (h) { if (!bestBySerie[h.label] || h.score > bestBySerie[h.label]) bestBySerie[h.label] = h.score; });

    app.innerHTML =
      '<h1>Examens blancs</h1>' +
      '<p class="muted">' + SERIES.length + ' séries de ' + META.exam.questions + ' questions, chacune chronométrée sur ' +
        META.exam.durationMin + ' minutes, seuil ' + META.exam.pass + '/' + META.exam.questions + '. Les 40 questions sont tirées de la banque de ' +
        META.total + ' questions.</p>' +
      '<div class="btn-row" style="margin-bottom:16px"><a class="btn" href="#/examen/aleatoire">Tirage aléatoire complet</a></div>' +
      '<div class="serie-list">' + SERIES.map(function (s) {
        var best = bestBySerie[s.label];
        return '<a class="serie" href="#/examen/' + s.id + '"><span>' + esc(s.label) +
          '<small>' + META.exam.questions + ' questions · ' + META.exam.durationMin + ' min</small></span>' +
          (best ? '<span class="badge-score">' + best + '/40</span>' : '<span>→</span>') + '</a>';
      }).join('') + '</div>';
  }

  /* ---------- examen ---------- */

  function renderExam(serieId) {
    if (serieId === 'aleatoire') {
      session = buildRandomSession();
    } else {
      var s = SERIES.filter(function (x) { return x.id === serieId; })[0];
      if (!s) { go('#/series'); return; }
      session = buildSession(s.questionIds, s.label);
    }
    var total = session.items.length;

    app.innerHTML =
      '<div class="exam-bar">' +
        '<div><strong>' + esc(session.label) + '</strong><div class="muted" style="margin:0">' +
          total + ' questions · une seule bonne réponse · sans document</div></div>' +
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
      total: lastResult.total, passed: lastResult.passed, durationSec: durationSec
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
          '<a class="btn secondary" href="#/series">Autre série</a>' +
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
