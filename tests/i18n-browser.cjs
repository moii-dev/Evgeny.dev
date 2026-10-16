const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const root = path.resolve(__dirname, '..');
const output = process.env.QA_OUTPUT || path.join(os.tmpdir(), 'evgeny-i18n-qa');
fs.mkdirSync(output, { recursive: true });
const origin = 'http://evgeny.test';
const checks = [];
const errors = [];
const check = (name, ok) => { assert.ok(ok, name); checks.push(name); };
(async () => {
 const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
 try {
  async function open(preferences, saved, denied = false, reducedMotion = 'reduce') {
   const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion });
   await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) {
     const file = path.resolve(root, 'dist', url.pathname.slice(1) || 'index.html');
     if (!file.startsWith(path.join(root, 'dist') + path.sep)) return route.abort();
     try { return await route.fulfill({ body: fs.readFileSync(file), contentType: ({ '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.woff2':'font/woff2', '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml' })[path.extname(file)] || 'application/octet-stream' }); }
     catch { return route.fulfill({ status:404, body:'Missing' }); }
    }
    if (url.hostname === 'api.github.com') return route.fulfill({ json: [] });
    return route.abort();
   });
   await context.addInitScript(({ preferences, saved, denied }) => {
    Object.defineProperty(navigator, 'languages', { get: () => preferences });
    Object.defineProperty(navigator, 'language', { get: () => preferences[0] || '' });
    if (saved) localStorage.setItem('evgeny_portfolio_language_v1', saved);
    if (denied) {
     Object.defineProperty(window, 'localStorage', { get: () => { throw new DOMException('Storage denied', 'SecurityError'); } });
    }
    window.firstHeadings = [];
    new MutationObserver(() => {
     const h = document.querySelector('h1');
     if (h && window.firstHeadings.length === 0) window.firstHeadings.push({ text:h.textContent, lang:document.documentElement.lang });
    }).observe(document, { childList:true, subtree:true });
   }, { preferences, saved, denied });
   const page = await context.newPage();
   page.on('pageerror', error => errors.push(error.message));
   await page.goto(origin);
   await page.locator('h1').waitFor();
   await page.evaluate(() => document.fonts.ready);
   return { context, page };
  }
  for (const [preferences, saved, denied, expected] of [
   [['ru-RU','en-US'],null,false,'ru'], [['en-US','ru'],null,false,'en'], [['de','ru'],null,false,'ru'],
   [['de','fr'],null,false,'en'], [['ru'],'en',false,'en'], [['en'],'ru',false,'ru'], [['ru'],null,true,'ru']
  ]) {
   const {context,page} = await open(preferences,saved,denied);
   check(`locale ${preferences.join(',')} saved=${saved} denied=${denied}`,await page.locator('html').getAttribute('lang') === expected);
   check(`first paint ${preferences.join(',')} ${saved}`,await page.evaluate(expected => window.firstHeadings[0].lang === expected && window.firstHeadings[0].text.includes(expected === 'ru' ? 'Создаю' : 'Building Digital'),expected));
   if (denied) {
    await page.getByRole('button',{name:'Switch to English',exact:true}).filter({visible:true}).click();
    check('denied storage selection works',await page.locator('html').getAttribute('lang') === 'en');
   }
   await context.close();
  }
  // Inspect the actual fonts used to draw every Russian letter, including Ё/ё.
  {
   const {context,page}=await open(['ru']);
   await page.evaluate(async()=>{
    for(const [id,cls] of [['serif','font-serif'],['sans','font-sans'],['mono','font-mono']]){
     const el=document.createElement('div');el.id='glyph-'+id;el.className=cls;
     el.textContent='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
     document.body.append(el);
     await document.fonts.load('400 24px '+getComputedStyle(el).fontFamily,el.textContent);
    }
    await document.fonts.ready;
   });
   const cdp=await context.newCDPSession(page);
   await cdp.send('DOM.enable');await cdp.send('CSS.enable');
   const {root:doc}=await cdp.send('DOM.getDocument');
   for(const [id,family]of [['serif','Cormorant Garamond'],['sans','Golos Text'],['mono','JetBrains Mono']]){
    const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:doc.nodeId,selector:'#glyph-'+id});
    const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});
    check('Cyrillic glyph coverage '+id+': '+JSON.stringify(fonts),fonts.length>0&&fonts.every(f=>f.isCustomFont&&f.familyName.startsWith(family)));
   }
   await context.close();
  }
  for (const locale of ['en','ru']) {
   const {context,page} = await open([locale]);
   check(`${locale} page identity`,(await page.title()).includes(locale==='ru'?'Портфолио':'Developer Portfolio'));
   check(`${locale} description`,(await page.locator('meta[name="description"]').getAttribute('content')).includes(locale==='ru'?'Портфолио':'Portfolio'));
   check(`${locale} no framework overlay`,await page.locator('vite-error-overlay').count()===0);
   for (const width of [320,375,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});
    await page.evaluate(() => window.scrollTo(0,0));
    await page.waitForTimeout(200);
    check(`${locale} no page overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const clipped = await page.locator('h1,h2,h3,header button,header a').evaluateAll(els=>els.filter(el=>el.clientWidth>0 && el.scrollWidth>el.clientWidth+1).map(el=>el.textContent));
    check(`${locale} headings/header fit ${width}: ${clipped}`,clipped.length===0);
    if ([375,1440].includes(width)) {
     await page.screenshot({path:path.join(output,`${locale}-${width}-hero.png`)});
     for(const section of ['projects','about','contact']) {
      await page.locator('#'+section+' h2').scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.locator('#'+section).screenshot({path:path.join(output,`${locale}-${width}-${section}.png`),style:'header,.hud-overlay { visibility: hidden !important; }'});
     }
    }
   }
   await page.setViewportSize({width:1440,height:900});
   await page.getByRole('button',{name:locale==='ru'?'Все проекты':'All projects',exact:true}).click();
   const catalog=page.getByRole('dialog');
   const search=catalog.getByRole('textbox');
   await search.fill(locale==='ru'?'мультстудия':'animation');
   check(`${locale} localized search`,await catalog.locator('h3',{hasText:'MultiPulti'}).count()===1);
   await search.fill('FreeChat');
   await catalog.getByRole('button',{name:locale==='ru'?'Подробнее о проекте FreeChat':'View FreeChat details',exact:true}).click();
   const details=page.getByRole('dialog',{name:locale==='ru'?'FreeChat — описание проекта':'FreeChat details',exact:true});
   await details.waitFor({state:'visible'});
   check(`${locale} details content`,(await details.innerText()).includes(locale==='ru'?'Android AI-чат':'An Android AI chat app'));
   // Native dialogs make background controls inert; dispatch a language change to verify mounted state survives.
   await page.evaluate(()=>document.querySelector('.language-switcher button[aria-pressed="false"]').click());
   check(locale+' open dialog survives language switch',await page.getByRole('dialog',{name:locale==='ru'?'FreeChat details':'FreeChat — описание проекта',exact:true}).isVisible());
   check(locale+' catalog search survives language switch',await search.inputValue()==='FreeChat');
   await page.evaluate(()=>document.querySelector('.language-switcher button[aria-pressed="false"]').click());
   await page.keyboard.press('Escape');
   check(`${locale} nested modal returns to catalog`,await search.inputValue()==='FreeChat');
   await page.keyboard.press('Escape');
   await page.locator('#contact-name').fill('Test User');
   await page.getByRole('button',{name:locale==='ru'?'Отправить сообщение':'Send message',exact:true}).click();
   check(`${locale} validation`,(await page.locator('#contact-email-error').innerText()).includes(locale==='ru'?'Укажите':'Please provide'));
   const y=await page.evaluate(()=>scrollY);
   await page.getByRole('button',{name:locale==='ru'?'Switch to English':'Switch to Russian',exact:true}).filter({visible:true}).click();
   await page.waitForTimeout(150);
   check(`${locale} switch retains form`,await page.locator('#contact-name').inputValue()==='Test User');
   check(`${locale} switch retains validation language`,(await page.locator('#contact-email-error').innerText()).includes(locale==='ru'?'Please provide':'Укажите'));
   check(`${locale} switch retains scroll`,Math.abs((await page.evaluate(()=>scrollY))-y)<2);
   const next=locale==='ru'?'en':'ru';
   check(`${locale} selection persisted`,await page.evaluate(()=>localStorage.getItem('evgeny_portfolio_language_v1'))===next);
   await page.reload();
   await page.locator('h1').waitFor();
   check(`${locale} selection survives reload`,await page.locator('html').getAttribute('lang')===next);
   await context.close();
  }
  const {context,page}=await open(['ru'],null,false,'no-preference');
  await page.waitForTimeout(300);
  for(const id of ['projects','about','stack','contact','home']) {
   await page.locator('#'+id).scrollIntoViewIfNeeded();
   await page.waitForTimeout(130);
  }
  check('Unicode transit glyphs',await page.locator('[data-transit-section="projects"]').innerText().then(t=>t.replace(/\s/g,'')==='ПРОЕКТЫ'));
  await page.getByRole('button',{name:'Switch to English',exact:true}).filter({visible:true}).click();
  check('animation glyphs rebuilt on switch',await page.locator('[data-transit-section="projects"]').innerText().then(t=>t.replace(/\s/g,'')==='PROJECTS'));
  await context.close();
  check('no runtime errors',errors.length===0);
  console.log(JSON.stringify({checks,errors,output},null,2));
 } finally { await browser.close(); }
})().catch(error=>{ console.error(error); process.exitCode=1; });


