import { test, expect, request } from "@playwright/test";
import path from "path";
import fs from "fs";

//1. browser context
test("browser context", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await expect(page).toHaveTitle("Let's Shop");
});

//2. radio button and checkbox2
test("radio button and checkbox", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page.locator("#male")).not.toBeChecked();
  await page.locator("#male").check();
  await expect(page.locator("#male")).toBeChecked();

  await expect(page.locator("#sunday")).not.toBeChecked();
  await page.locator("#sunday").check();
  await expect(page.locator("#sunday")).toBeChecked();
  await page.locator("#sunday").uncheck();
  await expect(page.locator("#sunday")).not.toBeChecked();
});

//3. mouse operations
test("mouse operations", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByText("Copy Text", { exact: true }).dblclick();
  await expect(page.locator("#field2")).toHaveValue("Hello World!");

  await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
  await page
    .getByText("right click me", { exact: true })
    .click({ button: "right" });
  await expect(page.getByText("Paste", { exact: true })).toBeVisible();

  await page.goto("https://www.spicejet.com/");
  await page.getByText("Add-ons", { exact: true }).hover();
  await expect(
    page.getByText("Zero Cancellation - International")
  ).toBeVisible();

  await page.goto("https://testautomationpractice.blogspot.com/");
  const draggable = page.locator("#draggable");
  const droppable = page.locator("#droppable");
  await draggable.dragTo(droppable);
  await expect(droppable).toHaveText("Dropped!");

  await page.reload();

  await draggable.hover();
  await page.mouse.down();
  await droppable.hover();
  await page.mouse.up();
  await expect(droppable).toHaveText("Dropped!");

  await page.goto("https://testautomationpractice.blogspot.com/");
  await page
    .getByText("Download Files", { exact: true })
    .scrollIntoViewIfNeeded();
  await page.getByText("Download Files", { exact: true }).click();
  await expect(page.getByText("Download a Text or PDF File")).toBeVisible();
});

test("keyboard actions", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
  await page.getByPlaceholder("Full Name").fill("test usr");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("e");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("s");
  await expect(page.getByPlaceholder("Full Name")).toHaveValue("test users");

  await page.keyboard.press("Tab");
  await page.getByPlaceholder("name@example.com").fill("abc@xyz.con");
  await page.keyboard.press("Backspace");
  await page.keyboard.press("m");
  await expect(page.getByPlaceholder("name@example.com")).toHaveValue(
    "abc@xyz.com"
  );

  await page.getByPlaceholder("Current Address").fill("Delhi");
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+C");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Control+V");
  await expect(page.locator("#permanentAddress")).toHaveValue("Delhi");

  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await page.keyboard.down("Shift");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyB");
  await page.keyboard.up("Shift");
  await expect(page.locator("#permanentAddress")).toHaveValue("AB");
});

//5. frames
test("frames handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html");
  await page.getByText("Iframe with in an Iframe").click();
  const outerFrame = page.frameLocator("#Multiple iframe");
  const innerFrame = outerFrame.frameLocator(".iframe-container iframe");

  await innerFrame.locator("div.row input").fill("frame text");
  await expect(innerFrame.locator("div.row input")).toHaveValue("frame text");
});

//6. files upload
test("files upload", async ({ page }) => {
  await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
  const filePath = path.join(
    __dirname,
    "../testData/QA_Interview_QA_Guide.pdf"
  );
  await page.locator("#filesToUpload").setInputFiles(filePath);
  await expect(page.locator("#fileList")).toHaveText(
    "QA_Interview_QA_Guide.pdf"
  );
  await page.locator("#filesToUpload").setInputFiles([]);
  await expect(page.locator("#fileList")).toHaveText("No Files Selected");
});

//7. dropdown handling
test("dropdown handling", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dropdown");
  await page.locator("select#country").selectOption({ value: "EG" });
  await expect(page.locator("select#country")).toHaveValue("EG");

  await page.locator("select#country").selectOption({ label: "Georgia" });
  await expect(page.locator("select#country")).toHaveValue("GE");
});

//8. downloads
test("downloads", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/download-files_25.html"
  );
  await page.locator("#generateTxt").click();

  const downloadResult = page.waitForEvent("download");
  await page.locator("#txtDownloadLink").click();
  const download = await downloadResult;
  const downloadDir = path.join(__dirname, "../download");
  const fileName = download.suggestedFilename();
  const filepath = path.join(downloadDir, fileName);
  await download.saveAs(fileName);
  expect(filepath).toContain(fileName);
  expect(fs.existsSync(filepath)).toBeTruthy();

  expect(filepath).not.toContain(fileName);
  expect(fs.existsSync(filepath)).toBeFalsy();
});

//9.child windows
test("child windows handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  const page2 = page.waitForEvent("popup");
  await page.getByText("click", { exact: true }).first().click();
  const newPage = await page2;
  await expect(newPage.getByText("Downloads", { exact: true })).toBeVisible();
});

