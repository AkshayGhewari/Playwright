import {test} from '@playwright/test'

test('create storage state', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill("tonystark@breakpoint.com")
    await page.getByPlaceholder('enter your passsword').fill("Breakpoint!98")
    await page.locator('#login').click();

    await page.waitForTimeout(5000)

    await page.context().storageState({path:'testData/auth.json'})
})