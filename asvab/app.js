// ===== Utilities =====
const $ = (s, el = document) => el.querySelector(s);
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = (n) => (Number.isInteger(n) ? n.toLocaleString() : (+n.toFixed(2)).toLocaleString());
const money = (n) => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Build a 4-choice question from a correct value and candidate distractors
function build(q, correct, distractors, e, show = fmt) {
  const seen = new Set([show(correct)]);
  const wrong = [];
  for (const d of distractors) {
    const s = show(d);
    if (!seen.has(s) && wrong.length < 3 && (typeof d !== "number" || isFinite(d))) { seen.add(s); wrong.push(s); }
  }
  let bump = 1;
  while (wrong.length < 3) {
    const s = show(typeof correct === "number" ? correct + bump * (bump % 2 ? 1 : -1) * Math.max(1, Math.round(Math.abs(correct) * 0.1)) : correct + "?");
    if (!seen.has(s)) { seen.add(s); wrong.push(s); }
    bump++;
  }
  const c = shuffle([show(correct), ...wrong]);
  return { q, c, a: c.indexOf(show(correct)), e, gen: true };
}

// ===== Generated: Arithmetic Reasoning =====
const NAMES = ["Alex", "Jordan", "Sam", "Taylor", "Morgan", "Casey", "Riley", "Jamie"];
const AR_GEN = [
  () => { const p = pick([10, 15, 20, 25, 30, 40]), price = rand(4, 30) * 5; const ans = price * (1 - p / 100);
    return build(`A jacket costs ${money(price)}. It is on sale for ${p}% off. What is the sale price?`, ans, [price * p / 100, price - p, price * (1 + p / 100), ans - 5], `Discount = ${p}% × ${money(price)} = ${money(price * p / 100)}. Sale price = ${money(price)} − ${money(price * p / 100)} = ${money(ans)}.`, money); },
  () => { const r = rand(4, 13) * 5, t = rand(2, 6); const d = r * t;
    return build(`A convoy travels at ${r} mph for ${t} hours. How many miles does it travel?`, d, [r + t, d / 2, d + r, r * (t + 1)], `Distance = rate × time = ${r} × ${t} = ${d} miles.`, (n) => fmt(n) + " miles"); },
  () => { const n = pick(NAMES), scores = Array.from({ length: 4 }, () => rand(70, 98)); const target = rand(80, 92); const need = target * 5 - scores.reduce((a, b) => a + b, 0);
    if (need < 50 || need > 100) return AR_GEN[1]();
    return build(`${n}'s first four test scores are ${scores.join(", ")}. What score is needed on the fifth test to average ${target}?`, need, [target, need + 5, need - 4, Math.round(scores.reduce((a, b) => a + b) / 4)], `Total needed = ${target} × 5 = ${target * 5}. Current total = ${scores.reduce((a, b) => a + b)}. Needed = ${need}.`); },
  () => { const P = rand(2, 20) * 500, r = pick([2, 3, 4, 5, 6]), t = rand(2, 5); const I = P * r / 100 * t;
    return build(`How much simple interest is earned on ${money(P)} at ${r}% per year for ${t} years?`, I, [P * r / 100, I * 2, I + P, P * r * t / 1000], `I = P × r × t = ${money(P)} × ${r / 100} × ${t} = ${money(I)}.`, money); },
  () => { const a = rand(2, 6), b = rand(2, 6), total = (a + b) * rand(3, 12);
    return build(`A unit has soldiers and officers in a ratio of ${a}:${b}. If there are ${total} people total, how many are officers?`, total / (a + b) * b, [total / (a + b) * a, total / 2, total / b, total - b], `Parts = ${a + b}. Each part = ${total} ÷ ${a + b} = ${total / (a + b)}. Officers = ${b} × ${total / (a + b)} = ${total / (a + b) * b}.`); },
  () => { const h1 = pick([2, 3, 4, 6]), h2 = pick([3, 4, 6, 12].filter((x) => x !== h1)); const t = (h1 * h2) / (h1 + h2);
    return build(`One worker can paint a room in ${h1} hours; another can do it in ${h2} hours. Working together, how long will it take?`, t, [(h1 + h2) / 2, h1 + h2, Math.abs(h2 - h1), Math.min(h1, h2)], `Combined rate = 1/${h1} + 1/${h2} = ${h1 + h2}/${h1 * h2} room/hr. Time = ${h1 * h2}/${h1 + h2} = ${fmt(t)} hours.`, (n) => fmt(n) + " hours"); },
  () => { const cost = rand(3, 12) * 0.25, qty = rand(6, 24), paid = Math.ceil((cost * qty) / 20) * 20; const change = paid - cost * qty;
    return build(`Pens cost ${money(cost)} each. You buy ${qty} pens and pay with ${money(paid)}. How much change do you get?`, change, [cost * qty, change + cost, change - 1, paid - qty], `Cost = ${qty} × ${money(cost)} = ${money(cost * qty)}. Change = ${money(paid)} − ${money(cost * qty)} = ${money(change)}.`, money); },
  () => { const old = rand(4, 20) * 10, pct = pick([10, 20, 25, 50]), up = Math.random() < 0.5; const nw = up ? old * (1 + pct / 100) : old * (1 - pct / 100);
    return build(`A value changes from ${fmt(old)} to ${fmt(nw)}. What is the percent ${up ? "increase" : "decrease"}?`, pct, [Math.round(Math.abs(nw - old) / nw * 100), Math.abs(nw - old), pct * 2, pct / 2], `Percent change = |${fmt(nw)} − ${fmt(old)}| ÷ ${fmt(old)} × 100 = ${pct}%. Always divide by the ORIGINAL value.`, (n) => fmt(n) + "%"); },
  () => { const gal = rand(8, 18), mpg = rand(18, 35);
    return build(`A truck gets ${mpg} miles per gallon. How far can it go on ${gal} gallons?`, gal * mpg, [gal + mpg, gal * mpg - mpg, gal * (mpg + 2), Math.round(mpg / gal * 100)], `Distance = ${mpg} × ${gal} = ${gal * mpg} miles.`, (n) => fmt(n) + " miles"); },
  () => { const w = rand(8, 20), h = rand(4, 15), costSq = pick([2, 3, 4, 5]);
    return build(`A rectangular floor is ${w} ft by ${h} ft. Tile costs ${money(costSq)} per square foot. What will tiling cost?`, w * h * costSq, [2 * (w + h) * costSq, w * h, (w + h) * costSq, w * h * (costSq + 1)], `Area = ${w} × ${h} = ${w * h} sq ft. Cost = ${w * h} × ${money(costSq)} = ${money(w * h * costSq)}.`, money); },
  () => { const hrs = rand(36, 50), rate = rand(12, 25); const ot = Math.max(0, hrs - 40), pay = Math.min(hrs, 40) * rate + ot * rate * 1.5;
    if (ot === 0) return AR_GEN[8]();
    return build(`You earn ${money(rate)}/hour, with time-and-a-half for hours over 40. How much do you earn for ${hrs} hours?`, pay, [hrs * rate, hrs * rate * 1.5, 40 * rate, pay + rate], `Regular: 40 × ${money(rate)} = ${money(40 * rate)}. Overtime: ${ot} × ${money(rate * 1.5)} = ${money(ot * rate * 1.5)}. Total = ${money(pay)}.`, money); },
  () => { const total = rand(3, 9) * 12, frac = pick([[1, 3], [1, 4], [2, 3], [3, 4], [1, 6]]); const ans = total * frac[0] / frac[1];
    return build(`A platoon of ${total} soldiers is split, and ${frac[0]}/${frac[1]} of them go on patrol. How many stay behind?`, total - ans, [ans, total / frac[1], total - frac[1], total / 2], `On patrol = ${frac[0]}/${frac[1]} × ${total} = ${ans}. Staying = ${total} − ${ans} = ${total - ans}.`); },
];

