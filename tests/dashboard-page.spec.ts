import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import loginData from "../testData/login.json";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach("Create Objects and launch URL", async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  await loginPage.launchURL(loginData.url);
  await loginPage.login(loginData.userName, loginData.password);
});

test("verify search filter by passing invalid product name", async () => {
  await dashboardPage.filterProductBySearch(loginData.incorrectProductName);
  await expect
    .poll(async () => {
      return await dashboardPage.getNumberOfResults();
    })
    .toBe(0);
});

test("verify search filter by passing valid product name", async () => {
  await dashboardPage.filterProductBySearch(loginData.productName);
  await expect
    .poll(async () => {
      return await dashboardPage.getNumberOfResults();
    })
    .toBe(1);
  const productNames = await dashboardPage.getProductNames();
  expect(productNames).toContain(loginData.productName);
});

test("verify products list by entering min and max price", async () => {
  await dashboardPage.filterProductByMinMaxPrice("20000", "60000");
  await expect
    .poll(async () => {
      return await dashboardPage.getNumberOfResults();
    })
    .toBe(1);

  const productPrices = await dashboardPage.getProductPrices();

  for (const price of productPrices) {
    expect(price).toBeGreaterThanOrEqual(20000);
    expect(price).toBeLessThanOrEqual(60000);
  }
});

test('verify adding product to cart', async ()=>{
    await dashboardPage.addProductToCart(loginData.productName);
    await expect(dashboardPage.successfulToast).toContainText('Product Added To Cart');
})