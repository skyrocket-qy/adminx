import { expect, test } from '@playwright/test';

test('blog lists all stories and opens the Dance story', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'networkidle' });

  const storyHeadings = page.getByRole('heading', { level: 3 });
  await expect(storyHeadings).toHaveCount(15);

  await page.getByRole('heading', { level: 3, name: 'Dance - My Journey' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Archeology' })).toBeVisible();
});

test('successful login redirects to the admin area', async ({ page }) => {
  await page.goto('/auth');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('secret');
  await page.getByRole('button', { name: /log in/i }).click();

  await page.waitForURL('**/admin');
  expect(page.url()).toContain('/admin');
});

test('blog story selection stays on the blog route', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'networkidle' });

  await page.getByRole('heading', { level: 3, name: 'Gorm transation' }).click();

  await expect(page.getByRole('heading', { level: 1, name: /Gorm/ })).toBeVisible();
  expect(new URL(page.url()).pathname).toBe('/blog');
});

test('about info renders the CV from resumer', async ({ page }) => {
  await page.goto('/about/info', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { level: 1, name: 'Jimmy Huang' })).toBeVisible();
  await expect(
    page.getByText('Fortune Fantasy Global Tech .Ltd, Backend Engineer')
  ).toBeVisible();
  await expect(
    page.getByText('AWS Certified Solutions Architect – Associate')
  ).toBeVisible();

  const download = page.getByRole('link', { name: 'Download PDF' });
  await expect(download).toHaveAttribute('href', '/resume/Jimmy_Huang_CV.pdf');
});
