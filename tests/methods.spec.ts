//Methods

import { test, expect } from "@playwright/test";

test('Fill and validate input value', async ({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/")
    
    //css
    //fill('value')
    //pressSequentially('value')
    await page.locator('input#username').fill('student');

    await expect(page.locator('input#username')).toHaveValue('student');

    await page.getByLabel('Password').fill('Password123');

    await expect(page.getByLabel('Password')).toHaveValue('Password123');

    await page.getByRole('button', {name:'Submit'}).click();

    await expect(page.locator('h1.post-title')).toBeVisible();
    await expect(page.locator('h1.post-title')).toHaveText('Logged In Successfully');

})

test("Same again", async({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/")

    const username = await page.locator('ul li b').first().textContent();
    await page.locator('input#username').fill(username);

     const password = await page.locator('ul li b').last().textContent();
    await page.locator('input#password').fill(password);

    await page.getByRole('button', {name:'Submit'}).click();

    await expect(page.locator('h1.post-title')).toBeVisible();
    await expect(page.locator('h1.post-title')).toHaveText('Logged In Successfully');
})
