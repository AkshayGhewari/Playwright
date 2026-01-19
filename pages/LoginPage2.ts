import {Locator, Page} from 'playwright';

export class LoginPage2{

    private testPage;
    private username: Locator
    private password
    private loginButton
    errorMessage

    constructor(page:Page){
        this.testPage=page
        this.username = this.testPage.getByPlaceholder('email@example.com')
        this.password = this.testPage.getByPlaceholder('enter your passsword')
        this.loginButton = this.testPage.locator('#login');
        this.errorMessage = this.testPage.locator('#toast-container');
    }

    async launchURL(url){
        await this.testPage.goto(url);
    }

    async validLogin(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async invalidLogin(username, incorrectPassword){
        await this.username.fill(username);
        await this.password.fill(incorrectPassword);
        await this.loginButton.click();
    }
}