auto.waitFor();
// ----------------------------
// 脚本信息设定
var task_name = "有道云笔记签到";
var app_name = "有道云笔记";
var waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
GetDailyDiskSpace();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function GetDailyDiskSpace() {
    var detect_mine_button = text("我的").findOnce();
    if (detect_mine_button) {
        detect_mine_button.parent().click();
        sleep(5000);
        log("已领取「登录奖励空间」");
        var detect_sign_to_get_disk_space_button = text("签到得空间").findOnce();
        if (detect_sign_to_get_disk_space_button) {
            detect_sign_to_get_disk_space_button.click();
            sleep(5000);
            log("已领取「签到奖励空间」");
        }
        else {
            toastLog("未检测到「签到得空间」按钮");
        }
    }
    else {
        toastLog("未检测到「我的」按钮");
    }
}
