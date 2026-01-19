import {test, expect} from '@playwright/test';
import { LoginPage2 } from '../pages/LoginPage2';
import { DashboardPage2 } from '../pages/DashboardPage2';
import products from '../testData/dpData.json';

let loginPage: LoginPage2;
let dashboardPage: DashboardPage2;

test.beforeEach('Create objects', async ({page})=>{
    loginPage = new LoginPage2(page);
    dashboardPage = new DashboardPage2(page);
})

for(let product of products){

    test(`add to cart product ${product.productName}`, async()=>{
        await loginPage.launchURL(product.url);
        await loginPage.validLogin(product.userName, product.password);
        await dashboardPage.searchAndAddProductToCart(product.productName);
        await expect(dashboardPage.addToCartSuccessMessage).toContainText(product.addToCartSuccessMessage);
    })
}

