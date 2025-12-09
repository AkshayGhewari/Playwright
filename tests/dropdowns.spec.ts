//Dropdwon

//1. Static dropdown: values don't change
// 1.1 Single select
// 1.2 Multi select

//2. Dynamic dropdown: Values might change
// 2.1 Single select
// 2.2 Multi select

//Using <select> tag
//Using <non-select> tag


//1. Select tag dropdwon

//s1. launch url
//s2. locate dropdown
//s3. Get from dordown using SlectOption(value, index, label)
//s4. Same for multiselect

//2. NOn- Select tag dropdwon

//s1. launch url
//s2. locate dropdown and click
//s3. locate element in dropdown
//s4. Click on option

import {test,expect} from '@playwright/test'

test('select dropdown', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dropdown")
    await page.locator('select#country').selectOption("AS");
    await expect(page.locator('select#country')).toHaveValue("AS")
    await page.waitForTimeout(2000)

    await page.locator('select#country').selectOption({value:'BS'});
    await expect(page.locator('select#country')).toHaveValue("BS")
    //assert
    await page.waitForTimeout(2000)

    await page.locator('select#country').selectOption({label:'Georgia'});
    await expect(page.locator('select#country')).toHaveValue("GE")
    await page.waitForTimeout(2000)

    await page.locator('select#country').selectOption({index:1});
    await expect(page.locator('select#country')).toHaveValue("AF")
    await page.waitForTimeout(2000)


    await page.goto('https://demoqa.com/select-menu');
    await page.locator('select#cars').selectOption(['saab','audi'])
    await page.waitForTimeout(2000)

    await page.locator('select#cars').selectOption([{value:'volvo'},{value:'audi'}])
    await expect(page.locator('select#cars')).toHaveValues(['volvo','audi']);
    //await page.waitForTimeout(2000)
    //tohaveValeus
})

test('without select dropdown', async ({page})=>{
    await page.goto('https://demoqa.com/select-menu');
    await page.locator('div.css-1hwfws3').first().click();
    await page.locator('#react-select-2-option-2').click();
    await page.waitForTimeout(2000)

    await page.locator('div.css-1hwfws3').last().click();
    await page.getByText('Blue',{exact:true}).last().click();
    await page.locator('#react-select-4-option-3').click();
    await page.waitForTimeout(2000)
}) 


test('select again',async ({page})=>{
    // await page.goto('https://practice.expandtesting.com/dropdown')
    // await page.locator('select#country').selectOption('Afghanistan');
    // await expect(page.locator('select#country')).toHaveValue('AF');

    // await page.locator('select#country').selectOption({value:'AL'});
    // await expect(page.locator('select#country')).toHaveValue('AL');

    // await page.locator('select#country').selectOption({index:2})
    // await expect(page.locator('select#country')).toHaveValue('AX');

    // await page.locator('select#country').selectOption({label:'Georgia'})
    // await expect(page.locator('select#country')).toHaveValue('GE');

     await page.goto('https://demoqa.com/select-menu');
    // await page.locator('select#cars').selectOption([{value:'volvo'},{value:'audi'}])
    // await expect(page.locator('select#cars')).toHaveValues(['volvo','audi']);


    await page.locator('div.css-1hwfws3').first().click();
    await page.locator('div#react-select-2-option-0-0').click();
    await expect(page.locator('div.css-1hwfws3').first()).toHaveText('Group 1, option 1')
})