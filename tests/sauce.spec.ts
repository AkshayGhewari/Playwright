import {test, expect} from '@playwright/test';

test('invalid user saucelabs flow2', async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username', {exact:true}).fill('standard_user')
    await page.getByPlaceholder('Password', {exact:true}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()
    //await expect(page.getByRole('heading', {name:'Products'})).toContainText('Products')
})