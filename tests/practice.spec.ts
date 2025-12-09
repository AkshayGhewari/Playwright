import {test, expect} from '@playwright/test'
import path from 'path';
import fs from 'fs';

//1. browser launch
test('browser context', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const title = await page.title();
    expect(title).toEqual("Let's Shop")
})

//2. radio button and checkbox
test('radio button and checkbox', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page.locator('#male')).not.toBeChecked();
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();

    await expect(page.locator('#sunday')).not.toBeChecked();
    await page.locator('#sunday').check();
    await expect(page.locator('#sunday')).toBeChecked();
    await page.locator('#sunday').uncheck();
    await expect(page.locator('#sunday')).not.toBeChecked();
})

//3. mouse operations
test('mouse operations', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page.locator('input#field2')).not.toHaveValue('Hello World!');
    await page.getByText('Copy Text').dblclick();
    await expect(page.locator('input#field2')).toHaveValue('Hello World!');

    await page.goto("https://demo.guru99.com/test/simple_context_menu.html")
    await page.getByText('right click me').click({button:'right'});
    await page.getByText('Paste',{exact:true}).click();

    await page.getByText('Double-Click Me To See Alert').dblclick();

    await page.goto('https://www.spicejet.com/')
    await page.getByText('Add-ons', {exact:true}).hover({force:true});

    await expect(page.getByText('Zero Cancellation - International')).toBeVisible();

    await page.goto("https://testautomationpractice.blogspot.com/");
    const source = page.locator('div#draggable');
    const target = page.locator('div#droppable')

    await source.dragTo(target);

    await expect(page.locator('div#droppable')).toHaveText('Dropped!')

    await page.reload();

    await source.hover()
    await page.mouse.down()
    await target.hover()
    await page.mouse.up();

    await expect(page.locator('div#droppable')).toHaveText('Dropped!')

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByText('Download Files', {exact:true}).scrollIntoViewIfNeeded();
    await page.getByText('Download Files', {exact:true}).click();

    await expect(page.getByText('Download a Text or PDF File')).toBeVisible();
})

//4. keyboard actions
test('keyboard actions', async ({page})=>{
    await page.goto('https://demoqa.com/text-box')

    await page.getByPlaceholder('Full Name').fill('test usr')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('e')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('s')

    await expect(page.getByPlaceholder('Full Name')).toHaveValue('test users')

    await page.keyboard.press('Tab')
    await page.getByPlaceholder('name@example.com').fill('abc@gmail.con')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('m')
    await expect(page.getByPlaceholder('name@example.com')).toHaveValue('abc@gmail.com')

    await page.getByPlaceholder('Current Address').fill('Delhi')
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Control+V')

    await expect(page.locator('#permanentAddress')).toHaveValue('Delhi');
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Delete')

    await page.keyboard.down('Shift')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('KeyB')
    await page.keyboard.up('Shift')
    await expect(page.locator('#permanentAddress')).toHaveValue('AB');
})

//5. frames
test('frame handling', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html')
    await page.getByText('Iframe with in an Iframe').click();
    const outerFrame = page.frameLocator('#Multiple iframe')
    const innerFrame = outerFrame.frameLocator('.iframe-container iframe')
    await innerFrame.locator('div.row input').fill('innerFrame');

    await expect(innerFrame.locator('div.row input')).toHaveValue('innerFrame')
})

//6. files upload
test('files uploading', async({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    const filePath = path.join(__dirname,"../testData/QA_Interview_QA_Guide.pdf")
    await page.locator('input#filesToUpload').setInputFiles(filePath);
    await expect(page.locator('#fileList li')).toHaveText('QA_Interview_QA_Guide.pdf');
    await page.locator('input#filesToUpload').setInputFiles([]);
    await expect(page.locator('#fileList li')).toHaveText('No Files Selected');
})

//7. Dropdowns
test('dropdowns', async ({page})=>{
    await page.goto('https://practice.expandtesting.com/dropdown')
    await page.locator('select#country').selectOption({value:'DZ'})
    await expect(page.locator('select#country')).toHaveValue('DZ');

    await page.locator('select#country').selectOption({label:'Georgia'})
    await expect(page.locator('select#country')).toHaveValue('GE');

    await page.locator('select#country').selectOption({index:1})
    await expect(page.locator('select#country')).toHaveValue('AF');
})

//8. Downloads
test('downloads handling', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator('#generateTxt').click();

    const downloadResult = page.waitForEvent('download');
    await page.locator('#txtDownloadLink').click();
    const download  = await downloadResult
    const downloadDir = path.join(__dirname,'../download')
    const fileName = download.suggestedFilename();
    const filepath = path.join(downloadDir, fileName)
    await download.saveAs(filepath);
    expect(filepath).toContain(fileName);
    expect(fs.existsSync(filepath)).toBeTruthy();
    await fs.promises.unlink(filepath);
    
    expect(filepath).not.toContain(fileName);
    expect(fs.existsSync(filepath)).toBeFalsy();
})

//9.Child windows
test('child windows', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html')

    const page1 = page.waitForEvent('popup')
    await page.getByText('click',{exact:true}).first().click();
    const newPage = await page1;
    await newPage.getByText('Downloads', {exact:true}).click();
})

//10.alerts
test('alerts', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', (dialog)=>{
        dialog.accept();
    })
    await page.getByText('Simple Alert', {exact:true}).click();

    page.on('dialog', (dialog)=>{
        dialog.dismiss();
    })
    await page.getByText('Confirmation Alert', {exact:true}).click();

    
    page.on('dialog', (dialog)=>{
        dialog.accept('Jack')
    })
    await page.locator('#promptBtn').click();
    await expect(page.locator('#demo')).toContainText('Jack');
    
})