// ===== Generated: Mathematics Knowledge =====
const MK_GEN = [
  () => { const a = rand(2, 9), x = rand(-6, 12), b = rand(-20, 20); const c = a * x + b; const bs = b < 0 ? `− ${-b}` : `+ ${b}`;
    return build(`Solve for x: ${a}x ${bs} = ${c}`, x, [x + 1, -x, (c + b) / a, c - b], `Subtract ${b} from both sides: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`); },
  () => { const b = rand(2, 9), e = rand(2, 4);
    return build(`What is ${b}^${e}?`, b ** e, [b * e, b ** (e - 1), b ** e + b, (b + 1) ** e], `${b}^${e} means ${b} multiplied by itself ${e} times = ${b ** e}.`); },
  () => { const r = rand(2, 10);
    return build(`What is the area of a circle with radius ${r}? (Use π)`, `${r * r}π`, [`${2 * r}π`, `${r}π`, `${r * r * 2}π`, `${4 * r * r}π`], `A = πr² = π × ${r}² = ${r * r}π.`, (s) => s); },
  () => { const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
    return build(`A right triangle has legs ${a} and ${b}. What is the hypotenuse?`, c, [a + b, c + 1, Math.abs(b - a) + 3, c - 2], `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}. c = ${c}.`); },
  () => { const r1 = rand(-7, 7), r2 = rand(-7, 7); const b = -(r1 + r2), c = r1 * r2; const sgn = (n, v = "") => (n === 0 ? "" : n < 0 ? ` − ${Math.abs(n) === 1 && v ? "" : Math.abs(n)}${v}` : ` + ${n === 1 && v ? "" : n}${v}`);
    const show = (p) => p;
    const right = r1 === r2 ? `x = ${r1}` : `x = ${Math.min(r1, r2)} or x = ${Math.max(r1, r2)}`;
    const opts = [`x = ${Math.min(-r1, -r2)} or x = ${Math.max(-r1, -r2)}`, `x = ${r1 + 1} or x = ${r2 - 1}`, `x = ${c} or x = ${b}`, `x = ${r1 * 2} or x = ${r2}`];
    return build(`Solve: x²${sgn(b, "x")}${sgn(c)} = 0`, right, opts, `Factor: (x ${r1 < 0 ? "+ " + -r1 : "− " + r1})(x ${r2 < 0 ? "+ " + -r2 : "− " + r2}) = 0, so x = ${r1} or x = ${r2}.`, show); },
  () => { const x1 = rand(-5, 5), y1 = rand(-5, 5), m = pick([-3, -2, -1, 1, 2, 3, 4]), dx = rand(1, 4); const x2 = x1 + dx, y2 = y1 + m * dx;
    return build(`What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`, m, [-m, dx, 1 / m, y2 - y1], `Slope = (${y2} − ${y1}) / (${x2} − ${x1}) = ${y2 - y1}/${dx} = ${m}.`); },
  () => { const n = pick([3, 4, 5, 6, 8, 10]); const s = (n - 2) * 180;
    const names = { 3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 8: "octagon", 10: "decagon" };
    return build(`What is the sum of the interior angles of a ${names[n]}?`, s, [n * 180, (n - 1) * 180, 360, s / n], `(n − 2) × 180° = (${n} − 2) × 180° = ${s}°.`, (v) => fmt(v) + "°"); },
  () => { const a = rand(1, 9), b = rand(2, 9), c = rand(1, 9), d = rand(2, 9); const g = (x, y) => (y ? g(y, x % y) : x); const num = a * d + c * b, den = b * d, k = g(num, den);
    const show = (v) => v;
    const right = den / k === 1 ? `${num / k}` : `${num / k}/${den / k}`;
    return build(`What is ${a}/${b} + ${c}/${d}?`, right, [`${a + c}/${b + d}`, `${a * c}/${b * d}`, `${num}/${den + 1}`, `${a + c}/${b * d}`], `Common denominator ${den}: ${a * d}/${den} + ${c * b}/${den} = ${num}/${den} = ${right}.`, show); },
  () => { const s = rand(3, 12);
    return build(`What is the volume of a cube with side length ${s}?`, s ** 3, [s * s, 6 * s * s, s * 3, 12 * s], `V = s³ = ${s}³ = ${s ** 3}.`); },
  () => { const n = pick([16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]);
    return build(`What is √${n}?`, Math.sqrt(n), [n / 2, Math.sqrt(n) + 1, Math.sqrt(n) - 1, n / 4], `${Math.sqrt(n)} × ${Math.sqrt(n)} = ${n}.`); },
  () => { const a = rand(2, 8), b = rand(2, 8), x = rand(2, 5);
    return build(`If x = ${x}, what is ${a}x² − ${b}x?`, a * x * x - b * x, [(a * x) ** 2 - b * x, a * x * x + b * x, a * 2 * x - b * x, a * x - b], `${a}(${x})² − ${b}(${x}) = ${a * x * x} − ${b * x} = ${a * x * x - b * x}.`); },
  () => { const a = rand(2, 5), b = rand(2, 5);
    return build(`Simplify: x^${a} · x^${b}`, `x^${a + b}`, [`x^${a * b}`, `2x^${a + b}`, `x^${Math.abs(a - b)}`, `x^${a + b + 1}`], `When multiplying like bases, add exponents: x^(${a}+${b}) = x^${a + b}.`, (s) => s); },
  () => { const p = pick([10, 20, 25, 40, 50, 75]), n = rand(2, 20) * 4;
    return build(`What is ${p}% of ${n}?`, (p * n) / 100, [p + n, n / p, (p * n) / 10, n - p], `${p}% × ${n} = ${p / 100} × ${n} = ${fmt((p * n) / 100)}.`); },
  () => { const a = rand(2, 6), b = rand(1, 10), c = rand(15, 50);
    return build(`Solve the inequality: ${a}x + ${b} > ${c}`, `x > ${fmt((c - b) / a)}`, [`x < ${fmt((c - b) / a)}`, `x > ${fmt((c + b) / a)}`, `x > ${c - b}`, `x < ${fmt((c + b) / a)}`], `Subtract ${b}: ${a}x > ${c - b}. Divide by ${a}: x > ${fmt((c - b) / a)}.`, (s) => s); },
];

