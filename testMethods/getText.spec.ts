import {test,expect} from "@playwright/test"
import { console } from "inspector";

test('get text', async ({page})=>{
    await page.goto("https://www.xe.com/currencyconverter/")

    const headingText = await page.locator('h1.text-center').textContent();
    console.log(headingText)

    //static assertion: non retrying
    expect(headingText).toBe("Xe Currency Converter");
    expect(headingText).toContain("Converter");

    await page.goto("https://testautomationpractice.blogspot.com/")

    //returns array of values of all matching elements
    const allText = await page.locator('h2.title').allTextContents();
    console.log(allText);
})

test('again', async({page})=>{
    page.goto('https://www.xe.com/currencyconverter/')

    const pageHeader= await page.locator('h1.mb-2').textContent();

    console.log(pageHeader)
    expect(pageHeader).toBe('Xe Currency Converter');
    expect(pageHeader).toContain('Xe Currency Converter');

    await page.goto('https://testautomationpractice.blogspot.com/')

    const allTitles = await page.locator('h2.title').allTextContents();

    console.log(allTitles)

})