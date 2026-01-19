import {test, expect, request } from '@playwright/test'

test('login', async ()=>{

const loginURL = "https://restful-booker.herokuapp.com/auth";
const loginPayload = {"username" : "admin", "password" : "password123"}

    const apiContext = await request.newContext();
    const postResponse = await apiContext.post(loginURL,
        {
            data: loginPayload
        }
    )
    expect(postResponse.status()).toEqual(200);

    const responseBody = await postResponse.json();
    const token = await responseBody.token;
    console.log(token);
})

test('get booking details', async ()=>{
    const bookingDetailsURL = "https://restful-booker.herokuapp.com/booking/1"

    const apiContext = await request.newContext();
    const postResponse = await apiContext.get(bookingDetailsURL)
    expect(postResponse.status()).toEqual(200)

    const responseBody = await postResponse.json();

    expect(responseBody.firstname).toEqual('Sally')
    expect(responseBody.lastname).toEqual('Jones')
    expect(responseBody.totalprice).toEqual(524)
    expect(responseBody.bookingdates.checkin).toEqual("2019-03-23")
    expect(responseBody.bookingdates.checkout).toEqual("2025-03-07")
})

test('create booking', async ()=>{
    const bookingURL = "https://restful-booker.herokuapp.com/booking"
    const bookingPayload = {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"}

    const apiContext = await request.newContext();
    const pageResponse = await apiContext.post(bookingURL,
        {
            data: bookingPayload
        }
    )
    
    expect(pageResponse.status()).toEqual(200);

    const responseBody = await pageResponse.json();
    expect(responseBody.booking.firstname).toEqual('Jim')
    expect(responseBody.booking.lastname).toEqual('Brown')
    expect(responseBody.booking.totalprice).toEqual(111)
    expect(responseBody.booking.depositpaid).toEqual(true)
    expect(responseBody.booking.bookingdates.checkin).toEqual("2018-01-01")
    expect(responseBody.booking.bookingdates.checkout).toEqual("2019-01-01")
    expect(responseBody.booking.additionalneeds).toEqual('Breakfast')
})

test('delete booking', async ()=>{
    const bookingURL = "https://restful-booker.herokuapp.com/booking/"
    const bookingPayload = {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"}

    const apiContext = await request.newContext();
    const pageResponse = await apiContext.post(bookingURL,
        {
            data: bookingPayload
        }
    )
    
    expect(pageResponse.status()).toEqual(200);

    const responseBody = await pageResponse.json();
    const bookingId = await responseBody.bookingid;
    console.log(bookingId)

    const deleteRes = await apiContext.delete(bookingURL + bookingId, {
    headers: {
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
    }
});

     expect(deleteRes.status()).toEqual(201)

    const responseText = await deleteRes.text();
    expect(responseText).toContain('Created');
})