// ===== Storage =====
const STORE_KEY = "asvab-study-v1";
const defaultState = () => ({ stats: {}, history: [], missed: [], streak: { last: null, days: 0 } });
let state = (() => { try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORE_KEY)) }; } catch { return defaultState(); } })();
const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(state));

function record(sub, q, correct) {
  const s = (state.stats[sub] ||= { right: 0, total: 0 });
  s.total++; if (correct) s.right++;
  const key = q.q;
  if (!correct) { if (!state.missed.find((m) => m.q.q === key)) state.missed.push({ sub, q }); if (state.missed.length > 200) state.missed.shift(); }
  else state.missed = state.missed.filter((m) => m.q.q !== key);
  const today = new Date().toDateString();
  if (state.streak.last !== today) {
    const y = new Date(Date.now() - 864e5).toDateString();
    state.streak.days = state.streak.last === y ? state.streak.days + 1 : 1;
    state.streak.last = today;
  }
  save();
}

function getQuestions(sub, n) {
  if (sub === "AR") return Array.from({ length: n }, () => pick(AR_GEN)());
  if (sub === "MK") return Array.from({ length: n }, () => pick(MK_GEN)());
  return shuffle(BANK[sub]).slice(0, n).map((q) => {
    const order = shuffle([0, 1, 2, 3]);
    return { ...q, c: order.map((i) => q.c[i]), a: order.indexOf(q.a) };
  });
}

