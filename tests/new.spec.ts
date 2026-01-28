import {expect, test} from '@playwright/test'

test('new', async ({page})=>{
	await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash')
	await page.getByPlaceholder('email@example.com').fill('asa')
	await page.screenshot({path:'testData/ss.png'})

	await page.waitForSelector('', {state: 'visible'})

	await page.locator('').click()

	let num = 100;
})