import { test } from '@playwright/test'

test('contexts', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://www.youtube.com/')

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('https://playwright.dev/')

    await context.storageState({ path: '' })

})

test('login', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    await page.getByPlaceholder('email@example.com').fill("tonystark@breakpoint.com")
    await page.getByPlaceholder('enter your passsword').fill("Breakpoint!98")

    await page.locator('#login').click();

    await page.waitForTimeout(5000)

    await page.context().storageState({ path: 'testData/auth.json' })
})