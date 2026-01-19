import {test, expect} from '@playwright/test';
const invalidUsername = "locked_out_user";
const validUsername = "standard_user";
const password = "secret_sauce";
const product = "Sauce Labs Fleece Jacket";

test('invalid user saucelabs flow', async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username', {exact:true}).fill('locked_out_user');
    await page.getByPlaceholder('Password', {exact:true}).fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
})

test('saucelabs flow', async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username', {exact:true}).fill(validUsername);
    await page.getByPlaceholder('Password', {exact:true}).fill(password);
    await page.locator('#login-button').click();
    await expect(page.locator('span.title')).toContainText('Products');
    const products = page.locator('.inventory_item_description');
    await products.last().waitFor();
    await products.filter({hasText:`${product}`}).locator('.btn_primary').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('span.title')).toContainText('Your Cart');
    const productsInCart = page.locator('.cart_item_label');
    await productsInCart.last().waitFor();
    await expect(productsInCart.filter({hasText:`${product}`}).locator('.inventory_item_name')).toContainText(product);
    await page.locator('button#checkout').click();
    await expect(page.locator('span.title')).toContainText('Checkout: Your Information');
    await page.getByPlaceholder('First Name').fill('Ak');
    await page.getByPlaceholder('Last Name').fill('Gh');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.locator('#continue').click();
    await expect(page.locator('span.title')).toContainText('Checkout: Overview');
    const productsInCheckout = page.locator('.cart_item_label');
    await productsInCheckout.last().waitFor();
    await expect(productsInCheckout.filter({hasText:`${product}`}).locator('div.inventory_item_name')).toContainText(product);
    await page.locator('button#finish').click();
    await expect(page.locator('span.title')).toContainText('Checkout: Complete!');
    await expect(page.locator('h2.complete-header')).toContainText('Thank you for your order!');
    await page.locator('button#react-burger-menu-btn').click();
    await page.locator('a#logout_sidebar_link').click();
    await expect(page.getByPlaceholder('Username', {exact:true})).toBeVisible();
    await expect(page.getByPlaceholder('Password', {exact:true})).toBeVisible();

})