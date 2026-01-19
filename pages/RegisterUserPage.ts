import { Locator, Page } from "playwright";

export class RegisterUserPage{
    private page;
    registerUserPageIdentifier:Locator;

    constructor(page:Page){
        this.page= page;
        this.registerUserPageIdentifier = this.page.locator('h1.login-title');
    }
}