import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Update the Pet Types and verify if it is updated', async ({ page }) => {
  await expect(page.locator('body')).toContainText('Welcome to Petclinic');
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await expect(page.locator('body')).toContainText('Pet Types');
  const catRow = page.getByRole('row', { name: 'cat' });
  await catRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByText('Edit Pet Type')).toBeVisible();
  await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/3773');
  await page.locator('input[name="name"]').fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'rabbit' })).toBeVisible();
  const rabbitrow= page.getByRole('row', { name: 'rabbit' });
  await rabbitrow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByText('Edit Pet Type')).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveValue('rabbit');
  await page.locator('input[name="name"]').fill('cat');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByRole('row', { name: 'cat' })).toBeVisible();
});