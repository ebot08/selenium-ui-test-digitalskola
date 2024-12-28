const { By } =require('selenium-webdriver');
const { takeScreenshot } = require('../ss');

class CartPage{
    constructor(driver){
        this.driver = driver;
        this.addtoCart = By.id('add-to-cart-sauce-labs-backpack');
        this.clickcart = By.id('shopping_cart_container');
    }

    async cart(){
        await this.driver.findElement(this.addtoCart).click();
        await takeScreenshot(this.driver, 'CartPage_Addcart');
        await this.driver.findElement(this.clickcart).click();
        const namacart = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
        return namacart.getText();
        await takeScreenshot(this.driver, 'CartPage_Addcart');
        return title.getText();
    }
}
 module.exports = CartPage;