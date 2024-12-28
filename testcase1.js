const { Builder } = require('selenium-webdriver');
const LoginPage = require('./webcomponent/LoginPage');
const DashboardPage = require('./webcomponent/DashboardPage');
const CartPage = require('./webcomponent/CartPage.js');
const assert = require('assert');
const { takeScreenshot } = require('./ss');


describe('Saucedemo Test',function(){
    this.timeout(40000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    // beforeEach(async function () {
        // const loginPage = new LoginPage(driver);
        // await loginPage.navigate();
        // await loginPage.login('standard_user', 'secret_sauce');
    // });

    it('should login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.Dashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    it('masukkin barang', async function () {
        const cartPage = new CartPage(driver);
        const title = await cartPage.cart();
        assert.strictEqual(title, 'Your Cart', 'Expected Cart title to be Your Cart');
    });

    afterEach(async function () {
        await takeScreenshot(driver, `AfterTest_${this.currentTest.title}`);
    });
    

    after(async function () {
        await driver.quit();
    });
})