import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly inputErrorMessages: Locator;
  private readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.inputErrorMessages = page.locator('.oxd-input-field-error-message');
    this.loginErrorMessage = page.locator('.oxd-alert-content-text');
  }

  public async goto() {
    await this.page.goto('/');
  }

  public async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  public async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  public async clickLoginBtn() {
    await this.loginBtn.click();
  }

  public async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginBtn();
  }

  public getInputErrorMessages(): Locator {
    return this.inputErrorMessages;
  }

  public getLoginErrorMessage(): Locator {
    return this.loginErrorMessage;
  }
}
