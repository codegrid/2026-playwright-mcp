import { test, expect } from '@playwright/test';

test('未ログインでの有料記事にアクセス時のテスト', async ({ page }) => {
  await page.goto('/articles/2026-meta-framework-selection-3/');

  const header = page.locator('.cg-GlobalHeader');
  await expect(
    header.getByRole('link', { name: '購読 する', exact: true }),
  ).toBeVisible();
  await expect(
    header.getByRole('link', { name: 'ログイン', exact: true }),
  ).toBeVisible();

  const article = page.locator('article');
  await expect(
    article.getByRole('heading', {
      name: 'この記事を読むには 購読の手続きが必要です',
      exact: true,
    }),
  ).toBeVisible();

  await header.getByRole('link', { name: '購読 する', exact: true }).click();

  const payment = page.locator('.cg-Payment');
  await expect(
    payment.getByRole('button', {
      name: '購読のためのGoogleアカウントを選択',
      exact: true,
    }),
  ).toBeVisible();
});
