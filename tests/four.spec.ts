import { test, expect, request } from "@playwright/test";
import path from 'path';
import fs from 'fs'

test("test browser context", async ({ browser }) => {
  const newContext = await browser.newContext();
  const page = await newContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
});

test("checkbox and radiom buttons", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#male").check();
  await expect(page.locator("#male")).toBeChecked();

  await expect(page.locator("#sunday")).not.toBeChecked();
  await page.locator("#sunday").check();
  await expect(page.locator("#sunday")).toBeChecked();
  await page.locator("#sunday").uncheck();
  await expect(page.locator("#sunday")).not.toBeChecked();
});

test("mouse operations", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Copy Text", { exact: true }).dblclick();
  await expect(page.locator("input#field2")).toHaveValue("Hello World!");

  await page.goto("https://www.spicejet.com/");
  await page.getByText("Add-ons", { exact: true }).hover();
  await expect(
    page.getByText("Zero Cancellation - International")
  ).toBeVisible();

  await page.goto("https://testautomationpractice.blogspot.com/");
  const drag = page.locator("#draggable");
  const drop = page.locator("#droppable");

  await drag.dragTo(drop);
  await expect(page.locator("#droppable")).toContainText("Dropped!");

  await page.reload();

  await drag.hover();
  await page.mouse.down();
  await drop.hover();
  await page.mouse.up();
  await expect(page.locator("#droppable")).toContainText("Dropped!");

  await page.reload();

  await page
    .getByText("Download Files", { exact: true })
    .scrollIntoViewIfNeeded();
  await page.getByText("Download Files", { exact: true }).click();
  await expect(page.getByText("Download a Text or PDF File")).toBeVisible();
});

test("keyboard action", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
  await page.getByPlaceholder("Full Name").fill("test usr");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("e");
  await expect(page.getByPlaceholder("Full Name")).toHaveValue("test user");

  await page.keyboard.press("Tab");
  await page.getByPlaceholder("name@example.com").fill("abc@gmail.con");
  await page.keyboard.press("Backspace");
  await page.keyboard.press("m");
  await expect(page.getByPlaceholder("name@example.com")).toHaveValue(
    "abc@gmail.com"
  );

  await page.keyboard.press("Tab");
  await page.getByPlaceholder("Current Address").fill("Delhi");
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+C");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Control+V");
  await expect(page.locator("#permanentAddress")).toHaveValue("Delhi");
});

test("frames handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html");
  await page.getByText("Iframe with in an Iframe").click();
  const outerFrame = page.frameLocator('#Multiple iframe')
  const innerFrame = outerFrame.frameLocator('div.iframe-container iframe');

  await innerFrame.locator('div.row input').fill('iframe');
  await expect(innerFrame.locator('div.row input')).toHaveValue('iframe')
});

test('file upload', async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const file = path.join(__dirname,'../testData/QA_Interview_QA_Guide.pdf')
    await page.locator('input#filesToUpload').setInputFiles(file)
    await expect(page.locator('ul#fileList')).toContainText('QA_Interview_QA_Guide.pdf')

    await page.locator('input#filesToUpload').setInputFiles([])
    await expect(page.locator('ul#fileList')).toContainText('No Files Selected')
})

test("dropdown handling", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dropdown");
  await page.locator('select#dropdown').selectOption({value:'1'})
  await expect(page.locator('select#dropdown')).toHaveValue('1')
});

test('download', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator('button#generateTxt').click();

    const downloadResult = page.waitForEvent('download');
    await page.locator('a#txtDownloadLink').click();
    const download = await downloadResult;
    const downloadDir = path.join(__dirname,'../download');
    const fileName = download.suggestedFilename();
    const filepath = path.join(downloadDir,fileName);
    await download.saveAs(fileName);
    expect(filepath).toContain(fileName);
    expect(fs.existsSync(filepath)).toBeTruthy();
})

test('child windows', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Windows.html');
    const page2 = page.waitForEvent('popup')
    await page.getByText("click", {exact:true}).first().click();
    const newPage = await page2;
    await expect(newPage.getByText('Downloads', {exact:true})).toBeVisible();
})

test('alerts', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    // page.on('dialog', (dialog)=>{
    //     dialog.accept();
    // })
    // await page.getByText('Simple Alert').click();

    // page.on('dialog', (dialog)=>{
    //     dialog.dismiss();
    // })
    // await page.getByText('Confirmation Alert').click();
    // await expect(page.locator('p#demo')).toContainText('You pressed Cancel!');

    page.on('dialog', (dialog)=>{
        dialog.accept("AK")
    })

    await page.getByText('Prompt Alert').click();
    await expect(page.locator('p#demo')).toContainText('Hello AK! How are you today?');
})

const url = "https://rahulshettyacademy.com/api/ecom/auth/login"
const payload = {
  userEmail: "tonystark@breakpoint.com",
  userPassword: "Breakpoint!98",
};

test('login via API', async ({page})=>{
    const apiContext = await request.newContext();
    const postResponse = await apiContext.post(url,{
        data:payload
    })
    
    expect(postResponse.status()).toEqual(200);

    const responseData = await postResponse.json();

    const token = await responseData.token;

    await page.addInitScript((value)=>{
        window.localStorage.setItem('token', value)
    }, token)

      page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.waitForTimeout(5000);
})


test("test  context", async ({ context }) => {
  const page = await context.newPage();
  //const page = await newContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
});