import { Locator, Page } from "@playwright/test";

export class HeaderTabs {
  private page;
  private ordersTab: Locator;
  private cartTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersTab = this.page.getByRole("button", { name: "   ORDERS" });
    this.cartTab = this.page.getByRole("button", { name: "   Cart" });
  }

  async navigateToOrdersPage() {
    await this.ordersTab.click();
  }

  async navigateToCartPage() {
    await this.cartTab.click();
  }
}
