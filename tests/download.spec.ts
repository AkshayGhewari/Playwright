import {test, expect} from '@playwright/test'
import path from 'path';
import fs from 'fs';

test('files download', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');;

    await page.locator('#generateTxt').click();

    const downloadResult = page.waitForEvent('download');

    await page.locator('#txtDownloadLink').click();

    const download = await downloadResult
    const downloadDir = path.join(__dirname, "../download")
    
    const fileName = download.suggestedFilename();                                                                                                            

    const filePath = path.join(downloadDir, fileName); 

    await download.saveAs(filePath);

    expect(filePath).toContain(fileName);
    expect(fs.existsSync(filePath)).toBeTruthy();

    await fs.promises.unlink(filePath);

    expect(filePath).not.toContain(fileName);
    expect(fs.existsSync(filePath)).toBeFalsy();


})