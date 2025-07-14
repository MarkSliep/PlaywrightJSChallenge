import { test, expect } from '@playwright/test';
import { login } from '../../utilities/ui-utilities/loginPageUtil.js';

test('Given_NavigatingToLoginPage_When_UrlIsEnterted_Then_LoginPageDisplayedSuccessfully', async ({ page }) => {
  // Using the login utility function to perform the login action
  await page.goto('https://www.saucedemo.com/');

  // Expecting the page to navigate to the products page
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-container"]')).toMatchAriaSnapshot(`
    - textbox "Username"
    - textbox "Password"
    - button "Login"
    - heading "Accepted usernames are:" [level=4]
    - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
    - heading "Password for all users:" [level=4]
    - text: secret_sauce
    `);
});

test('Given_ValidLoginCredentials_When_LoginIsClicked_Then_LoginSuccessful', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'standard_user', 'secret_sauce');

  // Expecting the title of the page to be 'Products'
  await expect(page.locator('.title')).toHaveText('Products');
});

test('Given_InalidLoginCredentials_When_LoginIsClicked_Then_LoginUnsucessfulWithCorrectError', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'standard_user', 'secret_sauce_invalid');

 // Expecting the error message to be displayed
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('Given_UsernameWithoutPassword_When_LoginIsClicked_Then_LoginSuccessful', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, 'standard_user', '');

 // Expecting the error message to be displayed
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
});

test('Given_EmptyCredentials_When_LoginIsClicked_Then_CorrectErrorIsReturned', async ({ page }) => {
  // Using the login utility function to perform the login action
  await login(page, '', '');

 // Expecting the error message to be displayed
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
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

test('Given_AttemptToAccessInventoryPage_When_NotLoggedIn_Then_LoginPageIsDisplayedWithCorrectError', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Expecting the page to navigate to the products page
  await expect(page).toHaveURL('https://www.saucedemo.com');
   // Expecting the error message to be displayed
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
});