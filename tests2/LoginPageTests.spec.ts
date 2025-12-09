import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../testData/login.json';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach('Create object and launch URL', async({page})=>{
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.launchURL(loginData.url);
})

test('login with valid creds', async()=>{
    await loginPage.validLogin(loginData.userName, loginData.password);
    await expect(dashboardPage.homePageIdentifier).toBeVisible();
})

test('login with invalid creds', async()=>{
    await loginPage.invalidLogin(loginData.userName, loginData.incorrectPassword);
    await expect(loginPage.errorMessage).toContainText(loginData.erroMessage);
})