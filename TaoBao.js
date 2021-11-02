auto.waitFor();
// ----------------------------
// 脚本信息设定
let task_name = "淘宝签到";
let app_name = "淘宝";
let waiting_time = 30; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
GetDailyGoldCoin();
BonusSign();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function GetDailyGoldCoin() {
    let detect_get_gold_coin_button = desc("领淘金币").findOnce();
    if (detect_get_gold_coin_button) {
        detect_get_gold_coin_button.click();
        sleep(15000);
        back();
        sleep(8000);
        log("已领取「淘金币」");
    }
    else {
        toastLog("未检测到「领淘金币」按钮");
    }
}

function BonusSign() {
    let detect_sign_button = desc("签到").findOnce();
    if (detect_sign_button) {
        click(detect_sign_button.bounds().centerX(), detect_sign_button.bounds().centerY());
        sleep(8000);
        log("已领取「签到红包」");
    }
    else {
        toastLog("未检测到「签到」按钮");
    }
}
