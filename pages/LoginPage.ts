import { Locator, Page } from "playwright";

export class LoginPage{
    private page;
    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private forgotPasswordLink: Locator
    private registerHereLink: Locator
    errorMessage: Locator
    emailRequiredError: Locator
    incorrectEmailFormatError: Locator
    passwordRequiredError: Locator

constructor(page:Page){
    this.page = page
    this.usernameInput = this.page.getByPlaceholder('email@example.com')
    this.passwordInput = this.page.getByPlaceholder('enter your passsword')
    this.loginButton = this.page.locator('#login')
    this.forgotPasswordLink = this.page.getByText('Forgot password?')
    this.registerHereLink = this.page.getByText('Register here')
    this.errorMessage = this.page.locator('#toast-container')
    this.emailRequiredError = this.page.getByText('*Email is required')
    this.passwordRequiredError = this.page.getByText('*Password is required')
    this.incorrectEmailFormatError = this.page.getByText('*Enter Valid Email')
}

async launchURL(url:string){
    await this.page.goto(url);
}

async login(username:string, password:string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async navigateToForgotPasswordPage(){
    await this.forgotPasswordLink.click();
}

async navigateToRegisterUser(){
    await this.registerHereLink.click();
}

}



