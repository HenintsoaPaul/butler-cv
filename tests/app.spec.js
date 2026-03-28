import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Butler CV/);
});

test('can update personal info', async ({ page }) => {
  await page.goto('/');
  
  // Find name input and type
  const nameInput = page.getByLabel('Full Name');
  await nameInput.fill('John Doe');
  
  // Check if preview updates
  const preview = page.getByTestId('preview-panel');
  await expect(preview).toContainText('John Doe');
});

test('can switch templates', async ({ page }) => {
  await page.goto('/');
  
  // Locate the TemplateSelector buttons
  const modernTemplateButton = page.getByRole('button', { name: 'Modern' });
  await modernTemplateButton.click();
  
  // Check if it's active
  // Since active templates don't have opacity-60, we check for its absence
  await expect(modernTemplateButton).not.toHaveClass(/opacity-60/);
  
  // Also check the label color if needed, but not having opacity-60 is a good start
  // The label is inside the button
  const label = modernTemplateButton.getByText('Modern');
  await expect(label).toHaveClass(/text-primary-600/);
});

test('can toggle editor visibility on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // On mobile, the editor should be visible initially because setEditorVisible(true) is default
  // and editorVisible && <Box> is rendered.
  // Although App.jsx line 229 hides the preview when editor is visible on mobile.
  
  const toggleButton = page.getByLabel('Toggle editor');
  await expect(toggleButton).toBeVisible();

  const editor = page.getByTestId('editor-panel');
  await expect(editor).toBeVisible();

  await toggleButton.click();
  await expect(editor).not.toBeAttached();

  await toggleButton.click();
  await expect(editor).toBeVisible();
});
