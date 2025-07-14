async function login(page, username, password) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

export { login };