//10.alerts handling
test("alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on("dialog", (dialog) => {
    dialog.accept();
  });
  await page.getByText("Simple Alert").click();

  page.on("dialog", (dialog) => {
    dialog.dismiss();
  });
  await page.getByText("Confirmation Alert").click();
  await expect(page.locator("p#demo")).toContainText("You pressed Cancel!");

  const txt = "jjjjjjjjjjjj";
  page.on("dialog", (dialog) => {
    dialog.accept(txt);
  });
  await page.getByText("Prompt Alert").click();
  await expect(page.locator("p#demo")).toContainText(txt);
});

// 11. API testing
const url = "https://rahulshettyacademy.com/api/ecom/auth/login";
const body = {
  userEmail: "tonystark@breakpoint.com",
  userPassword: "Breakpoint!98",
};

test("login via API", async ({ page }) => {
  const apiContext = await request.newContext();
  const postResponse = await apiContext.post(url, {
    data: body
  },
);
  expect(postResponse.status()).toEqual(200);

  const responseData = await postResponse.json();

  expect(await responseData.message).toContain("Successful");

  const token = await responseData.token;

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.waitForTimeout(5000);
});

// 12. Static Calendar handling
test("Calendar handling", async ({ page }) => {
  await page.goto("https://www.hyrtutorials.com/p/calendar-practice.html");
  await page.locator(".ui-datepicker-trigger").click();

  const day = "28";
  const month = "July";
  const year = "2027";

  const monthPicker = page.locator(".ui-datepicker-month");
  const yearPicker = page.locator(".ui-datepicker-year");

  while (
    (await monthPicker.textContent()) != month ||
    (await yearPicker.textContent()) != year
  ) {
    await page.getByText("Next").first().click();
  }
  await page.getByText(day, { exact: true }).click();
  await expect(page.locator("input#sixth_date_picker")).toHaveValue(
    "07/28/2027"
  );
});

// 13.dynamic calenar handling
test("Dynamic calendar handling", async ({ page }) => {
  await page.goto("https://www.hyrtutorials.com/p/calendar-practice.html");
  await page.locator(".ui-datepicker-trigger").click();

  const day = 28;
  const month = "July";
  const year = 2024;

  const monthPicker = page.locator(".ui-datepicker-month");
  const yearPicker = page.locator(".ui-datepicker-year");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getMonthIndex(month) {
    return months.indexOf(month);
  }

  while (true) {
    const currentMonth = await monthPicker.textContent();
    const currentYear = Number(await yearPicker.textContent());

    if (currentMonth == month && currentYear == year) {
      break;
    }

    const currentMonthNumber = getMonthIndex(currentMonth);
    const targetMonthNumber = getMonthIndex(month);

    if (
      currentYear > year ||
      (currentYear == year && currentMonthNumber > targetMonthNumber)
    ) {
      await page.getByText("Prev").last().click();
    } else {
      await page.getByText("Next").click();
    }
  }
  await page.getByText(day.toString(), { exact: true }).last().click();

  const expectedMonthNumber = (getMonthIndex(month) + 1)
    .toString()
    .padStart(2, "0");
  const expectedDayNumber = day.toString().padStart(2, "0");

  const expectedDate = `${expectedMonthNumber}/${expectedDayNumber}/${year}`;

  await expect(page.locator("#sixth_date_picker")).toHaveValue(expectedDate);
});

test("e2e", async ({ page }) => {
  const email = "tonystark@breakpoint.com";
  const password = "Breakpoint!98";
  const productName = "ZARA COAT 3";
  const country = "Afghanistan";

  //login
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.locator("#login").click();
  await expect(page.getByText("Automation Practice")).toBeVisible();

  //add product to cart
  const productsList = page.locator("div.card-body");
  await productsList.last().waitFor();
  await productsList
    .filter({ hasText: `${productName}` })
    .locator("button")
    .last()
    .click();
  await expect(page.locator("#toast-container")).toHaveText(
    "Product Added To Cart"
  );

  await page.locator("button[routerlink='/dashboard/cart']").click();
  await expect(page.getByText("My Cart", { exact: true })).toBeVisible();

  const productsInCart = page.locator("div.infoWrap");
  await expect(
    productsInCart.filter({ hasText: `${productName}` }).locator("h3")
  ).toContainText(productName);

  await page.getByText("Checkout", { exact: true }).click();
  await expect(page.locator("div.user__name  label")).toHaveText(email);
  await page.getByPlaceholder("Select Country").pressSequentially(country);

  const countryList = page.locator("section.ta-results button");
  await countryList.last().waitFor();
  await countryList
    .filter({ hasText: `${country}` })
    .last()
    .click();
  await page.getByText("Place Order ", { exact: true }).click();

  await expect(page.locator(".hero-primary")).toContainText(
    "Thankyou for the order."
  );
  const rawOrderId = await page.locator("label.ng-star-inserted").textContent();
  const orderId = rawOrderId?.replaceAll("|", "").trim();
  await page.locator("button[routerlink='/dashboard/myorders']").click();

  const rowsCount = page.locator("Table tbody tr");
  await rowsCount
    .filter({ hasText: `${productName}` })
    .locator("button")
    .first()
    .click();
  await expect(page.locator("div.col-text")).toContainText(orderId);
});
