const { By } =require('selenium-webdriver');
const { takeScreenshot } = require('../ss');

class CartPage{
    constructor(driver){
        this.driver = driver;
        this.addtoCart = By.id('add-to-cart-sauce-labs-backpack');
        this.clickcart = By.id('shopping_cart_container');
        this.checkout = By.id('checkout');
        this.first_name = By.id("first-name");
        this.last_name = By.id("last-name");
        this.zipcode = By.id("postal-code");
        this.continue = By.id('continue');
        this.finish = By.id('finish');
    }

    async navigate(){
        await this.driver.get("https://www.saucedemo.com/checkout-step-one.html");
    }

    async cart(){
        await this.driver.findElement(this.addtoCart).click();
        // await takeScreenshot(this.driver, 'CartPage_Addcart');
        await this.driver.findElement(this.clickcart).click();
        // const namacart = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
        // await takeScreenshot(this.driver, 'CartPage_Addcart');
        await this.driver.findElement(this.checkout).click();
        // await takeScreenshot(this.driver, 'checkout_items');
        // return namacart.getText();
    }

    async credential(first_name,last_name,zipcode){
        await this.driver.findElement(this.first_name).sendKeys(first_name);
        await this.driver.findElement(this.last_name).sendKeys(last_name);
        await this.driver.findElement(this.zipcode).sendKeys(zipcode);
        // await takeScreenshot(this.driver, 'input credentials');
        await this.driver.findElement(this.continue).click();
        // await takeScreenshot(this.driver, 'lanjut');
        await this.driver.findElement(this.finish).click();
        // await takeScreenshot(this.driver, 'finish');
    }
}
 module.exports = CartPage;