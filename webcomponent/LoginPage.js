const { By } =require('selenium-webdriver');
const { takeScreenshot } = require('../ss');

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.usernameinput = By.id("user-name");
        this.passwordinput = By.css('input[placeholder="Password"]');
        this.loginButton = By.xpath("//input[@id='login-button']");
    }
    async navigate(){
        await this.driver.get("https://www.saucedemo.com/");
    }
    
    async login(usernameinput,password){
        await this.driver.findElement(this.usernameinput).sendKeys(usernameinput);
        await this.driver.findElement(this.passwordinput).sendKeys(password);
        await takeScreenshot(this.driver, 'LoginPage_LoginAttempt');
        await this.driver.findElement(this.loginButton).click();
    }

}
 module.exports = LoginPage;

