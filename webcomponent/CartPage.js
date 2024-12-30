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
        await this.driver.findElement(this.clickcart).click();
        const namacart = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
        return namacart.getText();
    }
}
 module.exports = CartPage;