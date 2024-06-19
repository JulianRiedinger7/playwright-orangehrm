import { test, expect } from '@playwright/test';
import { HeaderPage, LoginPage } from '../pages';
import credentials from '../data/credentials.json';

test.describe('Login Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Empty credentials login', async ({ page }) => {
    const emptyCredentials = credentials.emptyCredentials;

    await loginPage.login(emptyCredentials.username, emptyCredentials.password);

    await expect(loginPage.getInputErrorMessages()).toHaveCount(2);
    await expect(page).toHaveURL(/login/);

    for (const inputError of await loginPage.getInputErrorMessages().all()) {
      await expect(inputError).toHaveText('Required');
    }
  });

  test('Invalid credentials login', async ({ page }) => {
    const invalidCredentials = credentials.invalidCredentials;

    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    await expect(page).toHaveURL(/login/);
    await expect(loginPage.getLoginErrorMessage()).toHaveText('Invalid credentials');
  });

  test('Valid credentials login', async ({ page }) => {
    const validCredentials = credentials.validCredentials;

    await loginPage.login(validCredentials.username, validCredentials.password);

    await expect(page).toHaveURL(/dashboard/);
    await expect(page).not.toHaveURL(/login/);

    const headerPage = new HeaderPage(page);

    await expect(headerPage.getLoggedUser()).toContainText('test user');
    await expect(headerPage.getSectionTitle()).toHaveText('Dashboard');
  });
});
