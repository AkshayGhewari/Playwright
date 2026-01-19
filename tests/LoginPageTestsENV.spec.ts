import { test,expect } from '@playwright/test';
import { LoginPage2 } from '../pages/LoginPage2';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../testData/login.json';
import {ENV} from '../utils/Env';

let loginPage: LoginPage2;
let dashboardPage: DashboardPage;

test.beforeEach('Create object and launch URL', async({page})=>{
    loginPage = new LoginPage2(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.launchURL(ENV.baseURL);
})

test('login with valid creds', async()=>{
    await loginPage.validLogin(ENV.email, ENV.password);
    await expect(dashboardPage.homePageIdentifier).toBeVisible();
})