// Rough AFQT estimate from percent-correct on AFQT subtests. NOT an official score.
function afqtEstimate() {
  const pct = (k) => { const s = state.stats[k]; return s && s.total ? s.right / s.total : null; };
  const p = ["AR", "MK", "WK", "PC"].map(pct);
  if (p.some((v) => v === null)) return null;
  const [ar, mk, wk, pc] = p;
  const composite = (2 * ((wk + pc) / 2) + ar + mk) / 4; // 0..1
  // Map onto a percentile-like curve; deliberately rough.
  const est = Math.round(Math.max(1, Math.min(99, 100 / (1 + Math.exp(-9 * (composite - 0.62))))));
  return est;
}

// ===== Views =====
const app = $("#app");
let timer = null;

function nav(view) {
  clearInterval(timer);
  document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  ({ home, practice: practiceMenu, test: testMenu, cards: flashcards, review, guide }[view] || home)();
  window.scrollTo(0, 0);
}

function home() {
  const est = afqtEstimate();
  const cats = est === null ? "" : est >= 93 ? "Category I" : est >= 65 ? "Category II" : est >= 50 ? "Category IIIA" : est >= 31 ? "Category IIIB" : est >= 21 ? "Category IVA" : "Category IV / V";
  app.innerHTML = `
    <section class="hero">
      <h1>ASVAB Study Hub</h1>
      <p>Practice every subtest, take timed tests, drill flashcards, and track your progress. Everything is saved in this browser.</p>
      <div class="kpis">
        <div class="kpi"><span>${state.streak.days || 0}</span><label>day streak</label></div>
        <div class="kpi"><span>${Object.values(state.stats).reduce((a, s) => a + s.total, 0)}</span><label>questions answered</label></div>
        <div class="kpi"><span>${est ?? "–"}</span><label>est. AFQT ${est ? `<small>(${cats})</small>` : ""}</label></div>
        <div class="kpi"><span>${state.missed.length}</span><label>to review</label></div>
      </div>
      ${est === null ? `<p class="note">Answer at least one question in AR, MK, WK and PC to see an AFQT estimate.</p>` : `<p class="note">The estimate is a rough guide based on your practice accuracy, not an official score.</p>`}
    </section>
    <h2>Your subtests</h2>
    <div class="grid">${Object.entries(SUBTESTS).map(([k, s]) => {
      const st = state.stats[k]; const pct = st && st.total ? Math.round((st.right / st.total) * 100) : null;
      return `<button class="card sub" data-sub="${k}">
        <div class="row"><b>${s.short}</b>${["AR", "MK", "WK", "PC"].includes(k) ? '<span class="tag">AFQT</span>' : ""}</div>
        <div class="title">${s.name}</div>
        <div class="bar"><i style="width:${pct ?? 0}%;background:${pct === null ? "transparent" : pct >= 80 ? "var(--good)" : pct >= 60 ? "var(--warn)" : "var(--bad)"}"></i></div>
        <small>${pct === null ? "Not started" : `${pct}% · ${st.right}/${st.total}`}</small>
      </button>`;
    }).join("")}</div>`;
  app.querySelectorAll(".sub").forEach((b) => (b.onclick = () => runQuiz({ subs: [b.dataset.sub], n: 10, mode: "practice" })));
}

