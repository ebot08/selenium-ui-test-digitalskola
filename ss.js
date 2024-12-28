const fs = require('fs');

const takeScreenshot = async(driver, testTitle) => {

    const screenshotsDir ='./screenshots/';
    if(!fs.existsSync(screenshotsDir)){
        fs.mkdirSync(screenshotsDir,{ recursive: true });
    }

    const screenshot = await driver.takeScreenshot();
    const filepath = `${screenshotsDir}${testTitle.replace(/\s+/g, '_')}_${Date.now()}.jpg`;
    fs.writeFileSync(filepath, screenshot,'base64');
  
}
module.exports = { takeScreenshot };