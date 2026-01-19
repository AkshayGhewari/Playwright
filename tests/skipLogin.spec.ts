import {test} from '@playwright/test'

test('skip login', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
    await page.waitForTimeout(4000);
})

test('skip loginas', async function ({page}) {
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
    await page.waitForTimeout(4000);
})