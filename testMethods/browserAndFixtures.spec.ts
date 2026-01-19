//browser(used 5% of times) and pageFixtures(used 95% of times)

//Built in feature - browser, page -setup and teardown

//browser: will be able to create mutliple tabs
//page: will not be able to create multiple tabs


import {test,expect} from '@playwright/test'

test('Browser fixtrue', async ({browser})=>{
    //browser context: launching browser
   const context = await browser.newContext();
   
   //create a page: newPage
   const page = await context.newPage();

   await page.goto("https://google.com");

   const page1 = await context.newPage();
   await page1.goto("https://facebook.com");

   //2 different tabs
})

test('Page fixtrue', async ({page})=>{

    //same tab multiple times
    await page.goto("https://google.com");
    await page.goto("https://facebook.com");
})



test('again', async({browser})=>{

    const context = await browser.newContext();

    const page = await context.newPage();

    page.goto("https://google.com")
})