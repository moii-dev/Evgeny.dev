const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const root = path.resolve(__dirname, '..');
const output = process.env.QA_OUTPUT || path.join(os.tmpdir(), 'evgeny-browser-qa');
fs.mkdirSync(output, { recursive: true });
const base = process.env.QA_BASE || '/';
const origin = 'http://evgeny.test';
const result = { checks: [], errors: [], warnings: [], missingAssets: [] };
const check = (name, condition) => { assert.ok(condition, name); result.checks.push(name); };

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
    let githubMode = 'offline';
    let formMode = 'error';
    let blockDetails = false;
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (process.env.QA_CONTACT_ENDPOINT && url.href === process.env.QA_CONTACT_ENDPOINT) {
        if (formMode === 'pending') return;
        return route.fulfill({ status: formMode === 'error' ? 500 : 200, json: { ok: formMode === 'success' } });
      } else if (url.origin === origin && url.pathname.startsWith(base)) {
        if (blockDetails && url.pathname.includes('/ProjectModal-')) return route.abort();
        const rel = url.pathname.slice(base.length) || 'index.html';
        const file = path.resolve(root, 'dist', rel);
        if (!file.startsWith(path.resolve(root, 'dist') + path.sep)) return route.abort();
        try { await route.fulfill({ body: fs.readFileSync(file), contentType: ({ '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' })[path.extname(file)] || 'application/octet-stream' }); }
        catch { result.missingAssets.push(url.pathname); await route.fulfill({ status: 404, body: 'Missing asset' }); }
      } else if (url.hostname === 'api.github.com' && githubMode === 'live') {
        await route.fulfill({ json: ['FreeChat', 'GAMMA-PPTX-Watermark-Cleaner', 'Live-only'].map(name => ({ id: 1, name, full_name: `moii-dev/${name}`, html_url: `https://github.com/moii-dev/${name}`, description: 'API description', language: 'TypeScript', homepage: null, stargazers_count: 99, forks_count: 21, updated_at: '2026-10-16T00:00:00Z', fork: false, topics: [] })) });
      } else { if (url.origin === origin) result.missingAssets.push(url.pathname); await route.abort(); }
    });
    const page = await context.newPage();
    page.on('pageerror', error => result.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'warning') result.warnings.push(message.text()); });
    await page.goto(origin + base);
    await page.waitForTimeout(800);
    check('page identity', (await page.title()).includes('Evgeny'));
    check('meaningful content', await page.locator('h1').isVisible());
    check('no framework overlay', await page.locator('vite-error-overlay').count() === 0);
    check('Open Graph image configured', (await page.locator('meta[property="og:image"]').getAttribute('content')).includes(base + 'assets/social-preview.png'));
    await page.getByRole('button', { name: 'All projects', exact: true }).click();
    const catalog = page.getByRole('dialog', { name: 'All Projects & Repositories', exact: true });
    await catalog.getByRole('textbox', { name: 'Search projects' }).fill('WorldBox');
    const detailsButton = catalog.getByRole('button', { name: 'View WorldBox-React details', exact: true });
    await detailsButton.focus();
    await page.keyboard.press('Enter');
    const details = page.getByRole('dialog', { name: 'WorldBox-React details', exact: true });
    await details.waitFor({ state: 'visible' });
    check('catalog keyboard details opens on top', await details.isVisible() && await page.evaluate(() => document.activeElement?.closest('dialog')?.getAttribute('aria-label') === 'WorldBox-React details'));
    await page.setViewportSize({ width: 390, height: 844 });
    const scroll = details.locator('.overflow-y-auto').first();
    await scroll.hover();
    const background = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    check('modal wheel scroll', await scroll.evaluate(el => el.scrollTop > 0));
    check('background locked', Math.abs(await page.evaluate(() => scrollY) - background) < 2);
    await scroll.evaluate(el => { el.scrollTop = 0; });
    const client = await context.newCDPSession(page);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 650 }] });
    for (const y of [610, 550, 480, 400, 320]) { await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y }] }); await page.waitForTimeout(25); }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(150);
    check('modal touch scroll', await scroll.evaluate(el => el.scrollTop > 0));
    check('touch keeps background locked', Math.abs(await page.evaluate(() => scrollY) - background) < 2);
    await client.detach();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      check(`focus trapped ${i}`, await page.evaluate(() => document.activeElement?.closest('dialog')?.getAttribute('aria-label') === 'WorldBox-React details'));
    }
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab');
      check(`reverse focus trapped ${i}`, await page.evaluate(() => document.activeElement?.closest('dialog')?.getAttribute('aria-label') === 'WorldBox-React details'));
    }
    await page.keyboard.press('Escape');
    check('Escape returns to catalog', await catalog.isVisible() && await catalog.getByRole('textbox', { name: 'Search projects' }).inputValue() === 'WorldBox');
    check('focus restored to details trigger', await detailsButton.evaluate(el => el === document.activeElement));
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Change photo', exact: true }).click();
    await page.setViewportSize({ width: 844, height: 390 });
    const photo = page.getByRole('dialog', { name: 'Custom Portrait', exact: true });
    await photo.getByRole('button', { name: 'Save & Apply', exact: true }).scrollIntoViewIfNeeded();
    check('portrait footer reachable in landscape', await photo.getByRole('button', { name: 'Save & Apply', exact: true }).evaluate(el => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }));
    await page.keyboard.press('Escape');
    const imageFile = { name: 'cover.png', mimeType: 'image/png', buffer: fs.readFileSync(path.join(root, 'public/assets/projects/onepass/icon128.png')) };
    const changePhoto = page.getByRole('button', { name: 'Change photo', exact: true });
    await changePhoto.click();
    const portraitDialog = page.getByRole('dialog', { name: 'Custom Portrait', exact: true });
    const originalPortrait = await page.getByAltText('Evgeny - Developer Portrait', { exact: true }).getAttribute('src');
    await portraitDialog.locator('input[type=file]').setInputFiles(imageFile);
    await page.waitForTimeout(100);
    check('portrait preview loads validated image', (await portraitDialog.getByAltText('Developer Portrait Preview').getAttribute('src')).startsWith('data:image/png'));
    await page.evaluate(() => { const read = FileReader.prototype.readAsDataURL; FileReader.prototype.readAsDataURL = function(file) { if (file.name === 'slow.png') setTimeout(() => read.call(this, file), 300); else read.call(this, file); }; });
    await portraitDialog.locator('input[type=file]').setInputFiles({ ...imageFile, name: 'slow.png' });
    await page.waitForTimeout(50);
    const latestImage = fs.readFileSync(path.join(root, 'public/assets/projects/qr-scanner/app_icon.png'));
    await portraitDialog.locator('input[type=file]').setInputFiles({ name: 'latest.png', mimeType: 'image/png', buffer: latestImage });
    await page.waitForTimeout(500);
    check('late FileReader cannot overwrite latest image', await portraitDialog.getByAltText('Developer Portrait Preview').getAttribute('src') === `data:image/png;base64,${latestImage.toString('base64')}`);
    await portraitDialog.getByRole('textbox', { name: 'Image URL' }).fill('javascript:alert(1)');
    await portraitDialog.getByRole('button', { name: 'Apply', exact: true }).click();
    check('unsafe portrait URL rejected', await portraitDialog.getByText(/Use an HTTP/).isVisible());
    await portraitDialog.locator('input[type=file]').setInputFiles({ name: 'large.png', mimeType: 'image/png', buffer: Buffer.alloc(5 * 1024 * 1024 + 1) });
    check('oversized image rejected', await portraitDialog.getByText('Choose an image up to 5 MB.', { exact: true }).isVisible());
    await portraitDialog.getByRole('button', { name: 'Cancel', exact: true }).click();
    await changePhoto.click();
    check('portrait Cancel discards draft', await portraitDialog.getByAltText('Developer Portrait Preview').getAttribute('src') === originalPortrait);
    await portraitDialog.locator('input[type=file]').setInputFiles(imageFile);
    await page.waitForTimeout(100);
    await portraitDialog.getByRole('button', { name: 'Save & Apply', exact: true }).click();
    const savedPortrait = await page.getByAltText('Evgeny - Developer Portrait', { exact: true }).getAttribute('src');
    await page.reload();
    check('portrait survives reload', await page.getByAltText('Evgeny - Developer Portrait', { exact: true }).getAttribute('src') === savedPortrait);
    await changePhoto.click();
    await portraitDialog.getByRole('button', { name: 'Reset', exact: true }).click();
    await changePhoto.click();
    check('portrait Reset starts next edit from default', await portraitDialog.getByAltText('Developer Portrait Preview').getAttribute('src') === originalPortrait);
    await page.keyboard.press('Escape');
    for (const title of ['WorldBox-React', 'FreeChat', 'Figmint']) {
      await page.getByRole('button', { name: `View ${title} details`, exact: true }).click();
      const modal = page.getByRole('dialog', { name: `${title} details`, exact: true });
      await modal.locator('input[type=file]').setInputFiles({ name: 'broken.png', mimeType: 'image/png', buffer: Buffer.from('bad') });
      await page.waitForTimeout(150);
      check(`${title} invalid image shows error`, await modal.getByText(/could not be decoded/).isVisible());
      await modal.locator('input[type=file]').setInputFiles(imageFile);
      await page.waitForTimeout(150);
      check(`${title} valid image recovers`, await modal.getByAltText(`${title} custom cover`, { exact: true }).isVisible());
      await page.keyboard.press('Escape');
      check(`${title} card shares cover state`, await page.getByAltText(`${title} custom cover`, { exact: true }).isVisible());
      await page.reload();
      check(`${title} cover survives reload`, await page.getByAltText(`${title} custom cover`, { exact: true }).isVisible());
      await page.getByRole('button', { name: `View ${title} details`, exact: true }).click();
      await modal.getByRole('button', { name: 'Reset project cover' }).click();
      check(`${title} Reset updates modal`, await modal.getByAltText(`${title} custom cover`, { exact: true }).count() === 0);
      await page.keyboard.press('Escape');
      check(`${title} Reset updates card`, await page.getByAltText(`${title} custom cover`, { exact: true }).count() === 0);
    }
    await page.locator('#contact-name').fill('Regression Visitor');
    await page.locator('#contact-email').fill('visitor@example.com');
    await page.locator('#contact-message').fill('Keep this message while returning to edit.');
    await page.getByRole('button', { name: 'Send message', exact: true }).click();
    if (process.env.QA_CONTACT_ENDPOINT) {
      await page.getByRole('alert').filter({ hasText: 'Could not send message' }).waitFor();
      check('contact 500 preserves draft', await page.locator('#contact-message').inputValue() === 'Keep this message while returning to edit.');
      formMode = 'pending';
      await page.getByRole('button', { name: 'Send message', exact: true }).click();
      await page.getByRole('alert').filter({ hasText: 'Request timed out' }).waitFor({ timeout: 15000 });
      check('contact timeout releases fields', await page.locator('#contact-message').isEnabled());
      formMode = 'success';
      await page.getByRole('button', { name: 'Send message', exact: true }).click();
      await page.getByText('Message sent successfully!', { exact: true }).waitFor();
      check('contact retry success', await page.getByText('Message sent successfully!', { exact: true }).isVisible());
      await page.getByRole('button', { name: 'Send another message', exact: true }).click();
    } else {
      await page.getByRole('button', { name: 'Edit message', exact: true }).click();
      check('Edit message preserves all draft fields', await page.locator('#contact-name').inputValue() === 'Regression Visitor' && await page.locator('#contact-email').inputValue() === 'visitor@example.com' && await page.locator('#contact-message').inputValue() === 'Keep this message while returning to edit.');
    }
    await page.locator('#contact-name').fill('');
    await page.locator('#contact-email').fill('');
    await page.locator('#contact-message').fill('');
    await page.getByRole('button', { name: 'Send message', exact: true }).click();
    check('validation links error to invalid field', await page.locator('#contact-name').getAttribute('aria-invalid') === 'true' && await page.locator('#contact-name').getAttribute('aria-describedby') === 'contact-name-error' && await page.locator('#contact-name-error').isVisible());
    const quota = await context.newPage();
    quota.on('pageerror', error => result.errors.push(error.message));
    await quota.goto(origin + base);
    await quota.getByRole('button', { name: 'Change photo', exact: true }).click();
    await quota.evaluate(() => { Storage.prototype.setItem = () => { throw new DOMException('Full', 'QuotaExceededError'); }; });
    await quota.getByRole('button', { name: 'Save & Apply', exact: true }).click();
    check('quota failure closes portrait and shows persistence warning', await quota.getByText(/Photo applied for this visit/).isVisible() && await quota.getByRole('dialog', { name: 'Custom Portrait', exact: true }).count() === 0);
    await quota.close();
    check('custom portrait had committed', savedPortrait.startsWith('data:image/png'));
    for (const size of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }]) {
      await page.setViewportSize(size);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(350);
      check(`no overflow ${size.width}x${size.height}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: path.join(output, `${size.width}x${size.height}.png`) });
      await changePhoto.click();
      await portraitDialog.getByRole('button', { name: 'Save & Apply', exact: true }).scrollIntoViewIfNeeded();
      check(`portrait actions reachable ${size.width}x${size.height}`, await portraitDialog.getByRole('button', { name: 'Save & Apply', exact: true }).evaluate(el => { const box = el.getBoundingClientRect(); return box.top >= 0 && box.bottom <= innerHeight; }));
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'All projects', exact: true }).click();
      await catalog.waitFor({ state: 'visible' });
      check(`catalog controls reachable ${size.width}x${size.height}`, await catalog.getByRole('button', { name: 'Close catalog', exact: true }).isVisible());
      await page.keyboard.press('Escape');
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Toggle Navigation Menu', exact: true }).click();
    check('mobile menu exposes expanded state', await page.getByRole('button', { name: 'Toggle Navigation Menu', exact: true }).getAttribute('aria-expanded') === 'true');
    await page.locator('#mobile-navigation').getByRole('link', { name: 'About', exact: true }).click();
    check('mobile menu closes after navigation', await page.locator('#mobile-navigation').count() === 0);
    await page.getByRole('button', { name: 'View mindset details', exact: true }).click();
    const note = page.getByRole('dialog', { name: 'About Evgeny', exact: true });
    check('About note uses accessible dialog', await note.isVisible());
    await page.keyboard.press('Escape');
    check('About note Escape closes dialog', await note.count() === 0);
    const denied = await context.newPage();
    denied.on('pageerror', error => result.errors.push(error.message));
    await denied.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Denied', 'SecurityError'); } }); });
    await denied.goto(origin + base);
    check('storage denial keeps app alive', await denied.locator('h1').isVisible());
    await denied.close();
    const corrupt = await context.newPage();
    corrupt.on('pageerror', error => result.errors.push(error.message));
    await corrupt.addInitScript(() => { localStorage.setItem('evgeny_portfolio_github_repos_v4', '[{}]'); localStorage.setItem('evgeny_portfolio_github_timestamp_v4', String(Date.now())); });
    await corrupt.goto(origin + base);
    await corrupt.getByRole('button', { name: 'All projects', exact: true }).click();
    await corrupt.getByRole('dialog', { name: 'All Projects & Repositories', exact: true }).waitFor();
    check('corrupt cache is rejected', await corrupt.getByRole('dialog', { name: 'All Projects & Repositories', exact: true }).isVisible());
    await corrupt.close();
    await page.bringToFront();
    githubMode = 'live';
    await page.getByRole('button', { name: 'Refresh GitHub projects', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('[aria-label="Refresh GitHub projects"]').disabled);
    check('live sync reports success', await page.getByText(/Showing GitHub projects\./).count() > 0);
    await page.getByRole('button', { name: 'All projects', exact: true }).click();
    await catalog.getByRole('textbox', { name: 'Search projects' }).fill('Live-only');
    check('live-only project visible', await catalog.getByRole('button', { name: 'View Live-only details', exact: true }).isVisible());
    githubMode = 'offline';
    await catalog.getByRole('button', { name: 'Refresh catalog' }).click();
    await page.waitForFunction(() => !document.querySelector('[aria-label="Refresh catalog"]').disabled);
    check('offline refresh retains live-only project', await catalog.getByRole('button', { name: 'View Live-only details', exact: true }).isVisible());
    check('offline refresh explains saved data', await catalog.getByText(/Showing saved projects/).isVisible());
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 1440, height: 900 });
    const sections = [['home', 'HOME'], ['projects', 'PROJECTS'], ['about', 'ABOUT ME'], ['stack', 'TECH STACK'], ['contact', 'CONTACT']];
    for (const [index, [id, label]] of [...sections, ...sections.slice().reverse()].entries()) {
      await page.getByRole('button', { name: `Go to section ${label}`, exact: true }).click();
      await page.waitForFunction(id => document.querySelector('[data-active-header]')?.getAttribute('data-active-header') === id, id, { timeout: 5000 });
      await page.waitForTimeout(1000);
      result.lastNavigation = await page.evaluate(() => ({ y: scrollY, overflow: document.documentElement.style.overflow, bodyOverflow: document.body.style.overflow, active: document.querySelector('[data-active-header]')?.getAttribute('data-active-header'), sections: ['home','projects','about','stack','contact'].map(id => ({ id, top: document.getElementById(id).getBoundingClientRect().top })), classes: document.documentElement.className }));
      check(`HUD active after navigation ${index}:${id}`, await page.locator(`[data-active-header="${id}"]`).count() === 1);
      await page.setViewportSize({ width: index % 2 ? 1440 : 1200, height: 900 });
      await page.waitForTimeout(500);
      const expected = await page.evaluate(() => {
        let active = 'home';
        for (const id of ['home', 'projects', 'about', 'stack', 'contact']) {
          const el = document.getElementById(id);
          if (el.getBoundingClientRect().top <= 141 || (id === 'contact' && scrollY + innerHeight >= document.documentElement.scrollHeight - 2)) active = id;
        }
        return active;
      });
      check(`HUD resize ${index}:${expected}`, await page.locator(`[data-active-header="${expected}"]`).isVisible() && await page.locator(`[data-active-header="${expected}"]`).evaluate(el => Number(getComputedStyle(el).opacity) > 0));
    }
    await page.getByRole('button', { name: 'Backend', exact: true }).click();
    await page.getByRole('button', { name: 'Go to section CONTACT', exact: true }).click();
    await page.waitForTimeout(1500);
    check('HUD refreshes after Stack height change', await page.locator('[data-active-header="contact"]').isVisible());
    await page.getByRole('button', { name: 'All Technologies', exact: true }).click();
    for (const label of ['HOME', 'CONTACT', 'ABOUT ME', 'PROJECTS', 'TECH STACK']) {
      await page.getByRole('button', { name: `Go to section ${label}`, exact: true }).click();
      await page.waitForTimeout(40);
    }
    await page.waitForFunction(() => document.querySelector('[data-active-header="stack"]'), null, { timeout: 5000 });
    await page.waitForTimeout(1000);
    check('rapid navigation settles on last selected section', await page.locator('[data-active-header="stack"]').isVisible());
    await page.evaluate(() => { const max = document.documentElement.scrollHeight - innerHeight; window.scrollTo(0, scrollY + document.getElementById('projects').getBoundingClientRect().top - 140 - max * 0.05); });
    await page.waitForTimeout(800);
    const moving = await page.locator('[data-transit-section="projects"] .hud-char-transit').evaluateAll(elements => elements.filter(el => Number(getComputedStyle(el).opacity) > 0).map(el => getComputedStyle(el).transform));
    check('SVG letter motion is retained', moving.length > 0 && moving.some(transform => transform !== 'none'));
    await page.screenshot({ path: path.join(output, 'hud-motion.png') });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(400);
    check('reduced motion hides transit letters', await page.locator('.hud-char-transit').evaluateAll(elements => elements.every(el => Number(getComputedStyle(el).opacity) === 0)));
    await page.getByRole('button', { name: 'Go to section CONTACT', exact: true }).click();
    await page.waitForTimeout(100);
    check('reduced motion navigation remains functional', await page.locator('[data-active-header="contact"]').isVisible());
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    check('NEXT is hidden on mobile', !await page.locator('.hud-next-slot').isVisible());
    check('only visible active header is focusable', await page.locator('[data-active-header]').count() === 1);
    check('progress has numeric accessible value', Number.isFinite(Number(await page.getByRole('progressbar', { name: 'Page scroll progress' }).getAttribute('aria-valuenow'))));
    check('no uncaught application errors', result.errors.length === 0);
    check('all requested local assets exist under base path', result.missingAssets.length === 0);
    blockDetails = true;
    const missingChunk = await context.newPage();
    const chunkErrors = [];
    missingChunk.on('pageerror', error => chunkErrors.push(error.message));
    await missingChunk.goto(origin + base);
    await missingChunk.getByRole('button', { name: 'All projects', exact: true }).click();
    const failedCatalog = missingChunk.getByRole('dialog', { name: 'All Projects & Repositories', exact: true });
    await failedCatalog.getByRole('button', { name: 'View FreeChat details', exact: true }).click();
    await missingChunk.getByRole('dialog', { name: 'Project details unavailable', exact: true }).waitFor();
    check('lazy chunk failure has accessible recovery above catalog', await missingChunk.getByRole('button', { name: 'Reload page', exact: true }).isVisible());
    await missingChunk.keyboard.press('Escape');
    check('chunk failure dismiss returns to usable catalog', await failedCatalog.isVisible() && chunkErrors.length === 0);
    await missingChunk.close();
  } catch (error) { result.failure = error.stack; process.exitCode = 1; }
  finally { await browser?.close(); fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2)); }
})();
