const { Builder } = require('selenium-webdriver');
const LoginPage = require('../webcomponent/LoginPage');
const CartPage = require('../webcomponent/CartPage.js');
const assert = require('assert');
const { takeScreenshot } = require('../ss');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

describe('testcase1 [login] #regression #smoke',function(){
    this.timeout(40000);
    let driver;

    switch (browser.toLowerCase()) {
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options =new firefox.Options();
            options.addArguments('--headless');
            break;
        
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options =new edge.Options();
            // options.addArguments('--headless');
            break;

        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options =new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    // const chrome = require('selenium-webdriver/chrome');
    // options =new chrome.Options();
    // options.addArguments('--headless');

    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        // const loginPage = new LoginPage(driver);
        // await loginPage.navigate();
        // await loginPage.login('standard_user', 'secret_sauce');
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username,password);
    });

    it('checkout', async function () {
        const cartPage = new CartPage(driver);
        // const nama = await cartPage.cart();
        await cartPage.navigate();
        await cartPage.credential('Haha','Hihi','1234');
        // assert.strictEqual(nama, 'Sauce Labs Backpack', 'Expected Cart item is Sauce Labs Backpack');
    });

    afterEach(async function () {
        await takeScreenshot(driver, `AfterTest_${this.currentTest.title}`);
    });
    

    after(async function () {
        await driver.quit();
    });
})