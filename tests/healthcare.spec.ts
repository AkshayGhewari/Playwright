import { test, expect } from "@playwright/test";
const username = "John Doe";
const password = "ThisIsNotAPassword";
const targetDay = "12";
const targetMonth = "July";
const targetYear = 2025;
const comment = "test comment";

test("end to end", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("h1")).toContainText("CURA Healthcare Service");

  await page.getByText("Make Appointment").click();
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator("h2")).toContainText("Make Appointment");

  await page
    .locator("#combo_facility")
    .selectOption({ value: "Seoul CURA Healthcare Center" });
  await expect(page.locator("#combo_facility")).toHaveValue(
    "Seoul CURA Healthcare Center"
  );

  await page.locator("#chk_hospotal_readmission").check();
  await expect(page.locator("#chk_hospotal_readmission")).toBeChecked();

  await page.locator("#radio_program_none").check();
  await expect(page.locator("#radio_program_none")).toBeChecked();

  await page.getByPlaceholder("Comment").fill(comment);
  await expect(page.getByPlaceholder("Comment")).toHaveValue(comment);

  await page.locator(".input-group-addon").click();

  // console.log(currentMonth);
  // console.log(currentYear);

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

  function returnMonthNumber(month: string) {
    return months.indexOf(month) + 1;
  }
  while (true) {
    const currentMonthYear = await page
      .locator("th.datepicker-switch")
      .first()
      .innerText();

    const currentMonth = currentMonthYear.split(" ")[0];
    const currentYear = Number(currentMonthYear.split(" ")[1]);
    const currentMonthNumber = returnMonthNumber(currentMonth);
    const targetMonthNumber = returnMonthNumber(targetMonth);

    if (currentMonthNumber == targetMonthNumber && currentYear == targetYear) {
      break;
    }
    if (
      currentYear > targetYear ||
      (currentYear == targetYear && currentMonthNumber > targetMonthNumber)
    ) {
      await page.locator("th.prev").first().click();
    } else {
      await page.locator("th.next").first().click();
    }
  }

  await page.getByText(targetDay, { exact: true }).click();

  const targetMonthNumber = returnMonthNumber(targetMonth).toString().padStart(2,"0");
  const targetdayhNumber = targetDay.padStart(2,"0");

  const expectedDate = `${targetdayhNumber}/${targetMonthNumber}/${targetYear}`;

  console.log(expectedDate);

  await expect(page.locator('input.form-control')).toHaveValue(expectedDate)
  
  await page.getByText('Book Appointment').click();

  await expect(page.locator('h2')).toContainText('Appointment Confirmation');
  
});
