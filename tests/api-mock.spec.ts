import { test, expect } from '@playwright/test'
//import { count } from 'console';

// test('mock api', async ({ page }) => {

//     //mock API request
//     await page.route('*/**/api/v1/fruits', async route => {
//         const json = [
//             { name: 'playwright text', id: 1 },
//             { name: 'selenium text', id: 2 },
//             { name: 'appium text', id: 3 },
//             { name: 'katlon text', id: 4 },
//         ];
//         await route.fulfill({json})
//     });


//     await page.goto('https://demo.playwright.dev/api-mocking/')

//     await expect(page.getByText('playwright text')).toBeVisible();
//     await expect(page.getByText('selenium text')).toBeVisible();
//     await expect(page.getByText('appium text')).toBeVisible();
//     await expect(page.getByText('katlon text')).toBeVisible();

//     await page.waitForTimeout(3000);
// })



test('mock api', async ({page})=>{

    await page.route('*/**/api/v1/fruits', async route =>{
        const json =[
            { name: 'playwright text', id: 1 },
            { name: 'selenium text', id: 2 },
            { name: 'appium text', id: 3 },
            { name: 'katlon text', id: 4 },
        ];
        await route.fulfill({json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking/')
    const num = await (page.getByText('playwright text')).count();
    console.log(num);
})