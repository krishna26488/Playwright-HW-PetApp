import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Update the Pet Types and verify if it is updated', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to Petclinic');
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Pet Types');
  const catTableRow = page.getByRole('row', { name: 'cat' });
  await catTableRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Edit Pet Type');
  await expect(page.getByRole('textbox')).toHaveValue('cat');
  await page.getByRole('textbox').fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'rabbit' })).toBeVisible();
  await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Edit Pet Type');
  await expect(page.getByRole('textbox')).toHaveValue('rabbit');
  await page.getByRole('textbox').fill('cat');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'cat' })).toBeVisible();
});