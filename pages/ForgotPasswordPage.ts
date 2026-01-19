import {Locator, Page} from 'playwright';

export class ForgotPasswordPage{
    private page;
    forgotPasswordPageIdentifier:Locator

    constructor(page:Page){
        this.page = page;
        this.forgotPasswordPageIdentifier = this.page.getByText('Enter New Password');
    }

}
