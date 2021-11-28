// ----------------------------
// 脚本信息设定
let task_name = "淘宝签到";
let app_name = "淘宝";
let waiting_time = 30; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
getDailyGoldCoin();
bonusSign();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyGoldCoin() {
    let detect_get_gold_coin_button = desc("领淘金币").findOnce();
    if (detect_get_gold_coin_button) {
        detect_get_gold_coin_button.click();
        sleep(10000);
        let detect_sign_button = textContains("今日签到").findOnce();
        if (detect_sign_button) {
            click(540, 660);
            console.log("已领取「淘金币」");
        }
        else {
            console.log("今日的「淘金币」已领取过");
        }
        sleep(5000);
        back();
        sleep(5000);
    }
    else {
        console.error("未检测到「领淘金币」按钮");
    }
}

function bonusSign() {
    let detect_sign_button = desc("签到").findOnce();
    if (detect_sign_button) {
        click(detect_sign_button.bounds().centerX(), detect_sign_button.bounds().centerY());
        sleep(8000);
        console.log("已领取「签到红包」");
    }
    else {
        console.error("未检测到「签到」按钮");
    }
}
