import { test, expect, request, APIRequestContext } from "@playwright/test";

const baseURL = "https://restful-booker.herokuapp.com";
const username = "admin";
const password = "password123";
const firstname = "Jim";
const lastname = "Brown";
const totalprice = 111;
const depositpaid = true;
const checkin = "2018-01-01";
const checkout = "2019-01-01";
const additionalneeds = "Breakfast";
let apiContext: APIRequestContext;
const loginPayload = { username: username, password: password };
const bookingPayload = {
  firstname: firstname,
  lastname: lastname,
  totalprice: totalprice,
  depositpaid: depositpaid,
  bookingdates: {
    checkin: checkin,
    checkout: checkout,
  },
  additionalneeds: additionalneeds,
};
let bookingId: number;

test.describe.configure({ mode: "serial" });

test.beforeAll("api context", async () => {
  apiContext = await request.newContext();
});

test("login API", async () => {
  const pageResponse = await apiContext.post(baseURL + "/auth", {
    data: loginPayload,
  });
  expect(pageResponse.status()).toEqual(200);
});

test("create booking", async () => {
  const pageResponse = await apiContext.post(baseURL + "/booking", {
    data: bookingPayload,
  });
  expect(pageResponse.status()).toEqual(200);

  const responseBody = await pageResponse.json();
  bookingId = responseBody.bookingid;

  expect(responseBody.booking.firstname).toEqual(firstname);
  expect(responseBody.booking.lastname).toEqual(lastname);
  expect(responseBody.booking.totalprice).toEqual(totalprice);
  expect(responseBody.booking.depositpaid).toEqual(depositpaid);
  expect(responseBody.booking.bookingdates.checkin).toEqual(checkin);
  expect(responseBody.booking.bookingdates.checkout).toEqual(checkout);
  expect(responseBody.booking.additionalneeds).toEqual(additionalneeds);
  console.log(baseURL + "/booking/" + bookingId);
});

test("get booking details", async () => {
  const pageResponse = await apiContext.get(baseURL + "/booking/" + bookingId);
  expect(pageResponse.status()).toEqual(200);
  const responseBody = await pageResponse.json();

  expect(responseBody.firstname).toEqual(firstname);
  expect(responseBody.lastname).toEqual(lastname);
  expect(responseBody.totalprice).toEqual(totalprice);
  expect(responseBody.bookingdates.checkin).toEqual(checkin);
  expect(responseBody.bookingdates.checkout).toEqual(checkout);
});

test("deleteBooking", async () => {
  const pageResponse = await apiContext.delete(
    baseURL + "/booking/" + bookingId,
    {
      headers: {
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
      },
    }
  );
  const responseText = await pageResponse.text();
  expect(pageResponse.status()).toEqual(201);
  expect(responseText).toContain("Created");
});
