import { Locator, Page } from "playwright";

export class DashboardPage{

    private testPage;
    private searchInput;
    private products;
    homePageIdentifier
    addToCartSuccessMessage;
    private viewPageProductName;
    private viewPageProductPrice;
    homePageProductPrice;

    constructor(page:Page){
        this.testPage= page;
        this.products = this.testPage.locator('div.card-body')
        this.homePageIdentifier = this.testPage.getByText('Automation Practice', {exact:true})
        this.addToCartSuccessMessage = this.testPage.locator('#toast-container');
        this.viewPageProductName = this.testPage.locator('div.rtl-text h2');
        this.viewPageProductPrice = this.testPage.locator('div.rtl-text h3');
    }

    async searchAndAddProductToCart(productName){

    await this.products.last().waitFor();

    const countOfProducts =await this.products.count();

    for(let i=0; i<countOfProducts; i++){
        const productText = await this.products.nth(i).locator('h5').textContent()

        if(productText === productName){
            await this.products.nth(i).locator('button').last().click();
            break;
        }
    }
    }

    async searchAndValidateProductDetails(productName){

        await this.products.last().waitFor();

    const countOfProducts =await this.products.count();

    for(let i=0; i<countOfProducts; i++){
        const productText = await this.products.nth(i).locator('h5').textContent()

        if(productText === productName){
            this.homePageProductPrice = this.products.nth(i).locator("div.text-muted").textContent();
            await this.products.nth(i).locator('button').first().click();
            break;
        }
    }
    }

}