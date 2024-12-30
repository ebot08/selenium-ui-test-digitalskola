const { Builder } = require('selenium-webdriver');
const LoginPage = require('../webcomponent/LoginPage');
const DashboardPage = require('../webcomponent/DashboardPage');
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

    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username,password);
    });

    it('should login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.Dashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    afterEach(async function () {
        await takeScreenshot(driver, `1 Dashboard${this.currentTest.title}`);
    });
    
    after(async function () {
        await driver.quit();
    });
})