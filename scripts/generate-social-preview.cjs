const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const photo = fs.readFileSync(path.join(root, 'public/assets/my-photo.webp')).toString('base64');
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(`<!doctype html><html><head><style>
      *{box-sizing:border-box}body{margin:0;background:#fafaf9;color:#111;font-family:Arial,sans-serif;padding:44px}
      .brand{font-size:26px;font-weight:600;margin-bottom:28px}.brand span{color:#9ca3af;font-weight:400}
      .card{display:flex;height:458px;border-radius:32px;background:#ebebec;overflow:hidden;border:1px solid #d4d4d4}
      .copy{padding:42px;width:65%}h1{font-family:Georgia,serif;font-weight:400;font-size:66px;letter-spacing:-2px;line-height:1.04;margin:0 0 26px}h1 span{color:#9ca3af}
      p{color:#525252;font-size:21px;line-height:1.6;max-width:470px}.tags{margin-top:35px;font-size:16px;color:#525252}
      img{width:35%;height:100%;object-fit:cover;object-position:top;filter:grayscale(1) contrast(1.05) brightness(.95)}
    </style></head><body><div class="brand">Evgeny<span>.dev</span></div><div class="card"><div class="copy"><h1>Building Digital<br><span>Experiences.</span></h1><p>Thoughtful applications, modern interfaces and digital products.</p><div class="tags">ANDROID &nbsp; / &nbsp; WEB &nbsp; / &nbsp; UI/UX</div></div><img src="data:image/webp;base64,${photo}" alt="Evgeny"></div></body></html>`);
    await page.locator('img').evaluate(image => image.decode());
    await page.screenshot({ path: path.join(root, 'public/assets/social-preview.png') });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
