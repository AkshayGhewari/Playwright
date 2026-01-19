import {test, expect, request} from '@playwright/test';
import path from 'path'

test.describe.configure({retries:1, timeout:40000, mode: 'serial'})

test('navigation', {tag: '@smoke'}, async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('')

    await page.locator('').selectOption({value:'xyz'})
    await page.locator('').scrollIntoViewIfNeeded()
    await page.locator('').dblclick()
    await page.keyboard.press('Tab')
    await page.keyboard.down('Shift')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.up('Shift')
})

test('uploadfiles', {tag: ['@smoke','@regression']}, async({page})=>{
    await page.goto('')
    const file = path.join(__dirname,'../testData/QA_Interview_QA_Guide.pdf')
    await page.locator('').setInputFiles(file);
})

test('alerts', async({page})=>{
    await page.goto("")
    page.on('dialog', (dialog)=>{
        dialog.accept()
    })
    await page.locator('').click()
})

test('new tab', async({page})=>{
    await page.goto('')
    const newPage = page.waitForEvent('popup')
    await page.locator('').click()
    const page2 = await newPage;
    await page2.locator('').click()
})

test('download', async({page})=>{
    await page.goto('')
    const downloadRes = page.waitForEvent('download')
    await page.locator('').click()
    const download = await downloadRes;
    const downloadDir = await path.join(__dirname,'../download')
    const fileName = download.suggestedFilename()
    const filePath = path.join(downloadDir, fileName)
    await download.saveAs(filePath)
    expect(filePath).toContain(fileName);
})

test('drag and drop', async ({page})=>{
    await page.goto('')
    const drag = page.locator('')
    const drop = page.locator('')
    await drag.dragTo(drop)

    await drag.hover()
    await page.mouse.down()
    await drop.hover()
    await page.mouse.up()
})

test('frames', async({page})=>{
    await page.goto('')
    const frame =  page.frameLocator('');
    await frame.locator('').click()
})

const url = ""
const payload = ""
test('API', async({page})=>{

    const context = await request.newContext();
    const postResponse =await  context.post(url,{
        data:payload,
        headers:{
            asas:'asa'
        }
    })

    const response = await postResponse.json();
    const token = await response.token;

        await page.addInitScript((value)=>{
            window.localStorage.setItem('token', value)
        }, token)
})

test('storageSet', async ({page})=>{
    await page.goto('')

    await page.route('*/**/ds/dg/dg', async route=>{
        const json =[
            {name: 'John', id: 1}
        ]
        await route.fulfill({json})
    })
    await page.goto('')

    await page.context().storageState({path:'testData.auth.json'})
})

test('screenshot', async ({page})=>{
    await page.goto('')
    await expect(page).toHaveScreenshot('adas.png')
    
    await expect(page.locator('')).toBeVisible({timeout:10000})

    await expect(page.locator('loader')).toBeHidden();

    page.on('pageerror', error=>{
        console.log(error.message)
    })
})

test('browsers', async ({browser})=>{
    const context = await browser.newContext({});
    const page = await context.newPage();
    
})

test('broken links (parallel)', async ({ page, request }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill("tonystark@breakpoint.com")
    await page.getByPlaceholder('enter your passsword').fill("Breakpoint!98")
    await page.locator('#login').click();

  const links = await page.$$eval('a[href]', anchors =>
    anchors.map(a => a.href)
  );

  const results = await Promise.all(
    links.map(async url => {
      try {
        const res = await request.get(url);
        return { url, status: res.status() };
      } catch {
        return { url, status: 0 };
      }
    })
  );

  const broken = results.filter(r => r.status >= 400 || r.status === 0);

  console.table(broken);

  expect(broken.length).toBe(0);
});

