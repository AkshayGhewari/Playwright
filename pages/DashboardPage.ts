import { Locator, Page } from "playwright";

export class DashboardPage {
  private page;
  homePageIdentifier: Locator;
  private searchField: Locator;
  private minPriceField: Locator;
  private maxPriceField: Locator;
  private resultNumber: Locator;
  private products;
  successfulToast;

  constructor(page: Page) {
    this.page = page;
    this.homePageIdentifier = this.page.getByText("Automation Practice", {exact: true});
    this.searchField = this.page.getByRole('textbox', { name: 'search' })
    this.minPriceField = this.page.getByRole('textbox', { name: 'Min Price' })
    this.maxPriceField = this.page.getByRole('textbox', { name: 'Max Price' })
    this.resultNumber = this.page.locator('div#res')
    this.products = this.page.locator("div.card-body");
    this.successfulToast = this.page.locator('#toast-container')
  }

  async filterProductBySearch(productName: string){
    await this.searchField.fill(productName);
    await this.page.keyboard.press('Enter');
  }

  async filterProductByMinMaxPrice(minimumPrice:string, maximumPrice:string){
    await this.minPriceField.fill(minimumPrice);
    await this.maxPriceField.fill(maximumPrice);
    await this.page.keyboard.press('Enter');
  }

  async getNumberOfResults(){
    let resultText = await this.resultNumber.textContent();
    if (!resultText) {
        throw new Error('Result text is empty or not found');
    }
    let resultNumber = resultText.split(" ")[1];
    return Number(resultNumber);
  }

  async getProductNames(){
    await this.products.last().waitFor();
    const countOfProducts = await this.products.count();
    const productNames = [];

    let productText;
    for(let i=0; i<countOfProducts;i++){
      productText = await this.products.nth(i).locator('h5').textContent();
      if (productText) {
            productNames.push(productText);
        }
    }
    return productNames;
  }

  async getProductPrices(){
    await this.products.last().waitFor();
    const countOfProducts = await this.products.count();
    const productPrices = [];

    let productPrice;
    let price;
    for(let i=0; i<countOfProducts;i++){
      productPrice = await this.products.nth(i).locator('.text-muted').textContent()
      if (productPrice) {
            price = Number(productPrice.split(" ")[1]);
            productPrices.push(price);
        }
    }
    return productPrices;
  }

  async addProductToCart(productName:string){
    await this.products.last().waitFor();
    await this.products.filter({hasText: `${productName}`}).locator('button').last().click();
  }
}
