const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function saucetest(){
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        
        await driver.get("https://www.saucedemo.com/");

//---------------------------input username dan password-------------------------  
        let inputUsername = await driver.findElement(By.id('user-name'));
        await inputUsername.sendKeys('standard_user');
        let inputPassword = await driver.findElement(By.id('password'));
        await inputPassword.sendKeys('secret_sauce');

        let tombolLogin = await driver.findElement(By.id('login-button'));
        await tombolLogin.click();

//----------------------------------validate login--------------------------------
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');

        let menuButton = await driver.findElement(By.id('shopping_cart_container'));
        assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu button is not visible');

//---------------------------------keranjang_belanja------------------------------  
        let masukkinkeranjang = await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
        await masukkinkeranjang.click();
        let masukkinkeranjang2 = await driver.findElement(By.id('add-to-cart-sauce-labs-onesie'));
        await masukkinkeranjang2.click();
        let masukkinkeranjang3 = await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'));
        await masukkinkeranjang3.click();
        let keranjang = await driver.findElement(By.id('shopping_cart_container'));
        await keranjang.click();
        let remove = await driver.findElement(By.id('remove-sauce-labs-backpack'));
        await remove.click();

//----------------------------------validate login--------------------------------
        let titleText_keranjang = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        assert.strictEqual(titleText_keranjang.includes('Your Cart'), true, 'Title does not include "Your Cart"');

        await driver.wait(until.elementLocated(By.id('result-stats')), 20000);

    } finally {
        await driver.quit();
    } 
}

saucetest();