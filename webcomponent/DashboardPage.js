const { By } = require('selenium-webdriver');
const { takeScreenshot } = require('../ss');

class DashboardPage{
    constructor(driver){
        this.driver = driver;
    }

    async Dashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
        await takeScreenshot(this.driver, 'DashBoard_View');
        return title.getText();
    }
}
 module.exports = DashboardPage;