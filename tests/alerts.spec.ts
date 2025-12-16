//Alerts

//1. Alert - single button
//2. confirm alert - 2 buttons
//3. prompt alert - buttons and text input box

//Steps

//1. Launch the YRL
//2. We have to 'dialog' event to appear on the page and write logic to handle the scenario
//3. Identify and click on the element/ button responsible for generation of 'dialog' element

import {test, expect} from '@playwright/test'

test('Alert handling', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    //accept(text?): Ok
    //dismiss(): cancel
    //message(): gets text value in alert
    //type(): checks the type of alert: alert, confirm, prompt
    //defaultValue(): will only work for prompt alert if it has a defaeult value inside it


    page.on('dialog', (dialog)=>{
        console.log(dialog.message())
        expect(dialog.message()).toContain('I am an alert box!');
        dialog.accept();
    })

    await page.getByText('Simple Alert', {exact:true}).click();
})

test('confirm alert handling', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    page.on('dialog', (dialog)=>{
        expect(dialog.message()).toContain('Press a button!');
        dialog.dismiss();
    })
    
    await page.getByText('Confirmation Alert', {exact:true}).click();

    await expect(page.locator('#demo')).toContainText('You pressed Cancel!');
})

test('prompt alert', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const txt = 'Jack'
    page.on('dialog', (dialog)=>{   
        console.log(dialog.type())
        console.log(dialog.defaultValue())
        dialog.accept(txt)
    })

    await page.locator('#promptBtn').click();
    await expect(page.locator('#demo')).toContainText(`Hello ${txt}!`);
})


test('alerts again', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog',(dialog)=>{
        expect(dialog.message()).toContain('I am an alert box!');
        dialog.accept();
    })
    await page.getByRole('button', {name:'Simple Alert'}).click();

    page.on('dialog', (dialog)=>{
        dialog.dismiss();
    })
    await page.getByRole('button', {name:'Confirmation Alert'}).click();
    await expect(page.locator('p#demo')).toContainText('You pressed Cancel!')

    const txt = "Jack"
    page.on('dialog',(dialog)=>{
        dialog.accept(txt);
    })
    await page.getByRole('button', {name:'Prompt Alert'}).click();
    await expect(page.locator('p#demo')).toContainText('Jack')
    
})