import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/DashboardPage';

let url = "https://rahulshettyacademy.com/client/#/auth/login"
let userName = "tonystark@breakpoint.com";
let password = "Breakpoint!98";
let productName = "ZARA COAT 3";
let addToCartSuccessMessage ='Product Added To Cart'
let loginPage:any;
let dashboardPage: any;


test.beforeEach('Create object ,launch URL and login', async({page})=>{
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.launchURL(url);
    await loginPage.validLogin(userName, password);
})

test('Add product to the cart validation', async()=>{
    await dashboardPage.searchAndAddProductToCart(productName);
    await expect(dashboardPage.addToCartSuccessMessage).toHaveText(addToCartSuccessMessage);
})

test('Search and validate product details', async()=>{
    await dashboardPage.searchAndValidateProductDetails(productName);
    await expect(dashboardPage.viewPageProductName).toHaveText(productName);
    await expect(dashboardPage.viewPageProductPrice).toHaveText(await dashboardPage.homePageProductPrice); 
})