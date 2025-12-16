import {test, expect, request} from '@playwright/test';
import path from 'path';
import { execArgv } from 'process';

test('browser context', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await expect(page).toHaveTitle("Let's Shop");
})

test('radio button and checkbox', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const sundayCheckbox = page.locator('#sunday')
    await expect(sundayCheckbox).not.toBeChecked();
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await sundayCheckbox.uncheck();
    await expect(sundayCheckbox).not.toBeChecked();
})

test('mouse operations', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByText('Copy Text', {exact:true}).dblclick();
    await expect(page.locator('#field2')).toHaveValue('Hello World!')

    await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
    await page.getByText('right click me', {exact: true}).click({button:'right'});
    await expect(page.getByText('Paste', {exact:true})).toBeVisible();

    await page.goto('https://www.spicejet.com/');
    await page.getByText('Add-ons', {exact:true}).hover();
    await expect(page.getByText('Zero Cancellation - International',{exact:true})).toBeVisible();

    await page.goto('https://testautomationpractice.blogspot.com/');
    const drag = page.locator('div#draggable')
    const drop = page.locator('div#droppable')

    await drag.dragTo(drop);
    await expect(drop).toContainText('Dropped!')

    await page.reload();

    await drag.hover()
    await page.mouse.down()
    await drop.hover()
    await page.mouse.up()
    await expect(drop).toContainText('Dropped!')

    await page.reload();

    await page.getByText('Download Files',{exact:true}).scrollIntoViewIfNeeded()
    await page.getByText('Download Files',{exact:true}).click();
    await expect(page.getByText('Download a Text or PDF File')).toBeVisible();
})

test('keyboard actions', async({page})=>{
    await page.goto('https://demoqa.com/text-box')
    await page.getByPlaceholder('Full Name').fill('user nae')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('m')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('s')
    await expect(page.getByPlaceholder('Full Name')).toHaveValue('user names');
    await page.keyboard.press('Tab')
    await page.getByPlaceholder('name@example.com').fill('abc@gmail.con')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('m')
    await expect(page.getByPlaceholder('name@example.com')).toHaveValue('abc@gmail.com')

    await page.getByPlaceholder('Current Address').fill('Delhi');
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Control+V')
    await expect(page.locator('#permanentAddress')).toHaveValue('Delhi')
})

test('frames handling', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html')
    await page.getByText('Iframe with in an Iframe').click();

    const outerFrame = page.frameLocator('#Multiple iframe')
    const innerFrame = outerFrame.frameLocator('.iframe-container iframe');

    await innerFrame.locator('div.row input').fill('frame text')
    await expect(innerFrame.locator('div.row input')).toHaveValue('frame text')
})

test('files upload', async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    const file = path.join(__dirname,"../testData/QA_Interview_QA_Guide.pdf")
    await page.locator('#filesToUpload').setInputFiles(file);

    await expect(page.locator('#fileList')).toContainText('QA_Interview_QA_Guide.pdf')
    await page.locator('#filesToUpload').setInputFiles([]);
    await expect(page.locator('#fileList')).toContainText('No Files Selected')
})

test('drodpowns', async ({page})=>{
    await page.goto('https://practice.expandtesting.com/dropdown')
    await page.locator('select#country').selectOption({value:'AF'})
    await expect(page.locator('select#country')).toHaveValue('AF');

    await page.locator('select#country').selectOption({label:'Albania'})
    await expect(page.locator('select#country')).toHaveValue('AL');

    await page.locator('select#country').selectOption({index:1})
    await expect(page.locator('select#country')).toHaveValue('AF');
})

test('downloads handling', async ({page})=>{
    
})

test('child windows', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html')
    const page1 = page.waitForEvent('popup')
    await page.getByText('click',{exact:true}).first().click();
    const newPage = await page1
    await expect(newPage.getByText('Downloads', {exact:true})).toBeVisible()
})

test('alerts', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    // page.on('dialog',(dialog)=>{
    //     dialog.accept()
    // })
    // await page.getByText('Simple Alert').click();

    let name = 'Jack'
    page.on('dialog',(dialog)=>{
        dialog.accept(name)
    })
    await page.getByText('Prompt Alert').click();
})

test('API handling', async ({page})=>{

    const url = "https://rahulshettyacademy.com/api/ecom/auth/login"
    const payload ={userEmail: "tonystark@breakpoint.com", userPassword: "Breakpoint!98"}

    const apiContext = await request.newContext();
    const postResponse = await apiContext.post(url,{
        data: payload
    })

    expect(postResponse.status()).toEqual(200)

    const responseBody = await postResponse.json()

    expect(responseBody.message).toContain('')

    const token = await responseBody.token;

    await page.addInitScript((value)=>{
        window.localStorage.setItem('value', value)
    },token)


})