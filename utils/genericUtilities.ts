import { Page, expect, TestInfo } from '@playwright/test';

export async function clickElement(page: Page, selector: string) {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  await el.click();
}

export async function fillTextField(page: Page, selector: string, value: string) {
  const el = page.locator(selector);
  await expect(el).toBeEditable();
  await el.fill(value);
}

// Utility to remove ads dynamically
export async function removeAds(page: Page) {
  await page.evaluate(() => {

    // Only remove known ad containers
    const adSelectors = [
      '#fixedban',
      '.Advertisement',
      'iframe[src*="ads"]',
      'iframe[src*="doubleclick"]',
      '[class*="adsbygoogle"]',
      '[id^="google_ads"]',
      '[id^="aswift_"]',
      '.ad-container',
    ];

    for (const sel of adSelectors) {
      document.querySelectorAll(sel).forEach(el => el.remove());
    }
  });
}

// Utility to wait for stable DOM
export async function waitForStableDOM(page: Page, timeout = 2000) {
  const stablePeriod = 100; 
  let lastHTML = '';
  let stableTime = 0;

  const start = Date.now();
  while (Date.now() - start < timeout) {
    const currentHTML = await page.content();
    if (currentHTML === lastHTML) {
      stableTime += 100;
      if (stableTime >= stablePeriod) return;
    } else {
      stableTime = 0;
      lastHTML = currentHTML;
    }
    await page.waitForTimeout(100);
  }
  console.warn('DOM did not stabilize within timeout');
}


