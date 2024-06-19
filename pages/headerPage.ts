import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  private readonly page: Page;
  private readonly sectionTitle: Locator;
  private readonly loggedUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.loggedUser = page.locator('.oxd-userdropdown').locator('.oxd-userdropdown-name');
  }

  public getSectionTitle(): Locator {
    return this.sectionTitle;
  }

  public getLoggedUser(): Locator {
    return this.loggedUser;
  }
}
