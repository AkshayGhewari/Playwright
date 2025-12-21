import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/DashboardPage';
import products from '../testData/dpData.json'

let loginPage:any;
let dashboardPage: any;

test.beforeEach('Create object ,launch URL and login', async({page})=>{
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
})

for(let product of products){

test(`Add product to the cart validation for ${product.productName}`, async()=>{
    await loginPage.launchURL(product.url);
    await loginPage.validLogin(product.userName, product.password);
    await dashboardPage.searchAndAddProductToCart(product.productName);
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText(product.addToCartSuccessMessage);
})

test(`Search and validate product details for ${product.productName}`, async()=>{
    await loginPage.launchURL(product.url);
    await loginPage.validLogin(product.userName, product.password);
    await dashboardPage.searchAndValidateProductDetails(product.productName);
    await expect(dashboardPage.viewPageProductName).toHaveText(product.productName);
    await expect(dashboardPage.viewPageProductPrice).toHaveText(await dashboardPage.homePageProductPrice); 
})
}
