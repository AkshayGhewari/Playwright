import {expect,test} from '@playwright/test';

test('keyboard actions', async({page})=>{
    await page.goto('https://demoqa.com/text-box')

    await page.getByPlaceholder('Full Name').fill('Test usr');
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('e');
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('s');
    await expect(page.getByPlaceholder('Full Name')).toHaveValue('Test users')


   // await page.getByPlaceholder('Full Name').fill('Test user');

    await page.keyboard.press('Tab');
    await page.keyboard.type("abc@xyz.con");
    await page.keyboard.press('Backspace');
    await page.keyboard.type('m');

    await expect(page.getByPlaceholder('name@example.com')).toHaveValue("abc@xyz.com")   
    
    await page.keyboard.press('Tab');
    await page.keyboard.type("Current Address")
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')
    await page.keyboard.press('Tab');
    await page.keyboard.press('Control+V')

    await expect(page.locator('#permanentAddress')).toHaveValue('Current Address');
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Delete')

    await page.keyboard.down('Shift')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('KeyB')
    await page.keyboard.press('KeyC')
    await page.keyboard.up('Shift')

    await expect(page.locator('#permanentAddress')).toHaveValue('ABC');
})