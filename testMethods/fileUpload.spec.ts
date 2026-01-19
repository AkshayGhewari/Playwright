import {test,expect} from '@playwright/test';
import path from 'path';

test('file upload one',async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const filePath = path.join(__dirname,"../testData/QA_Interview_QA_Guide.pdf")

    await page.locator('input#filesToUpload').setInputFiles(filePath)

    await expect(page.locator('#fileList li')).toContainText('QA_Interview_QA_Guide.pdf');

    await page.locator('input#filesToUpload').setInputFiles([])

    await expect(page.locator('#fileList li')).toContainText('No Files Selected');
})

test("files upload", async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const filePath = path.join(__dirname,"../testData/QA_Interview_QA_Guide.pdf");
    await page.locator('input#filesToUpload').setInputFiles([filePath]);
    await expect(page.locator('#fileList li')).toHaveText('QA_Interview_QA_Guide.pdf');

    await page.locator('input#filesToUpload').setInputFiles([]);
    await expect(page.locator('#fileList li')).toHaveText('No Files Selected');
})