function practiceMenu() {
  app.innerHTML = `<h2>Practice by subtest</h2>
    <p class="muted">Untimed. See the explanation after every answer. Arithmetic Reasoning and Math Knowledge generate new problems every time.</p>
    <label class="inline">Questions per round:
      <select id="n"><option>5</option><option selected>10</option><option>20</option></select></label>
    <div class="grid">${Object.entries(SUBTESTS).map(([k, s]) => `<button class="card sub" data-sub="${k}"><b>${s.short}</b><div class="title">${s.name}</div><small>${s.desc}</small></button>`).join("")}
    <button class="card sub" data-sub="MIX"><b>MIX</b><div class="title">Mixed review</div><small>Random questions from every subtest.</small></button></div>`;
  app.querySelectorAll(".sub").forEach((b) => (b.onclick = () => {
    const n = +$("#n").value;
    runQuiz({ subs: b.dataset.sub === "MIX" ? Object.keys(SUBTESTS) : [b.dataset.sub], n, mode: "practice" });
  }));
}

function testMenu() {
  app.innerHTML = `<h2>Timed practice tests</h2>
    <p class="muted">Simulates test conditions: a countdown clock, and no feedback until you finish.</p>
    <div class="grid">
      <button class="card" id="afqt"><b>AFQT</b><div class="title">AFQT practice test</div><small>AR, WK, PC, MK. 55 questions, about 89 minutes (CAT-ASVAB timing).</small></button>
      <button class="card" id="full"><b>FULL</b><div class="title">Full battery</div><small>All 9 subtests. 130 questions, about 154 minutes.</small></button>
      <button class="card" id="quick"><b>QUICK</b><div class="title">Quick 20</div><small>20 mixed questions in 20 minutes.</small></button>
    </div>
    <h3>Or time a single subtest</h3>
    <div class="grid">${Object.entries(SUBTESTS).map(([k, s]) => `<button class="card sub" data-sub="${k}"><b>${s.short}</b><div class="title">${s.name}</div><small>${s.count} questions · ${s.time} min</small></button>`).join("")}</div>`;
  const sum = (ks, f) => ks.reduce((a, k) => a + SUBTESTS[k][f], 0);
  const afqt = ["AR", "WK", "PC", "MK"], all = Object.keys(SUBTESTS);
  $("#afqt").onclick = () => runQuiz({ subs: afqt, perSub: true, mode: "test", minutes: sum(afqt, "time"), title: "AFQT Practice Test" });
  $("#full").onclick = () => runQuiz({ subs: all, perSub: true, mode: "test", minutes: sum(all, "time"), title: "Full Battery" });
  $("#quick").onclick = () => runQuiz({ subs: all, n: 20, mode: "test", minutes: 20, title: "Quick 20" });
  app.querySelectorAll(".sub").forEach((b) => (b.onclick = () => { const s = SUBTESTS[b.dataset.sub]; runQuiz({ subs: [b.dataset.sub], perSub: true, mode: "test", minutes: s.time, title: s.name }); }));
}

