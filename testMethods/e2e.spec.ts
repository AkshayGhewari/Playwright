import {test, expect} from '@playwright/test';

//login
//search product and add to cart
//proceed to cehckout
//fill mandatpory fields
//place order and capture order ID
//order history page and validate if orderId is visible
let userName = "tonystark@breakpoint.com";
let password = "Breakpoint!98";
let productName = "ZARA COAT 3";
let country = "India";

//for debugging purpose
//await page.pause()

test('cart test', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.getByPlaceholder("email@example.com").clear()
    await page.getByPlaceholder("email@example.com").fill(userName)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.locator('#login').click();

    await expect(page.getByText('Automation Practice', {exact:true})).toBeVisible();

    const products = page.locator('div.card-body');

    await products.last().waitFor();

    const countOfProducts =await products.count();

    for(let i=0; i<countOfProducts; i++){
        const productText = await products.nth(i).locator('h5').textContent()

        if(productText === productName){
            await products.nth(i).locator('button').last().click();
            break;
        }
    }

    await expect(page.locator('#toast-container')).toHaveText('Product Added To Cart');
    
    await page.getByRole('button', {name: 'Cart'}).first().click();

    await expect(page.getByText('My Cart', {exact:true})).toBeVisible();    

    const itemNumber = await page.locator('.itemNumber').textContent();

    await page.getByText('Checkout', {exact:true}).click();

    await expect(page.locator('div.user__name input').first()).toHaveValue(userName)

    await page.locator('div.user__name input').last().pressSequentially('in')

    const ddResult = page.locator('section.ta-results button')

    await ddResult.first().waitFor();

    const ddResultCount =await ddResult.count();

     for(let i=0; i<ddResultCount; i++){
       const countryName =  await ddResult.nth(i).innerText()

        if(countryName.trim() === country){
            await ddResult.nth(i).click();
            break;
        }
     }

    await page.getByText('Place Order').click();
    
    await expect(page.locator('h1.hero-primary')).toContainText(' Thankyou for the order. ')

    const orderIdRaw = await page.locator('label.ng-star-inserted').textContent();

    const orderId = orderIdRaw?.replaceAll("|","").trim();

    console.log(orderId);

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await expect(page.locator('table tbody')).toBeVisible();

     //To iterate through the table we need the total no of rows

     const rows = page.locator('table tbody tr');

     const rowsCount = await rows.count();

     for(let i=0; i<rowsCount; i++){
        const orderText = await rows.nth(i).locator('th').textContent();
        if(orderText == orderId){
            await rows.nth(i).locator('button').first().click();
            break;
        }
     }

     await expect(page.locator('div.col-text')).toHaveText(orderId);
     await expect(page.locator('div.address p').first()).toHaveText(userName)
})

test('cart test using filter', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.getByPlaceholder("email@example.com").clear()
    await page.getByPlaceholder("email@example.com").fill(userName)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.locator('#login').click();

    await expect(page.getByText('Automation Practice', {exact:true})).toBeVisible();

    const products = page.locator('div.card-body');

    await products.last().waitFor();

    await products.filter({hasText: `${productName}`}).locator('button').last().click();

    await expect(page.locator('#toast-container')).toHaveText('Product Added To Cart');
    
    await page.getByRole('button', {name: 'Cart'}).first().click();

    await expect(page.getByText('My Cart', {exact:true})).toBeVisible();    

    const itemNumber = await page.locator('.itemNumber').textContent();

    await page.getByText('Checkout', {exact:true}).click();

    await expect(page.locator('div.user__name input').first()).toHaveValue(userName)

    await page.locator('div.user__name input').last().pressSequentially('in')

    const ddResult = page.locator('section.ta-results button')

    await ddResult.first().waitFor();

    await ddResult.filter({hasText:`${country}`}).nth(1).click();

    await page.getByText('Place Order').click();
    
    await expect(page.locator('h1.hero-primary')).toContainText(' Thankyou for the order. ')

    const orderIdRaw = await page.locator('label.ng-star-inserted').textContent();

    const orderId = orderIdRaw?.replaceAll("|","").trim();

    console.log(orderId);

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await expect(page.locator('table tbody')).toBeVisible();

     const rows = page.locator('table tbody tr');

     rows.filter({hasText: `${orderId}`}).locator('button').first().click();

     await expect(page.locator('div.col-text')).toHaveText(orderId);
     await expect(page.locator('div.address p').first()).toHaveText(userName)
})

test('test again', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.getByPlaceholder('email@example.com').fill(userName);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.locator('#login').click();

    //assertion
    await expect(page.getByText('Automation Practice', {exact:true})).toBeVisible();

    const products = page.locator('div.card-body');
    await products.last().waitFor();

    await products.filter({hasText: `${productName}`}).locator('button').last().click();
    //assertion
    await expect(page.locator('#toast-container')).toContainText('Product Added To Cart');

    await page.getByRole('button', {name:'Cart'}).first().click();
    await expect(page.getByText('My Cart', {exact:true})).toBeVisible();
    await page.getByText('Checkout', {exact:true}).click();

    //assertion
    await expect(page.locator('div.user__name input').first()).toHaveValue(userName);

    await page.locator('div.user__name input').last().pressSequentially("in");
    const countryList  = page.locator('section.ta-results button');
    await countryList.last().waitFor()

    await countryList.filter({hasText:`${country}`}).last().click();

    await page.getByText('Place Order ', {exact:true}).click();

    //assertion
    await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ');

    const orderIdRaw = await page.locator('label.ng-star-inserted').textContent();
    const orderId = orderIdRaw?.replaceAll("|","").trim();
    await page.locator("button[routerLink='/dashboard/myorders']").click();

    //assertion
    await expect(page.getByText('Your Orders')).toBeVisible();

    const rows = page.locator('table tbody tr');

    await rows.filter({hasText:`${orderId}`}).locator('button').first().click();

    //assertion
    await expect(page.locator('div.col-text')).toHaveText(orderId);
    await expect(page.locator('div.address p').first()).toHaveText(userName);
})