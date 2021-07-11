auto.waitFor();
// ----------------------------
// 脚本信息设定
var task_name = "京东签到";
var app_name = "京东";
var waiting_time = 28; // 启动 APP 的等待时间，单位为秒
// ----------------------------
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
GetDailyBeans();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function GetDailyBeans() {
    var detect_get_beans_button = text("领京豆").findOnce();
    if (detect_get_beans_button) {
        detect_get_beans_button.parent().click();
        sleep(8000);
        var detect_sign_to_get_beans_button = text("签到领京豆").findOnce();
        if (detect_sign_to_get_beans_button) {
            click(detect_sign_to_get_beans_button.bounds().centerX(), detect_sign_to_get_beans_button.bounds().centerY());
            sleep(5000);
            log("已领取「京豆」");
        }
        else {
            toastLog("未检测到「签到领京豆」按钮");
        }
    }
    else {
        toastLog("未检测到首页「领京豆」按钮");
    }
}
