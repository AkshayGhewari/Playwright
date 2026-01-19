import { test, expect } from '@playwright/test';

test('Select and validate radio button and checkbox', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('#male').click();

    await expect(page.locator('#male')).toBeChecked();

    await page.getByLabel('Tuesday', {exact:true}).check();
    await expect(page.getByLabel('Tuesday', {exact:true})).toBeChecked();

    await page.getByLabel('Tuesday', {exact:true}).uncheck();
    await expect(page.getByLabel('Tuesday', {exact:true})).not.toBeChecked();
    
})

test('again', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();

    await page.locator('#female').check();

    await expect(page.locator('#male')).not.toBeChecked();

    await page.getByLabel('Sunday', {exact:true}).check();
    await expect(page.getByLabel('Sunday')).toBeChecked();

    await page.getByLabel('Sunday', {exact:true}).uncheck();
    await expect(page.getByLabel('Sunday')).not.toBeChecked();
})