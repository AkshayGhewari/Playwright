import {test, expect, request} from '@playwright/test'
import path from 'path';
import fs from 'fs';
import { waitForDebugger } from 'inspector';
import { userInfo } from 'os';

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


//11. API handling
const postURL= "https://rahulshettyacademy.com/api/ecom/auth/login"
const payload = {userEmail: "tonystark@breakpoint.com", userPassword: "Breakpoint!98"}

test('login via API', async ({page})=>{
    const apiContext = await request.newContext();
    const pageResponse = await apiContext.post(postURL,
        {
            data:payload
        }
    )

    expect(pageResponse.status()).toBe(200)

    const pageData = await pageResponse.json();

    expect(pageData.message).toContain("Login Successfully")

    let token = pageData.token;

    await page.addInitScript((value)=>{
        window.localStorage.setItem("token",value)
    },token)

    page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.waitForTimeout(5000);
})

//12. Static Calendar handling
test('Calendar handling', async({page})=>{
    await page.goto('https://www.hyrtutorials.com/p/calendar-practice.html')

    await page.locator('.ui-datepicker-trigger').click();

    const day = "5";
    const month = "June";
    const year = "2027";

    const monthPicker = page.locator('.ui-datepicker-month');
    const yearPicker = page.locator('.ui-datepicker-year');

    while((await monthPicker.textContent()!=month) || (await yearPicker.textContent()!=year)){
        await page.getByText('Next').click();
    }

    await page.getByText(day, {exact:true}).click();

    await expect(page.locator('#sixth_date_picker').first()).toHaveValue('06/05/2027')
})

//13. Dynamic Calendar handling
test('Dynamic calendar handling', async({page})=>{

    const targetDay = 15;
    const targetMonth = "July";
    const targetYear = 2023;

    await page.goto('https://www.hyrtutorials.com/p/calendar-practice.html')
    await page.locator('.ui-datepicker-trigger').click();

    const monthPicker = page.locator('.ui-datepicker-month');
    const yearPicker = page.locator('.ui-datepicker-year')

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    
    function getMonthIndex(month){
        return months.indexOf(month);
    }

    while(true){
        const currentMonth = await monthPicker.textContent();
        const currentYear = Number(await yearPicker.textContent());

        if(currentMonth==targetMonth && currentYear==targetYear){
            break;
        }

        const currentMonthNumber  = getMonthIndex(currentMonth);
        const targetMonthNumber = getMonthIndex(targetMonth);


        if(currentYear > targetYear || (currentYear == targetYear && currentMonthNumber > targetMonthNumber)){
            await page.getByText('Prev').last().click();
        }
        else{
            await page.getByText('Next').click();
        }
    }

    await page.getByText(targetDay.toString(), {exact:true}).last().click();

    const expectedMonthNumber = (getMonthIndex(targetMonth)+1).toString().padStart(2,"0");
    const expectedDayNumber = targetDay.toString().padStart(2,"0");

    const expectedDate= `${expectedMonthNumber}/${expectedDayNumber}/${targetYear}`;

    expect(page.locator('#sixth_date_picker')).toHaveValue(expectedDate);

})

test.only('e2e', async({page})=>{

    const email = "tonystark@breakpoint.com";
    const password = "Breakpoint!98";
    const productName = "ZARA COAT 3";
    const country = "Afghanistan";

    //Login
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.locator('#login').click();
    await expect(page.getByText('Automation Practice')).toBeVisible();

    //add product to cart
    const productsList = page.locator('div.card-body')
    await productsList.last().waitFor();
    await productsList.filter({hasText:`${productName}`}).locator('button').last().click();
    await expect(page.locator('#toast-container')).toContainText("Product Added To Cart")

    await page.locator("button[routerlink='/dashboard/cart']").click();
    await expect(page.getByText('My Cart',{exact:true})).toBeVisible();

    const productsInCart = page.locator('div.infoWrap')
    await expect(productsInCart.filter({hasText:`${productName}`}).locator('h3')).toContainText(productName);
    await page.getByText('Checkout', {exact:true}).click();
    await expect(page.locator('div.user__name label')).toContainText(email);
    await page.getByPlaceholder('Select Country').pressSequentially(country);
    
    const countryList = page.locator('section.ta-results button')
    await countryList.last().waitFor();

    await countryList.filter({hasText:`${country}`}).last().click();
    await page.getByText('Place Order ',{exact:true}).click();

    await expect(page.locator('h1.hero-primary')).toContainText('Thankyou for the order.');

    const rawOrderId = await page.locator('label.ng-star-inserted').textContent();
    const orderId = rawOrderId?.replaceAll("|","").trim();
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    const rowsCount  = page.locator('Table tbody tr');
    await rowsCount.filter({hasText:`${productName}`}).locator('button').first().click();

    await expect(page.locator('div.col-text')).toContainText(orderId)

})
