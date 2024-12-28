const { By } =require('selenium-webdriver');
const { takeScreenshot } = require('../ss');

class CartPage{
    constructor(driver){
        this.driver = driver;
        this.addtoCart = By.id('add-to-cart-sauce-labs-backpack');
        this.clickcart = By.id('shopping_cart_container');
    }

    async cart(usernameinput,password){
        await this.driver.findElement(this.addtoCart).click();
        await takeScreenshot(this.driver, 'CartPage_Addcart');
        await this.driver.findElement(this.clickcart).click();
        const carttitle = await this.driver.findElement(By.className('title'));
        return carttitle.getText();
        await takeScreenshot(this.driver, 'CartPage_Addcart');
        return title.getText();
    }
}
 module.exports = CartPage;