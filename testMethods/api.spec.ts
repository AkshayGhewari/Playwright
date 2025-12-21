//URL

//Request format
    //URL
    //HTTP method
    //Headers
    //Body

//Response format
    //Status code
    //Headers
    //Response body

import {test, expect, request} from '@playwright/test'

const postURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
const payload = {userEmail: "tonystark@breakpoint.com", userPassword: "Breakpoint!98"}

const orderURL = "https://rahulshettyacademy.com/api/ecom/order/create-order"
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]}


let token;
let orderId;
let productName = "ZARA COAT 3";
let country = "India";
let userName = "tonystark@breakpoint.com";
let password = "Breakpoint!98";

test.beforeAll('get token from post API call', async()=>{
    //API context: Will help us in calling diff APIs
    const apiContext = await request.newContext();
    const postResponse = await apiContext.post(postURL,
        {
            data: payload
        }
    )
    expect(postResponse.status()).toBe(200);

    const postData = await postResponse.json();
    expect(await postData.message).toContain('Login Successfully');

    token = postData.token
    console.log(token)

    const orderResponse = await apiContext.post(orderURL,
        {
            data: orderPayload,
            headers:{
                "authorization": token
            }
        })

    const orderJsonResponse = await orderResponse.json()
    orderId =  await orderJsonResponse.orders[0];
})


test('cart test using filter', async ({page})=>{

    await page.addInitScript((value)=>{
        window.localStorage.setItem("token",value);
    },token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    console.log(orderId);

    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await expect(page.locator('table tbody')).toBeVisible();
     const rows = page.locator('table tbody tr');
     rows.filter({hasText: `${orderId}`}).locator('button').first().click()
     await expect(page.locator('div.col-text')).toHaveText(orderId);
     await expect(page.locator('div.address p').first()).toHaveText(userName)
})