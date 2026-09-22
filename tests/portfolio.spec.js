import { test, expect } from '@playwright/test';

const requiredSections = ['#work', '#experience', '#skills', '#education', '#contact'];

test.describe('portfolio smoke and UI tests', () => {
  test('loads the portfolio and main content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Raghav Mittal/i);
    await expect(page.getByRole('link', { name: 'RAGHAV MITTAL' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Building intelligent, scalable web experiences/i })).toBeVisible();
    for (const selector of requiredSections) {
      await expect(page.locator(selector)).toBeVisible();
    }
  });

  test('navigation links point to real sections', async ({ page }) => {
    await page.goto('/');
    for (const name of ['Work', 'Experience', 'Skills', 'Education', 'Contact']) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toHaveAttribute('href', `#${name.toLowerCase()}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
    }
  });

  test('project cards render valid images and links', async ({ page, request }) => {
    await page.goto('/');
    for (const name of ['MovieFlix', 'Stream Box', 'Healthcare Portal']) {
      const card = page.locator('.project').filter({ hasText: name });
      await expect(card).toBeVisible();
      const image = card.locator('img');
      await expect(image).toBeVisible();
      await expect(image).toHaveJSProperty('complete', true);
      await expect(image).toHaveJSProperty('naturalWidth').not.toBe(0);
      const link = card.getByRole('link').first();
      await expect(link).toHaveAttribute('href', /https:\/\//);
      const response = await request.get(await link.getAttribute('href'));
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('profile image, CV, and favicon are reachable', async ({ page, request }) => {
    await page.goto('/');
    for (const path of ['/profile.jpeg', '/Raghav_CV.pdf', '/favicon.svg']) {
      const response = await request.get(path);
      expect(response.status(), path).toBeLessThan(400);
    }
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
  });

  test('CV link points to the hosted PDF', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Download CV/i })).toHaveAttribute('href', '/Raghav_CV.pdf');
  });

  test('Vercel Analytics request is emitted', async ({ page }) => {
    const analyticsRequest = page.waitForRequest(request => request.url().includes('/_vercel/insights/'), { timeout: 15000 });
    await page.goto('/');
    await analyticsRequest;
  });

  test('keyboard focus reaches interactive controls', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    await expect(page.locator(':focus')).toHaveAttribute('href', /./);
  });

  test('mobile layout does not create horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
  });

  test('security headers are present without requiring CSP', async ({ request }) => {
    const response = await request.get('/');
    expect(response.headers()['strict-transport-security']).toBeTruthy();
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['x-frame-options']).toBe('DENY');
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(response.headers()['permissions-policy']).toContain('camera=()');
    expect(response.headers()['content-security-policy']).toBeUndefined();
  });
});
