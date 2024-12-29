const { Builder } = require('selenium-webdriver');
const LoginPage = require('../webcomponent/LoginPage');
// const DashboardPage = require('../webcomponent/DashboardPage');
// const CartPage = require('../webcomponent/CartPage.js');
const assert = require('assert');
const { takeScreenshot } = require('../ss');
require('dotenv').config();

const baseUrl = process.env.BASE_URL;

describe('testcase2 [login]',function(){
    this.timeout(40000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login('standard_', 'secret_sauce');
    });

    it('Error message apppears for invalid credentials', async function (){
        const loginPage = new LoginPage(driver);
        const pesanError = await loginPage.getErrorMessage();
        assert.strictEqual(pesanError, 'Epic sadface: Username and password do not match any user in this service','Expected error message does not match')
    });

    afterEach(async function () {
        await takeScreenshot(driver, `AfterTest_${this.currentTest.title}`);
    });
    
    after(async function () {
        await driver.quit();
    });
})