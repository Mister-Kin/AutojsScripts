auto.waitFor();
// ----------------------------
// 脚本信息设定
var task_name = "崩坏3签到";
var app_name = "米游社";
var waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
DailySign();
GetDailyBonus();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function DailySign() {
    var detect_discuss_area_button = text("进入讨论区").findOnce();
    if (detect_discuss_area_button) {
        detect_discuss_area_button.parent().click();
        sleep(8000);
        back();
        sleep(5000);
        log("已完成「讨论区签到」");
    }
    else {
        toastLog("未检测到「进入讨论区」按钮");
    }
}

function GetDailyBonus() {
    var detect_bonus_button = text("福利补给").findOnce();
    if (detect_bonus_button) {
        detect_bonus_button.parent().parent().click();
        sleep(5000);
        // 获取时间
        var day = new Date().getDay();
        if (day>0) {
            var day_text = "第" + day + "天";
        }
        else {
            var day_text = "第7天";
        }
        sleep(3000);
        var detect_day_button = text(day_text).findOnce();
        if (detect_day_button) {
            detect_day_button.parent().click();
            sleep(5000);
            log("已领取「" + day_text + "」的福利补给");
        }
        else {
            toastLog("未检测到「" + day_text + "」按钮");
        }
    }
    else {
        toastLog("未检测到「福利补给」按钮");
    }
}
