// Multiple tabs- pop-up event

//Steps
//1. Launch the URL
//2. wait for 'popup' event to appear on the page const page1 = page.waitForEvent('popup')
//3. Identify and click on the element/ button responsible for generation of new tab/pop-up event
//4. wait for successful event from waitForEvent('popup') - const newPage = await page1
//5. perform actions on new tab/pop-up page using newPage variable
//6. switch back to parent page using 'page' variable

import {test, expect} from '@playwright/test'

test('multiple tabs handling', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html')

    const page1 = page.waitForEvent('popup');

    await page.getByText('click',{exact:true}).first().click();

    const newPage = await page1;

    await newPage.getByText('Downloads', {exact:true}).click();

    await expect(newPage.locator('#bindings')).toBeVisible();

    await page.getByText('Home', {exact:true}).click();

    await expect(page.getByPlaceholder('Email id for Sign Up')).toBeVisible();
})

test('windows handle again', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html')

    const page1 = page.waitForEvent('popup');

    await page.getByText('click',{exact:true}).first().click();

    const newPage = await page1;

    await newPage.getByText('Downloads', {exact:true}).click();

    await expect(newPage.locator('h2#bindings')).toContainText('Selenium Clients and WebDriver Language Bindings');

    await page.getByText('Home',{exact:true}).click();

    await expect(page.getByPlaceholder('mail id for Sign Up')).toBeVisible();

})