import { test, expect } from "@playwright/test";
import loginData from "../testData/login.json";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { RegisterUserPage } from "../pages/RegisterUserPage";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let forgotPasswordPage: ForgotPasswordPage;
let registerUserPage: RegisterUserPage;

test.describe.configure({mode:'parallel', retries:2, timeout:10000})

test.beforeEach("Create Objects and launch URL", async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  forgotPasswordPage = new ForgotPasswordPage(page);
  registerUserPage = new RegisterUserPage(page);
  await loginPage.launchURL(loginData.url);
});

test.describe("Login validations", {tag:['@smoke', '@regression']}, () => {
  test("login by keeping username and password fields empty", async () => {
    await loginPage.login("", "");
    await expect(loginPage.emailRequiredError).toBeVisible();
    await expect(loginPage.passwordRequiredError).toBeVisible();
  });
  
  test("login by only entering email", {tag:'@smoke'}, async () => {
    await loginPage.login(loginData.userName, "");
    await expect(loginPage.passwordRequiredError).toBeVisible();
  });

  test("login by only entering password", async () => {
    await loginPage.login("", loginData.password);
    await expect(loginPage.emailRequiredError).toBeVisible();
  });

  test("login by entering invalid email and password", async () => {
    await loginPage.login(loginData.userName, loginData.incorrectPassword);
    await expect(loginPage.errorMessage).toContainText(loginData.errorMessage);
  });

  test("login by entering valid email and password", async () => {
    await loginPage.login(loginData.userName, loginData.password);
    await expect(dashboardPage.homePageIdentifier).toBeVisible();
  });

  test("login by entering email in incorrect format", async () => {
    await loginPage.login(
      loginData.incorrectFormatUserName,
      loginData.password
    );
    await expect(loginPage.incorrectEmailFormatError).toBeVisible();
  });
});

test.describe("Login page navigations", () => {
  test("navigate to forgot password page", async () => {
    await loginPage.navigateToForgotPasswordPage();
    await expect(forgotPasswordPage.forgotPasswordPageIdentifier).toBeVisible();
  });

  test("navigate to register user page", async () => {
    await loginPage.navigateToRegisterUser();
    await expect(registerUserPage.registerUserPageIdentifier).toBeVisible();
  });
});
