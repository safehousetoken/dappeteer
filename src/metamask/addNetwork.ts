import { Page } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addNetwork = (page: Page, version?: string) => async (name: string, url: string, id: number): Promise<void> => {
  await page.bringToFront();
  const networkSwitcher = await page.waitForSelector('.network-display');
  await networkSwitcher.click();
  await page.waitForSelector('li.dropdown-menu-item');
  const networkIndex = await page.evaluate((network) => {
    const elements = document.querySelectorAll('li.dropdown-menu-item');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if ((element as HTMLLIElement).innerText.toLowerCase().includes(network.toLowerCase())) {
        return i;
      }
    }
    return elements.length - 1;
  }, 'Custom RPC');
  const networkButton = (await page.$$('li.dropdown-menu-item'))[networkIndex];
  await networkButton.click();
  const nameInput = await page.waitForSelector('input#network-name');
  await nameInput.type(url);
  const newRPCInput = await page.waitForSelector('input#rpc-url');
  await newRPCInput.type(url);
  const chainIDInput = await page.waitForSelector('input#chainId');
  await chainIDInput.type(String(id));
  const saveButton = await page.waitForSelector('button.btn-secondary');
  await saveButton.click();
  const prevButton = await page.waitForSelector('img.app-header__metafox-logo');
  await prevButton.click();
};
