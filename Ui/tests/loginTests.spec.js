import { test, expect } from '@playwright/test';
import { login } from '../helpers/loginPageUtil.js';

test('Given_ValidLoginCredentials_When_LoginIsClicked_Then_LoginSuccessful', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'standard_user', 'secret_sauce');

  // Expecting the page to navigate to the products page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  // Expecting the title of the page to be 'Products'
  await expect(page.locator('.title')).toHaveText('Products');
});

test('Given_LockedOutUserCredentials_When_LoginIsClicked_Then_LoginUnsucessfulWithCorrectError', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'locked_out_user', 'secret_sauce');

  // Expecting the error message to be displayed
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('Given_PerformanceGlitchUserCredentials_When_LoginIsClicked_Then_LoginSuccessful', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'performance_glitch_user', 'secret_sauce');

  // Expecting the page to navigate to the products page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  // Expecting the title of the page to be 'Products'
  await expect(page.locator('.title')).toHaveText('Products');
});