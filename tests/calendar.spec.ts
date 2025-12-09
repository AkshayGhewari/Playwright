import {test, expect} from '@playwright/test';

test('calnedar selection handling', async({page})=>{
    page.goto('https://www.hyrtutorials.com/p/calendar-practice.html');

    page.locator('.ui-datepicker-trigger').click();

    const targetDay ="27";
    const targetMonth = "May";
    const targetYear = "2027";

    const monthPicker = page.locator('.ui-datepicker-month');
    const yearPicker = page.locator('.ui-datepicker-year');

    while((await monthPicker.textContent()!=targetMonth) || (await yearPicker.textContent()!=targetYear)){
        await page.getByText('Next').click();
    }

    await page.getByText(targetDay,{exact:true}).click();
    await expect(page.locator("#sixth_date_picker")).toHaveValue("05/27/2027")
})

test("calendar selection dynamic", async({page})=>{
     page.goto('https://www.hyrtutorials.com/p/calendar-practice.html');

    page.locator('.ui-datepicker-trigger').click();

    const targetDay = 5;
    const targetMonth = "June";
    const targetYear = 2027;

    const monthPicker = page.locator('.ui-datepicker-month');
    const yearPicker = page.locator('.ui-datepicker-year');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"]

    function getMonthIndex(month){
        return monthNames.indexOf(month)
    }

    while(true){
        const currentMonth = await monthPicker.textContent();
        const currentYear = Number(await yearPicker.textContent());

        if(currentMonth==targetMonth && currentYear==targetYear){
            break;
        }

        const currentMonthIndex = getMonthIndex(currentMonth);
        const targetMonthIndex = getMonthIndex(targetMonth);

        if(currentYear > targetYear || (currentYear== targetYear && currentMonthIndex > targetMonthIndex)){
            await page.getByText('Prev').last().click();
        }
        else{
            await page.getByText('Next').click();
        }
    }
    await page.getByText(targetDay.toString(), {exact:true}).last().click();
    const targetMonthNumber = ((getMonthIndex(targetMonth))+1).toString().padStart(2,"0");

    const targeDayNumber = (targetDay).toString().padStart(2,"0");

    //mm/dd//yyyy

    const expectedDate = `${targetMonthNumber}/${targeDayNumber}/${targetYear}`

    await expect(page.locator("#sixth_date_picker")).toHaveValue(expectedDate)

    
})