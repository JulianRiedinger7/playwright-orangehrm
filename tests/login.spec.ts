import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages';

const credentials = {
  emptyCredentials: {
    username: '',
    password: '',
    message: 'Required',
  },
  invalidCredentials: {
    username: 'test',
    password: 'test',
    message: 'Invalid Credentials',
  },
  validCredentials: {
    username: 'Admin',
    password: 'admin123',
  },
};

test.describe('Login Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Empty credentials login', async () => {
    const emptyCredentials = credentials.emptyCredentials;

    loginPage.enterUsername(emptyCredentials.username);
    loginPage.enterPassword(emptyCredentials.password);
    loginPage.clickLoginBtn();

    expect(loginPage.isAmountOfInputErrorMessagesCorrect(2)).toBeTruthy();

    const inputErrorMessagesTexts = await loginPage.getInputErrorMessagesText();
    inputErrorMessagesTexts.forEach((message) => {
      expect(message).toEqual(emptyCredentials.message);
    });
  });
});
