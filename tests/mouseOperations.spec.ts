//click
//double click
//right click
//mouse hover
//drag and drop
//scroll up/down: auto handled by playwright - scrollIntoViewIfNeeded();
//alert: auto handled by playwright

import {test,expect} from '@playwright/test';

test('double click and right click and validate', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect(page.locator('input#field2')).not.toHaveValue("Hello World!")

    await page.getByText('Copy Text').dblclick();

    await expect(page.locator('input#field2')).toHaveValue("Hello World!")
    
})

test('double click and right click and validate2', async({page})=>{
    await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

    await page.getByText('Double-Click Me To See Alert', {exact:true}).dblclick();

    await page.getByText('right click me', {exact:true}).click({button:'right'})

    await page.getByText('Paste', {exact:true}).click()    
})

test('mouse hover', async ({page})=>{
    await page.goto('https://www.spicejet.com/')
    await page.getByText('Add-ons', {exact:true}).hover({force:true});

    await expect(page.getByText('Zero Cancellation - International', {exact:true})).toBeVisible();
})

test('drag and drop', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    const source = page.locator('div#draggable');
    const target = page.locator('div#droppable');

    await source.dragTo(target)
    await expect(target).toHaveText("Dropped!");

    await page.waitForTimeout(2000)
})

test('drag and drop using mouse', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    const source = page.locator('div#draggable');
    const target = page.locator('div#droppable');

    await source.hover()
    await page.mouse.down()
    await target.hover()
    await page.mouse.up()
    

    await page.waitForTimeout(2000)
})

test("Scrolling", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByText('Download Files', {exact:true}).scrollIntoViewIfNeeded();
    await page.getByText('Download Files', {exact:true}).click();

})


test('double click and right click and validate222', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    await expect(page.locator('input#field2')).not.toHaveValue("Hello World!")

    await page.getByText('Copy Text').dblclick();

    await expect(page.locator('input#field2')).toHaveValue("Hello World!")
    
})

test('again', async({page})=>{

    //double click
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByRole('button', {name:'Copy Text'}).dblclick();
    await expect(page.locator('input#field2')).toHaveValue('Hello World!')

    //right click
    await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
    await page.getByText('Double-Click Me To See Alert').dblclick();
    await page.getByText('right click me').click({button:'right'});

    await expect(page.getByText('Paste')).toBeVisible();

    //mouse hover

    await page.goto('https://www.spicejet.com/')
    await page.getByText('Add-ons', {exact:true}).hover({force:true});
    await expect(page.getByText('Zero Cancellation - International')).toBeVisible();

    //drag and drop
    await page.goto('https://testautomationpractice.blogspot.com/');

    const source = page.locator('div#draggable')
    const target = page.locator('div#droppable')

    await source.dragTo(target);

    await expect(target).toHaveText('Dropped!')

    await page.reload();

    //drag and drop using mouse

    await source.hover()
    await page.mouse.down()
    await target.hover()
    await page.mouse.up()
    await expect(target).toHaveText('Dropped!')

    //scroll

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.getByText('Download Files', {exact:true}).scrollIntoViewIfNeeded();
    await page.getByText('Download Files', {exact:true}).click();
})