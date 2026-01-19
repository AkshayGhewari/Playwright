//Frames: webapp inetgrated inside another application using iframe

//Stesp to handle frames
//1. Launch the URL - page.goto()- Visibility only on launched page
//2. perfrom action on main page
//3. Identify frame avaiable on the page- lcoatro to identify iframe tag
//const framePage = page.frameLocator()
//Nested frames - const nestedFrame = framePage.frameLocator()
//4. Pefrorm action on frames use framePage
//5. Perfrom action on main page use page


import { test, expect } from '@playwright/test';

test('handling frames', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();

    await page.locator('#hide-textbox').click();

    await expect(page.getByPlaceholder('Hide/Show Example')).not.toBeVisible();

    const framePage = page.frameLocator('courses-iframe');

    await framePage.getByText('All-Access', {exact: true}).click();

    await expect(framePage.getByText('Premium Access Plans')).toBeVisible();

    await page.getByText('Home').click(); 

})

test("nested frames", async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html');

    await page.getByText('Iframe with in an Iframe').click();

    const outerFrame = page.frameLocator('#Multiple iframe');

    const innerFrame = outerFrame.frameLocator('.iframe-container iframe');

    await innerFrame.locator('div.row input').fill('inner frame');

    await expect(innerFrame.locator('div.row input')).toHaveValue('inner frame');

    await page.getByRole('link',{name:'Home'}).click();

    await expect(page.getByPlaceholder('Email id for Sign Up')).toBeVisible();
})


test('frames again', async({page})=>{
    page.goto('https://demo.automationtesting.in/Frames.html');
    page.getByText('Iframe with in an Iframe').click();

    const outerFrame = page.frameLocator('#Multiple iframe');

    const innerFrame = outerFrame.frameLocator('.iframe-container iframe');

    await innerFrame.locator('div.row input').fill('inner frame');

    await expect(innerFrame.locator('div.row input')).toHaveValue('inner frame');

    await page.getByRole('link', {name:'Home'}).click();

    await expect(page.getByPlaceholder('Email id for Sign Up')).toBeVisible();

})
