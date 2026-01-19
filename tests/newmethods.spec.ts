import { test, expect } from "@playwright/test";
import path from 'path';
const url = "https://the-internet.herokuapp.com/";

test("add remove", async ({ page }) => {
  await page.goto(url);
  await page.getByText("Add/Remove Elements").click();
  await page.getByText("Add Element").click();
  await expect(page.getByText("Delete", { exact: true })).toBeVisible();
  await page.getByText("Delete", { exact: true }).click();
  await expect(page.getByText("Delete", { exact: true })).not.toBeVisible();
});

test("checkbox", async ({ page }) => {
  await page.goto(url);
  await page.getByText("Checkboxes", { exact: true }).click();
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  await page.getByRole("checkbox").first().check();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await expect(page.getByRole("checkbox").last()).toBeChecked();
  await page.getByRole("checkbox").last().uncheck();
  await expect(page.getByRole("checkbox").last()).not.toBeChecked();
});

test("context menu", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("link", { name: "Context Menu" }).click();
  let msg;
  page.on("dialog", (dialog) => {
    msg = dialog.message();
    dialog.accept();
  });

  await page.locator("div#hot-spot").click({ button: "right" });
  expect(msg).toEqual("You selected a context menu");
});

test("drag and drop", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("link", { name: "Drag and Drop" }).click();
  let src = page.locator("#column-a");
  let tgt = page.locator("#column-b");
  // await src.dragTo(tgt);
  // await page.waitForTimeout(2000)

  await src.hover();
  await page.mouse.down();
  await tgt.hover();
  await page.mouse.up();
  await expect(page.locator("#column-b")).toContainText("A");
});

test('select list', async ({page})=>{
    await page.goto(url+'dropdown')
    await page.locator('select#dropdown').selectOption({value:'1'})
    //await page.waitForTimeout(2000)
    await expect(page.locator('select#dropdown')).toHaveValue('1')
})

test('upload files', async ({page})=>{
    await page.goto(url+'upload');
    const file = path.join(__dirname,'../testData/QA_Interview_QA_Guide.pdf')
    await page.locator('input#file-upload').setInputFiles(file);
    await page.waitForTimeout(2000)
})

test('frames', async ({page})=>{
    await page.goto(url+'nested_frames')
    const framePage = page.frameLocator("frame[name='frame-bottom']");
    await expect(framePage.getByText('BOTTOM', {exact:true})).toBeVisible();
})

test('mulitple windows', async ({page})=>{
    await page.goto(url+'windows')
    const page2 = page.waitForEvent('popup')
    await page.getByText('Click Here').click();
    const newPage = await page2;
    await expect(newPage.getByRole('heading')).toContainText('New Window')
})