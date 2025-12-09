import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../testData/login.json';
import {ENV} from '../utils/Env';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach('Create object and launch URL', async({page})=>{
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.launchURL(ENV.baseURL);
})

test('login with valid creds', async()=>{
    await loginPage.validLogin(ENV.email, ENV.password);
    await expect(dashboardPage.homePageIdentifier).toBeVisible();
})
