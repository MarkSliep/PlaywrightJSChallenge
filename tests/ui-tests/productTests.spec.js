import { test, expect } from '@playwright/test';
import { login } from '../../utilities/ui-utilities/loginPageUtil.js';

[
  { loginUser: 'standard_user'},
  { loginUser: 'problem_user'},
].forEach(({ loginUser }) => {
test(`Given_UserLogged_When_LoginIsSuccessful_Then_ProductsLandingPageIsDisplayedCorrectly(${loginUser})`, async ({ page }) => {
  
  await login(page, loginUser, 'secret_sauce');

  await expect(page).toHaveScreenshot('/productTests.spec.js-snapshots/productsLandingPage.png');
})});

test(`Given_UserSelectsProduct_When_SelectingProductDescription_Then_ProductsDisplaysCorrectPrice`, async ({ page }) => {
  
  await login(page, 'standard_user', 'secret_sauce');

  const price = await page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Backpackcarry.' }).locator('[data-test="inventory-item-price"]').innerText();

  await page.locator('[data-test="item-4-title-link"]').click();

  const descPrice = await page.locator('[data-test="inventory-item-price"]').innerText();
  expect(descPrice).toBe(price);
});

test(`Given_LoggedInUser_When_AddingItemToCartFromLandingPage_Then_ItemSuccessfullyAddedToCart`, async ({ page }) => {
  
  await login(page, 'standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  const itemCarCount = await page.locator('[data-test="shopping-cart-badge"]').innerText();
  expect(itemCarCount).toBe('1');
});

test(`Given_LoggedInUser_When_AddingItemToCartFromLandingPageAndDescriptionPage_Then_ItemsSuccessfullyAddedToCart`, async ({ page }) => {
  
  await login(page, 'standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('[data-test="item-3-title-link"]').click();

  await page.locator('[name="add-to-cart"]').click();

  const itemCarCount = await page.locator('[data-test="shopping-cart-badge"]').innerText();
  expect(itemCarCount).toBe('2');
});


test('Given_SelectingProductOrder_When_ClickingSortOrder_Then_ProductsAreSortedCorrectly', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');

  await expect(page).toHaveScreenshot('/productTests.spec.js-snapshots/productsLandingPage.png');

  await page.locator('[data-test="product-sort-container"]').selectOption('az');

  await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - link "Sauce Labs Backpack":
      - /url: "#"
      - img "Sauce Labs Backpack"
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bike Light":
      - /url: "#"
      - img "Sauce Labs Bike Light"
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
      - img "Sauce Labs Bolt T-Shirt"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
      - img "Sauce Labs Fleece Jacket"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Onesie":
      - /url: "#"
      - img "Sauce Labs Onesie"
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
      - img "Test.allTheThings() T-Shirt (Red)"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
      - img "Test.allTheThings() T-Shirt (Red)"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Onesie":
      - /url: "#"
      - img "Sauce Labs Onesie"
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
      - img "Sauce Labs Fleece Jacket"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
      - img "Sauce Labs Bolt T-Shirt"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bike Light":
      - /url: "#"
      - img "Sauce Labs Bike Light"
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Backpack":
      - /url: "#"
      - img "Sauce Labs Backpack"
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  
  await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - link "Sauce Labs Onesie":
      - /url: "#"
      - img "Sauce Labs Onesie"
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bike Light":
      - /url: "#"
      - img "Sauce Labs Bike Light"
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
      - img "Sauce Labs Bolt T-Shirt"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
      - img "Test.allTheThings() T-Shirt (Red)"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Backpack":
      - /url: "#"
      - img "Sauce Labs Backpack"
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
      - img "Sauce Labs Fleece Jacket"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

  await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
      - img "Sauce Labs Fleece Jacket"
    - link "Sauce Labs Fleece Jacket":
      - /url: "#"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Backpack":
      - /url: "#"
      - img "Sauce Labs Backpack"
    - link "Sauce Labs Backpack":
      - /url: "#"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
      - img "Sauce Labs Bolt T-Shirt"
    - link "Sauce Labs Bolt T-Shirt":
      - /url: "#"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
      - img "Test.allTheThings() T-Shirt (Red)"
    - link "Test.allTheThings() T-Shirt (Red)":
      - /url: "#"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bike Light":
      - /url: "#"
      - img "Sauce Labs Bike Light"
    - link "Sauce Labs Bike Light":
      - /url: "#"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Onesie":
      - /url: "#"
      - img "Sauce Labs Onesie"
    - link "Sauce Labs Onesie":
      - /url: "#"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
});