function runQuiz({ subs, n, perSub, mode, minutes, title, preset }) {
  clearInterval(timer);
  let items;
  if (preset) items = preset;
  else if (perSub) items = subs.flatMap((s) => getQuestions(s, SUBTESTS[s].count).map((q) => ({ sub: s, q })));
  else if (subs.length === 1) items = getQuestions(subs[0], n).map((q) => ({ sub: subs[0], q }));
  else items = Array.from({ length: n }, () => { const s = pick(subs); return { sub: s, q: getQuestions(s, 1)[0] }; });
  const answers = new Array(items.length).fill(null);
  let i = 0, ends = minutes ? Date.now() + minutes * 60000 : null;
  const isTest = mode === "test";

  function render() {
    const { sub, q } = items[i];
    const chosen = answers[i];
    const reveal = !isTest && chosen !== null;
    app.innerHTML = `
      <div class="quizbar">
        <span>${esc(title || SUBTESTS[sub].name)}${title ? ` · <b>${sub}</b>` : ""}</span>
        <span>Q ${i + 1} / ${items.length}</span>
        ${ends ? `<span id="clock" class="clock"></span>` : ""}
      </div>
      <div class="progress"><i style="width:${((i + (chosen !== null ? 1 : 0)) / items.length) * 100}%"></i></div>
      <div class="qcard">
        <div class="qtext">${esc(q.q).replace(/\n/g, "<br>")}</div>
        <div class="choices">${q.c.map((c, k) => {
          let cls = "choice";
          if (reveal) cls += k === q.a ? " right" : k === chosen ? " wrong" : "";
          else if (chosen === k) cls += " picked";
          return `<button class="${cls}" data-k="${k}" ${reveal ? "disabled" : ""}><span class="letter">${"ABCD"[k]}</span>${esc(c)}</button>`;
        }).join("")}</div>
        ${reveal ? `<div class="explain ${chosen === q.a ? "ok" : "no"}"><b>${chosen === q.a ? "Correct!" : `Incorrect. The answer is ${"ABCD"[q.a]}.`}</b><br>${esc(q.e)}</div>` : ""}
      </div>
      <div class="actions">
        ${isTest && i > 0 ? `<button class="btn ghost" id="prev">← Back</button>` : "<span></span>"}
        ${isTest ? `<button class="btn ghost" id="finish">Finish test</button>` : ""}
        <button class="btn" id="next" ${!isTest && chosen === null ? "disabled" : ""}>${i === items.length - 1 ? "See results" : "Next →"}</button>
      </div>
      ${isTest ? `<div class="dots">${items.map((_, k) => `<button class="dot ${answers[k] !== null ? "done" : ""} ${k === i ? "cur" : ""}" data-j="${k}">${k + 1}</button>`).join("")}</div>` : ""}`;
    app.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      answers[i] = +b.dataset.k;
      if (!isTest) record(sub, q, answers[i] === q.a);
      render();
    }));
    $("#next").onclick = () => (i < items.length - 1 ? (i++, render()) : finish());
    if ($("#prev")) $("#prev").onclick = () => { i--; render(); };
    if ($("#finish")) $("#finish").onclick = () => { if (confirm(`Finish now? ${answers.filter((a) => a === null).length} unanswered.`)) finish(); };
    app.querySelectorAll(".dot").forEach((d) => (d.onclick = () => { i = +d.dataset.j; render(); }));
    tick();
  }

  function tick() {
    if (!ends) return;
    const left = Math.max(0, ends - Date.now());
    const el = $("#clock");
    if (el) { el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, "0")}`; el.classList.toggle("low", left < 120000); }
    if (left <= 0) { clearInterval(timer); alert("Time's up!"); finish(); }
  }
  if (ends) timer = setInterval(tick, 1000);

  function finish() {
    clearInterval(timer);
    if (isTest) items.forEach(({ sub, q }, k) => record(sub, q, answers[k] === q.a));
    const bySub = {};
    items.forEach(({ sub, q }, k) => { const b = (bySub[sub] ||= { r: 0, t: 0 }); b.t++; if (answers[k] === q.a) b.r++; });
    const right = items.filter(({ q }, k) => answers[k] === q.a).length;
    const pct = Math.round((right / items.length) * 100);
    state.history.unshift({ date: new Date().toISOString(), title: title || subs.map((s) => SUBTESTS[s].short).join("+"), right, total: items.length });
    state.history = state.history.slice(0, 50); save();
    app.innerHTML = `
      <section class="hero center">
        <div class="score ${pct >= 80 ? "good" : pct >= 60 ? "warn" : "bad"}">${pct}%</div>
        <p>${right} of ${items.length} correct${title ? ` on <b>${esc(title)}</b>` : ""}</p>
        ${Object.keys(bySub).length > 1 ? `<table class="tbl">${Object.entries(bySub).map(([s, b]) => `<tr><td>${SUBTESTS[s].name}</td><td>${b.r}/${b.t}</td><td>${Math.round((b.r / b.t) * 100)}%</td></tr>`).join("")}</table>` : ""}
        <div class="actions center"><button class="btn" id="again">Try again</button><button class="btn ghost" id="homeb">Dashboard</button></div>
      </section>
      <h2>Review answers</h2>
      ${items.map(({ sub, q }, k) => `<details class="rev ${answers[k] === q.a ? "ok" : "no"}"><summary><b>${k + 1}.</b> [${sub}] ${esc(q.q.split("\n").pop())}</summary>
        <p>Your answer: <b>${answers[k] === null ? "—" : esc(q.c[answers[k]])}</b><br>Correct: <b>${esc(q.c[q.a])}</b></p><p class="muted">${esc(q.e)}</p></details>`).join("")}`;
    $("#again").onclick = () => runQuiz({ subs, n, perSub, mode, minutes, title, preset });
    $("#homeb").onclick = () => nav("home");
  }
  render();
}

function flashcards() {
  let deck = shuffle(FLASHCARDS), i = 0, flipped = false;
  const draw = () => {
    app.innerHTML = `<h2>Flashcards</h2><p class="muted">Formulas, rules, and word roots. Tap the card to flip it.</p>
      <div class="flash ${flipped ? "flipped" : ""}" id="fc"><div class="face front">${esc(deck[i].f)}</div><div class="face back">${esc(deck[i].b)}</div></div>
      <div class="actions"><button class="btn ghost" id="p">← Prev</button><span>${i + 1} / ${deck.length}</span><button class="btn" id="n">Next →</button></div>
      <div class="center"><button class="btn ghost" id="s">Shuffle</button></div>`;
    $("#fc").onclick = () => { flipped = !flipped; $("#fc").classList.toggle("flipped", flipped); };
    $("#n").onclick = () => { i = (i + 1) % deck.length; flipped = false; draw(); };
    $("#p").onclick = () => { i = (i - 1 + deck.length) % deck.length; flipped = false; draw(); };
    $("#s").onclick = () => { deck = shuffle(FLASHCARDS); i = 0; flipped = false; draw(); };
  };
  draw();
}

function review() {
  const m = state.missed;
  app.innerHTML = `<h2>Review mistakes</h2>
    ${m.length ? `<p class="muted">${m.length} question${m.length > 1 ? "s" : ""} you missed. Answer one correctly to clear it from this list.</p>
      <div class="actions"><button class="btn" id="drill">Drill missed questions</button><button class="btn ghost" id="clear">Clear list</button></div>
      ${m.slice().reverse().map(({ sub, q }) => `<details class="rev no"><summary>[${sub}] ${esc(q.q.split("\n").pop())}</summary><p>Answer: <b>${esc(q.c[q.a])}</b></p><p class="muted">${esc(q.e)}</p></details>`).join("")}`
      : `<p class="muted">No missed questions. Go practice!</p>`}
    <h2>Recent sessions</h2>
    ${state.history.length ? `<table class="tbl">${state.history.slice(0, 15).map((h) => `<tr><td>${new Date(h.date).toLocaleDateString()}</td><td>${esc(h.title)}</td><td>${h.right}/${h.total}</td><td>${Math.round((h.right / h.total) * 100)}%</td></tr>`).join("")}</table>` : `<p class="muted">No sessions yet.</p>`}
    <p><button class="btn ghost danger" id="reset">Reset all progress</button></p>`;
  if ($("#drill")) $("#drill").onclick = () => runQuiz({ subs: [...new Set(m.map((x) => x.sub))], mode: "practice", title: "Missed questions", preset: shuffle(m).slice(0, 20) });
  if ($("#clear")) $("#clear").onclick = () => { state.missed = []; save(); review(); };
  $("#reset").onclick = () => { if (confirm("Erase all progress?")) { state = defaultState(); save(); review(); } };
}

function guide() {
  app.innerHTML = `<h2>ASVAB guide</h2>
  <div class="prose">
    <h3>What's on the test</h3>
    <table class="tbl">${Object.values(SUBTESTS).map((s) => `<tr><td><b>${s.short}</b></td><td>${s.name}</td><td class="muted">${s.desc}</td></tr>`).join("")}</table>
    <h3>The AFQT score</h3>
    <p>The AFQT decides whether you can enlist. It's built from four subtests: <b>Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge, and Paragraph Comprehension</b>. Verbal (WK + PC) counts double. The score is a percentile from 1 to 99. Most branches require a minimum of roughly 31–32 with a high school diploma. You need a higher score without one, and some jobs or enlistment bonuses need much higher scores. Requirements change, so confirm current minimums with a recruiter.</p>
    <h3>Line scores</h3>
    <p>Each branch also combines subtests into "line scores" that qualify you for specific jobs. Mechanical, electronics, and shop subtests matter here, so they're still worth studying.</p>
    <h3>Study tips</h3>
    <ul>
      <li><b>Focus on the AFQT first.</b> Math and verbal give you the biggest gains.</li>
      <li><b>Memorize the formulas</b> in the Flashcards tab. The test gives you no formula sheet.</li>
      <li><b>No calculator is allowed.</b> Practice mental math and long division.</li>
      <li><b>The CAT-ASVAB is adaptive.</b> Early questions affect difficulty, so take your time on them. You can't go back to change answers.</li>
      <li><b>Wrong answers carry no penalty</b> on the computer test, but unanswered questions do. Guess if you must.</li>
      <li><b>Use process of elimination.</b> Removing even one choice raises your odds.</li>
      <li><b>Read the question twice</b> in AR. Find what it actually asks for: total, difference, or what's left over.</li>
      <li><b>Study 20–30 minutes a day</b> rather than cramming. Keep your streak going.</li>
    </ul>
    <p class="note">This app's questions are original practice items, not official ASVAB content. Your AFQT estimate is approximate.</p>
  </div>`;
}

document.querySelectorAll("nav button").forEach((b) => (b.onclick = () => nav(b.dataset.view)));
nav("home");
