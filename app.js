/* Data Skills Atlas — vanilla JS, no dependencies. Reads atlas_data.json (aggregates only). */
(() => {
  'use strict';

  const I18N = {
    fa: {
      theme: 'تیره / روشن', brand: 'اطلس مهارت‌های داده', nav_profile: 'پروفایل نقش', nav_compare: 'مقایسه نقش‌ها', nav_lookup: 'جستجوی مهارت',
      nav_esco: 'ESCO', nav_method: 'روش کار', nav_courses: 'دوره‌ها و بازار',
      h_courses: 'دوره‌های مؤسسه توسعه در برابر نیاز بازار',
      s_courses: 'سرفصل عمومی هر دوره روی همین دسته‌بندی مهارت‌ها نگاشت شده و با ۲۰ مهارت تخصصی و ابزارِ پرتقاضای نقش متناظر مقایسه شده است.',
      h_low: 'در سرفصل هست، ولی کمتر خواسته می‌شود', s_low: 'مهارت‌هایی که دوره درس می‌دهد و کمتر از ۵٪ آگهی‌های این نقش خواسته‌اند.',
      courses_note: 'توجه: فقط سرفصل منتشرشده در سایت مؤسسه بررسی شده است. نبودن یک مهارت در سرفصل عمومی لزوماً به این معنا نیست که در کلاس تدریس نمی‌شود.',
      cov_lab: 'پوشش وزن‌دار تقاضا', cov_of: (k) => `${fmtInt(k)} از ۲۰ مهارت پرتقاضا`,
      covered: 'در سرفصل', notcovered: 'در سرفصل نیست', course_link: 'صفحه دوره', sparse: 'سرفصل عمومی این دوره فقط چند خط کلی است؛ این مقایسه تقریبی است.', none_low: '—',
      title: 'کارفرمایان ایرانی از نقش‌های داده چه می‌خواهند؟',
      lede: 'تحلیل محتوای آگهی‌های استخدام پنج نقش داده‌محور در ایران، بهار ۱۴۰۴. هر آگهی برای مهارت‌های نرم، ویژگی‌های رفتاری، مهارت‌های تخصصی و ابزارها کدگذاری شده است.',
      ctl_sample: 'نمونه', h_profile: 'پروفایل نقش',
      s_profile: 'درصد آگهی‌های هر نقش که هر مهارت را خواسته‌اند. ده مورد اول هر دسته.',
      t_human: 'مهارت‌های انسانی', t_human_sub: 'نرم و رفتاری', t_hard: 'مهارت‌های تخصصی', t_hard_sub: 'دانش و توانایی فنی یا حرفه‌ای',
      t_tool: 'ابزارها', t_tool_sub: 'نرم‌افزار، زبان و پلتفرم', h_context: 'شرایط شغل', c_work: 'مدل کاری', c_exp: 'حداقل سابقه', c_size: 'اندازه شرکت',
      h_compare: 'مقایسه نقش‌ها',
      s_compare: 'هر خانه: درصد آگهی‌های آن نقش که دست‌کم یک مهارت از این دسته خواسته‌اند. رنگ پررنگ‌تر یعنی درصد بیشتر.',
      h_lookup: 'جستجوی مهارت', s_lookup: 'یک مهارت یا ابزار را انتخاب کن تا ببینی هر نقش چقدر آن را می‌خواهد.',
      h_esco: 'شکاف با طبقه‌بندی اروپایی ESCO',
      s_esco: 'هر مهارت تخصصی و ابزار به نزدیک‌ترین مفهوم در ESCO (نسخه ۱.۲) وصل شده است. «یکسان» یعنی همان مفهوم؛ «کلی‌تر» یعنی ESCO فقط یک مفهوم عام‌تر دارد.',
      h_esco_gap: 'پرتقاضاترین ابزارهایی که ESCO معادل دقیقشان را ندارد', h_method: 'روش کار و محدودیت‌ها',
      sample_main: 'بازه اصلی (۱۴۰۴)', sample_all: 'همه، با آگهی‌های منقضی',
      note_main: 'همه آگهی‌های منتشرشده در یک بازه یک‌ماهه در بهار ۱۴۰۴.',
      note_all: 'به‌اضافهٔ آگهی‌های منقضی سال‌های ۱۳۹۳ تا ۱۴۰۳ که یک سایت نگه داشته بود. این آگهی‌ها نمونهٔ معرف نیستند.',
      stat_ads: 'آگهی کدگذاری‌شده', stat_roles: 'نقش داده‌محور', stat_skills: 'مهارت و ابزار یکدست‌شده', stat_mentions: 'بار ذکر مهارت',
      type_human: 'مهارت‌های انسانی', type_hard: 'مهارت‌های تخصصی', type_tool: 'ابزارها',
      small_n: (n) => `این نقش در این نمونه فقط ${fmtInt(n)} آگهی دارد؛ درصدها را با احتیاط بخوان.`,
      tip_ads: (k, n) => `${fmtInt(k)} از ${fmtInt(n)} آگهی`,
      lookup_meta: (cat, dom) => `${cat} · ${dom}`, lookup_ph: 'مثلاً Power BI یا کار تیمی',
      esco_hard: 'مهارت‌های تخصصی', esco_tool: 'ابزارها',
      m_exact: 'یکسان', m_close: 'نزدیک', m_broad: 'کلی‌تر', m_none: 'بدون معادل',
      esco_of_mentions: 'از ذکرها', gap_esco: (l) => l ? `در ESCO: ${l}` : 'در ESCO: —',
      ads_n: (n) => `${fmtInt(n)} آگهی`,
      footer: 'پژوهش و داده: فاطمه تیمورپور · داده‌ها در بهار ۱۴۰۴ برای گزارش تحلیلی مؤسسه توسعه، با مشاورهٔ علمی دکتر محمدمهدی پوربصیر، جمع‌آوری شد. · داده‌ها با مجوز CC BY 4.0 و کد با مجوز MIT؛ استفاده با ذکر منبع آزاد است. · طبقه‌بندی ESCO © اتحادیه اروپا.',
    },
    en: {
      theme: 'Dark / light', brand: 'Data Skills Atlas', nav_profile: 'Role profile', nav_compare: 'Compare roles', nav_lookup: 'Skill lookup',
      nav_esco: 'ESCO', nav_method: 'Method', nav_courses: 'Courses vs market',
      h_courses: 'Tose’e Institute courses vs market demand',
      s_courses: 'Each course’s public syllabus is mapped onto the same skill taxonomy and compared with the 20 most-requested specialist skills and tools of the matching role.',
      h_low: 'Taught, but rarely asked for', s_low: 'Skills the course teaches that fewer than 5% of this role’s ads ask for.',
      courses_note: 'Note: only the syllabus published on the institute’s website was reviewed. A skill missing from the public syllabus may still be taught in class.',
      cov_lab: 'Weighted demand coverage', cov_of: (k) => `${fmtInt(k)} of the top 20 skills`,
      covered: 'in syllabus', notcovered: 'not in syllabus', course_link: 'Course page', sparse: 'This course’s public syllabus is only a few general lines; treat this comparison as rough.', none_low: '—',
      title: 'What do Iranian employers ask of data roles?',
      lede: 'A content analysis of job ads for five data-driven roles in Iran, spring 2025 (1404). Every ad was coded for soft skills, behavioural traits, specialist skills and tools.',
      ctl_sample: 'Sample', h_profile: 'Role profile',
      s_profile: 'Share of each role’s ads that ask for a skill. Top ten in each group.',
      t_human: 'Human skills', t_human_sub: 'Soft skills and behavioural traits', t_hard: 'Specialist skills', t_hard_sub: 'Technical or professional know-how',
      t_tool: 'Tools', t_tool_sub: 'Software, languages and platforms', h_context: 'Job conditions', c_work: 'Work model', c_exp: 'Minimum experience', c_size: 'Company size',
      h_compare: 'Compare roles',
      s_compare: 'Each cell: share of the role’s ads asking for at least one skill in the category. Darker means a higher share.',
      h_lookup: 'Skill lookup', s_lookup: 'Pick a skill or tool to see how much each role asks for it.',
      h_esco: 'Gap with the European ESCO classification',
      s_esco: 'Every specialist skill and tool is linked to its nearest ESCO v1.2 concept. “Exact” means the same concept; “Broader” means ESCO only has a more general one.',
      h_esco_gap: 'Most-requested tools with no exact ESCO match', h_method: 'Method and limitations',
      sample_main: 'Main window (2025)', sample_all: 'All, incl. expired ads',
      note_main: 'Every ad published during one month in spring 2025 (1404).',
      note_all: 'Adds expired ads from 2014–2024 (1393–1403) that one site kept online. These are not a representative sample.',
      stat_ads: 'coded ads', stat_roles: 'data-driven roles', stat_skills: 'canonical skills and tools', stat_mentions: 'skill mentions',
      type_human: 'Human skills', type_hard: 'Specialist skills', type_tool: 'Tools',
      small_n: (n) => `This role has only ${fmtInt(n)} ads in this sample; read the percentages with caution.`,
      tip_ads: (k, n) => `${fmtInt(k)} of ${fmtInt(n)} ads`,
      lookup_meta: (cat, dom) => `${cat} · ${dom}`, lookup_ph: 'e.g. Power BI or Teamwork',
      esco_hard: 'Specialist skills', esco_tool: 'Tools',
      m_exact: 'Exact', m_close: 'Close', m_broad: 'Broader', m_none: 'No match',
      esco_of_mentions: 'of mentions', gap_esco: (l) => l ? `ESCO: ${l}` : 'ESCO: —',
      ads_n: (n) => `${fmtInt(n)} ads`,
      footer: 'Research and data: Fatemeh Teimourpour · Data collected in spring 2025 (1404) for an analytical report by the Tose’e Institute, scientific advisor Dr. Mohammad Mahdi Pourbasir. · Data under CC BY 4.0, code under MIT — free to reuse with attribution. · ESCO classification © European Union.',
    },
  };

  const METHOD = {
    fa: `
      <h3>داده</h3>
      <p>آگهی‌های استخدام پنج نقش (بازاریابی داده‌محور، هوش تجاری، تحلیلگر داده، علم داده و تحلیلگر مالی) از سایت‌های کاریابی ایرانی، در یک بازهٔ ثابت یک‌ماهه در بهار ۱۴۰۴ (عمدتاً اردیبهشت و خرداد) جمع شد. همهٔ آگهی‌های موجود در آن بازه برداشته شد؛ پس تفاوت تعداد آگهی بین نقش‌ها، تفاوت واقعی حجم تقاضاست.</p>
      <p>یک سایت آگهی‌های منقضی سال‌های قبل را هم نگه داشته بود. این آگهی‌ها جدا علامت خورده‌اند و فقط با گزینهٔ «همه» نمایش داده می‌شوند؛ چون از یک سایت‌اند، نمونهٔ معرف آن سال‌ها نیستند.</p>
      <h3>کدگذاری و دسته‌بندی</h3>
      <p>هر آگهی برای مهارت‌های نرم، ویژگی‌های رفتاری، مهارت‌های تخصصی و ابزارها کدگذاری شد (با کمک هوش مصنوعی). سپس نام‌های گوناگون یکدست شدند (مثلاً «Excel»، «Microsoft Excel» و «اکسل پیشرفته») و یک دسته‌بندی مشترک برای همهٔ نقش‌ها ساخته شد: ۴۴ مهارت انسانی، ۷۸ مهارت تخصصی و ۱۳۶ ابزار. یکدست‌سازی با قاعده انجام و با نمونه‌گیری تصادفی بررسی شده است.</p>
      <h3>دوره‌ها</h3>
      <p>سرفصل منتشرشدهٔ پنج دورهٔ مؤسسه توسعه (آبان ۱۴۰۵) با همان قاعده‌ها روی دسته‌بندی مهارت‌ها نگاشت شد و چند خطای نگاشت دستی اصلاح شد. «پوشش وزن‌دار» یعنی چه سهمی از تقاضای ۲۰ مهارت تخصصی و ابزارِ پرتقاضای آن نقش در سرفصل دیده می‌شود.</p>
      <h3>شاخص</h3>
      <p>همهٔ درصدها «سهم آگهی‌هایی است که دست‌کم یک بار آن مهارت را خواسته‌اند». یک آگهی می‌تواند چند مهارت بخواهد، پس جمع درصدها ۱۰۰ نمی‌شود.</p>
      <h3>محدودیت‌ها</h3>
      <ul>
        <li>داده یک برش زمانی است و روند را نشان نمی‌دهد.</li>
        <li>نمونهٔ تحلیلگر مالی در بازهٔ اصلی کوچک است (۳۱ آگهی).</li>
        <li>آگهی بیان خواستهٔ کارفرماست، نه تصویر کامل شغل؛ و سطح تسلط در بیشتر آگهی‌ها گفته نشده است.</li>
        <li>اعتبارسنجی انسانیِ کدگذاری روی یک زیرنمونه هنوز در جریان است.</li>
      </ul>`,
    en: `
      <h3>Data</h3>
      <p>Job ads for five roles (data-driven marketing, business intelligence, data analyst, data science and financial analyst) were collected from Iranian job sites during a fixed one-month window in spring 2025 (1404, mainly Ordibehesht–Khordad). Every ad available in the window was taken, so differences in the number of ads between roles reflect real differences in demand.</p>
      <p>One site also kept expired ads from earlier years online. These are flagged separately and shown only under “All”; because they come from a single site they are not a representative sample of those years.</p>
      <h3>Coding and taxonomy</h3>
      <p>Each ad was coded, with AI assistance, for soft skills, behavioural traits, specialist skills and tools. Variant names were then merged (e.g. “Excel”, “Microsoft Excel”, “advanced Excel”) into one shared taxonomy across roles: 44 human skills, 78 specialist skills and 136 tools. Canonicalisation is rule-based and was checked on random samples.</p>
      <h3>Courses</h3>
      <p>The published syllabi of five Tose’e Institute courses (retrieved November 2026) were mapped onto the taxonomy with the same rules, with a few mapping errors corrected by hand. “Weighted coverage” is the share of demand for the role’s 20 most-requested specialist skills and tools that appears in the syllabus.</p>
      <h3>Measure</h3>
      <p>Every percentage is the share of ads that ask for the skill at least once. An ad can ask for many skills, so percentages do not add up to 100.</p>
      <h3>Limitations</h3>
      <ul>
        <li>The data are a single cross-section and show no trends.</li>
        <li>The financial analyst main sample is small (31 ads).</li>
        <li>Ads state what employers ask for, not the whole job; proficiency level is not stated in most ads.</li>
        <li>Human validation of the coding on a subsample is still in progress.</li>
      </ul>`,
  };

  const state = { lang: 'fa', sample: 'main', role: 'bi', type: 'tool', lookup: 'tool|Power BI' };
  let D, TAX, BYID;
  const $ = (id) => document.getElementById(id);
  const t = (k, ...a) => { const v = I18N[state.lang][k]; return typeof v === 'function' ? v(...a) : v; };

  function fmtInt(n) { return Number(n).toLocaleString(state.lang === 'fa' ? 'fa-IR' : 'en-US'); }
  function fmtPct(x) {
    const v = Math.round(x);
    return state.lang === 'fa' ? `${v.toLocaleString('fa-IR')}٪` : `${v}%`;
  }
  const name = (o) => (state.lang === 'fa' ? o.fa : o.en);
  const roleName = (id) => name(D.roles.find((r) => r.id === id));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- tooltip ---------- */
  const tip = $('tip');
  function showTip(html, ev) {
    tip.innerHTML = html; tip.hidden = false;
    const pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
    let x = ev.clientX + pad, y = ev.clientY + pad;
    if (x + w > innerWidth - 8) x = ev.clientX - w - pad;
    if (y + h > innerHeight - 8) y = ev.clientY - h - pad;
    tip.style.left = `${x}px`; tip.style.top = `${y}px`;
  }
  const hideTip = () => { tip.hidden = true; };
  function bindTip(el, html) {
    el.addEventListener('mousemove', (e) => showTip(html, e));
    el.addEventListener('mouseleave', hideTip);
    el.tabIndex = 0;
    el.addEventListener('focus', () => { const r = el.getBoundingClientRect(); showTip(html, { clientX: r.left, clientY: r.bottom }); });
    el.addEventListener('blur', hideTip);
  }

  /* ---------- bar list ---------- */
  function barList(container, items, n, opts = {}) {
    // items: [{label, k}], n = denominator
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'bars' + (opts.compact ? ' compact' : '');
    const max = opts.scaleTo100 ? 100 : Math.max(1, ...items.map((i) => (100 * i.k) / n));
    items.forEach((it) => {
      const pct = n ? (100 * it.k) / n : 0;
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `<span class="bar-label">${esc(it.label)}</span>
        <div class="bar-track"><div class="bar-fill" style="inline-size:${(100 * pct) / max}%"></div></div>
        <span class="bar-val">${fmtPct(pct)}</span>`;
      bindTip(row, `<b>${esc(it.label)}</b><br>${fmtPct(pct)} · ${t('tip_ads', it.k, n)}${it.extra ? '<br>' + esc(it.extra) : ''}`);
      wrap.appendChild(row);
    });
    container.appendChild(wrap);
  }

  /* ---------- sections ---------- */
  function renderHero() {
    const all = D.all.n, main = D.main.n;
    const totalAll = Object.values(all).reduce((a, b) => a + b, 0);
    const totalMain = Object.values(main).reduce((a, b) => a + b, 0);
    const ads = state.sample === 'main' ? totalMain : totalAll;
    let mentions = 0;
    const blk = D[state.sample];
    Object.values(blk.skill_counts).forEach((o) => Object.values(o).forEach((v) => (mentions += v)));
    $('hero-stats').innerHTML = [
      [ads, t('stat_ads')], [D.roles.length, t('stat_roles')], [TAX.length, t('stat_skills')], [mentions, t('stat_mentions')],
    ].map(([n, l]) => `<div class="stat"><div class="num">${fmtInt(n)}</div><div class="lab">${esc(l)}</div></div>`).join('');
  }

  function segButtons(el, options, current, onPick) {
    el.innerHTML = '';
    options.forEach(([val, label]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label; b.setAttribute('aria-pressed', String(val === current));
      b.addEventListener('click', () => onPick(val));
      el.appendChild(b);
    });
  }

  function renderControls() {
    segButtons($('sample-seg'), [['main', t('sample_main')], ['all', t('sample_all')]], state.sample, (v) => { state.sample = v; renderAll(); });
    $('sample-note').textContent = t(state.sample === 'main' ? 'note_main' : 'note_all');
  }

  function topSkills(type, role, k = 10) {
    const blk = D[state.sample];
    return TAX.filter((x) => x.type === type)
      .map((x) => ({ x, k: (blk.skill_counts[x.id] || {})[role] || 0 }))
      .filter((o) => o.k > 0)
      .sort((a, b) => b.k - a.k)
      .slice(0, k);
  }

  function renderProfile() {
    const blk = D[state.sample];
    segButtons($('role-seg'), D.roles.map((r) => [r.id, `${name(r)} · ${fmtInt(blk.n[r.id])}`]), state.role, (v) => { state.role = v; renderProfile(); });
    const n = blk.n[state.role];
    const sn = $('small-n');
    if (n < 50) { sn.hidden = false; sn.textContent = t('small_n', n); } else sn.hidden = true;
    ['human', 'hard', 'tool'].forEach((type) => {
      const items = topSkills(type, state.role).map(({ x, k }) => ({ label: name(x), k, extra: state.lang === 'fa' ? x.cat_fa : x.cat_en }));
      barList($(`bars-${type}`), items, n, { scaleTo100: true });
    });
    const R = blk.roles[state.role];
    const ctx = (field) => R[field].map((d) => ({ label: state.lang === 'fa' ? d.fa : d.en, k: d.n }));
    barList($('ctx-work'), ctx('work_model'), n, { compact: true, scaleTo100: true });
    barList($('ctx-exp'), ctx('experience_bucket'), n, { compact: true, scaleTo100: true });
    barList($('ctx-size'), ctx('company_size'), n, { compact: true, scaleTo100: true });
  }

  function seqColor(p) {
    // 8-step sequential ramp, thresholds on % of ads
    const steps = [0, 5, 15, 25, 40, 55, 70, 85];
    let i = 0; for (let s = 0; s < steps.length; s++) if (p >= steps[s]) i = s;
    if (p === 0) i = 0;
    return { v: `var(--s${i})`, i };
  }

  function renderCompare() {
    segButtons($('type-seg'), [['human', t('type_human')], ['hard', t('type_hard')], ['tool', t('type_tool')]], state.type, (v) => { state.type = v; renderCompare(); });
    const blk = D[state.sample];
    const cats = [...new Map(TAX.filter((x) => x.type === state.type).map((x) => [x.cat_fa, x])).values()];
    const rows = cats.map((c) => {
      const counts = blk.category_counts[`${state.type}|${c.cat_fa}`] || {};
      const pcts = D.roles.map((r) => (blk.n[r.id] ? (100 * (counts[r.id] || 0)) / blk.n[r.id] : 0));
      return { c, counts, pcts, avg: pcts.reduce((a, b) => a + b, 0) / pcts.length };
    }).sort((a, b) => b.avg - a.avg);
    const head = `<tr><th></th>${D.roles.map((r) => `<th scope="col">${esc(name(r))}<small>${t('ads_n', blk.n[r.id])}</small></th>`).join('')}</tr>`;
    const body = rows.map(({ c, counts, pcts }) => `<tr><th scope="row" class="rowh">${esc(state.lang === 'fa' ? c.cat_fa : c.cat_en)}</th>${
      pcts.map((p, i) => { const col = seqColor(p); return `<td data-r="${D.roles[i].id}" data-k="${counts[D.roles[i].id] || 0}" data-p="${p}" data-c="${esc(state.lang === 'fa' ? c.cat_fa : c.cat_en)}" class="c${col.i}" style="background:${col.v}">${fmtPct(p)}</td>`; }).join('')
    }</tr>`).join('');
    const tbl = $('heat');
    tbl.innerHTML = `<thead>${head}</thead><tbody>${body}</tbody>`;
    tbl.querySelectorAll('td').forEach((td) => {
      const r = td.dataset.r;
      bindTip(td, `<b>${esc(td.dataset.c)}</b><br>${esc(roleName(r))}: ${fmtPct(+td.dataset.p)} · ${t('tip_ads', +td.dataset.k, blk.n[r])}`);
    });
  }

  function renderLookup() {
    const sel = $('skill-select');
    const blk = D[state.sample];
    const total = (x) => Object.values(blk.skill_counts[x.id] || {}).reduce((a, b) => a + b, 0);
    // option groups: type → category; inside each group, most requested first
    const groups = new Map();
    ['human', 'hard', 'tool'].forEach((type) => {
      TAX.filter((x) => x.type === type).forEach((x) => {
        const g = `${t('type_' + type)} — ${state.lang === 'fa' ? x.cat_fa : x.cat_en}`;
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(x);
      });
    });
    sel.innerHTML = [...groups].map(([g, xs]) => `<optgroup label="${esc(g)}">${
      xs.sort((a, b) => total(b) - total(a)).map((x) => `<option value="${esc(x.id)}">${esc(name(x))}</option>`).join('')
    }</optgroup>`).join('');
    sel.value = state.lookup;
    const x = BYID[state.lookup];
    if (!x) return;
    $('lookup-title').textContent = name(x);
    $('lookup-meta').textContent = t('lookup_meta', state.lang === 'fa' ? x.cat_fa : x.cat_en, state.lang === 'fa' ? x.domain_fa : x.domain_en)
      + (x.esco_label ? ` · ESCO: ${x.esco_label} (${t('m_' + x.esco_match)})` : '');
    const c = blk.skill_counts[x.id] || {};
    const host = $('bars-lookup');
    host.innerHTML = '';
    D.roles.forEach((r) => {
      const div = document.createElement('div');
      host.appendChild(div);
      barList(div, [{ label: name(r), k: c[r.id] || 0 }], blk.n[r.id], { compact: true, scaleTo100: true });
    });
  }

  function bindLookup() {
    $('skill-select').addEventListener('change', (e) => { state.lookup = e.target.value; renderLookup(); });
  }

  function renderCourses() {
    const CS = D.courses || [];
    if (!state.course) state.course = 'bi';
    const host = $('course-summary');
    host.innerHTML = '';
    CS.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'cs'; b.setAttribute('aria-pressed', String(c.id === state.course));
      b.innerHTML = `<div class="r">${esc(roleName(c.role))}</div><div class="v">${fmtPct(c.coverage_weighted)}</div>
        <div class="m"><i style="inline-size:${c.coverage_weighted}%"></i></div><div class="s">${esc(t('cov_of', c.coverage_count))}</div>`;
      b.addEventListener('click', () => { state.course = c.id; renderCourses(); });
      host.appendChild(b);
    });
    const c = CS.find((x) => x.id === state.course);
    if (!c) return;
    $('course-title').textContent = state.lang === 'fa' ? c.fa : c.en;
    $('course-meta').innerHTML = `${esc(roleName(c.role))} · <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(t('course_link'))}</a>`;
    $('course-kpi').textContent = fmtPct(c.coverage_weighted);
    $('course-kpi-lab').textContent = t('cov_lab');
    const w = $('course-warn');
    if (c.sparse) { w.hidden = false; w.textContent = t('sparse'); } else w.hidden = true;
    const n = D.main.n[c.role];
    const box = $('course-bars');
    box.innerHTML = '';
    const wrap = document.createElement('div'); wrap.className = 'bars';
    c.top20.forEach((it) => {
      const x = BYID[it.id]; const pct = (100 * it.k) / n;
      const row = document.createElement('div');
      row.className = 'bar-row ' + (it.covered ? 'cov' : 'gap');
      row.innerHTML = `<span class="bar-label">${esc(name(x))}<span class="mark">${it.covered ? '✓ ' + esc(t('covered')) : '— ' + esc(t('notcovered'))}</span></span>
        <div class="bar-track"><div class="bar-fill" style="inline-size:${pct}%"></div></div><span class="bar-val">${fmtPct(pct)}</span>`;
      bindTip(row, `<b>${esc(name(x))}</b><br>${fmtPct(pct)} · ${t('tip_ads', it.k, n)}<br>${esc(it.covered ? t('covered') : t('notcovered'))}`);
      wrap.appendChild(row);
    });
    box.appendChild(wrap);
    $('course-legend').innerHTML = `<span><i style="background:var(--bar)"></i>${esc(t('covered'))}</span><span><i class="gap"></i>${esc(t('notcovered'))}</span>`;
    $('course-low').innerHTML = c.taught_low_demand.length
      ? c.taught_low_demand.map((z) => `<span class="chip-s">${esc(name(BYID[z.id]))} · ${fmtPct((100 * z.k) / n)}</span>`).join('')
      : `<span class="chip-s">${esc(t('none_low'))}</span>`;
  }

  function renderEsco() {
    const M = ['exact', 'close', 'broad', 'none'];
    const host = $('esco-bars');
    host.innerHTML = '';
    ['hard', 'tool'].forEach((type) => {
      const cov = D.esco_coverage[type];
      const tot = M.reduce((a, m) => a + cov[m], 0);
      const row = document.createElement('div');
      row.className = 'esco-row';
      row.innerHTML = `<span class="esco-name">${esc(t('esco_' + type))}</span><div class="stack"></div>`;
      const st = row.querySelector('.stack');
      M.forEach((m) => {
        if (!cov[m]) return;
        const sp = document.createElement('span');
        const p = (100 * cov[m]) / tot;
        sp.style.inlineSize = `${p}%`; sp.style.background = `var(--m-${m})`;
        bindTip(sp, `<b>${esc(t('esco_' + type))} · ${esc(t('m_' + m))}</b><br>${fmtPct(p)} ${esc(t('esco_of_mentions'))}`);
        st.appendChild(sp);
      });
      host.appendChild(row);
    });
    $('esco-legend').innerHTML = M.map((m) => `<span><i style="background:var(--m-${m})"></i>${esc(t('m_' + m))}</span>`).join('');
    // most-requested tools without exact match (main sample, all roles)
    const blk = D.main;
    const gaps = TAX.filter((x) => x.type === 'tool' && x.esco_match !== 'exact')
      .map((x) => ({ x, k: Object.values(blk.skill_counts[x.id] || {}).reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.k - a.k).slice(0, 12);
    const totalMain = Object.values(blk.n).reduce((a, b) => a + b, 0);
    $('esco-gap').innerHTML = `<div class="gap-list">${gaps.map(({ x, k }) => `<div class="gap-item"><span>${esc(x.en)}<br><span class="muted">${esc(t('gap_esco', x.esco_label))} · ${esc(t('m_' + (x.esco_match || 'none')))}</span></span><span>${fmtPct((100 * k) / totalMain)}</span></div>`).join('')}</div>`;
  }

  function applyStatic() {
    const html = document.documentElement;
    html.lang = state.lang; html.dir = state.lang === 'fa' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.title = state.lang === 'fa' ? 'اطلس مهارت‌های داده | Data Skills Atlas' : 'Data Skills Atlas | اطلس مهارت‌های داده';
    $('lang-btn').textContent = state.lang === 'fa' ? 'English' : 'فارسی';
    $('method-body').innerHTML = METHOD[state.lang];
    $('footer').textContent = t('footer');
  }

  function renderAll() {
    applyStatic(); renderHero(); renderControls(); renderProfile(); renderCompare(); renderLookup(); renderCourses(); renderEsco();
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('atlas-theme'); } catch (e) { /* storage unavailable */ }
    if (saved) document.documentElement.dataset.theme = saved;
    $('theme-btn').addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme
        || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('atlas-theme', next); } catch (e) { /* ignore */ }
    });
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    if (params.get('lang') === 'en') state.lang = 'en';
    D = await (await fetch('atlas_data.json')).json();
    TAX = D.taxonomy;
    BYID = Object.fromEntries(TAX.map((x) => [x.id, x]));
    $('lang-btn').addEventListener('click', () => { state.lang = state.lang === 'fa' ? 'en' : 'fa'; renderAll(); });
    initTheme(); bindLookup(); renderAll();
  }
  init();
})();
