auto.waitFor();
// ----------------------------
// 脚本信息设定
var task_name = "中国联通签到";
var app_name = "中国联通";
var waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
DailySign();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function DailySign() {
    var detect_sign_button = id("com.sinovatech.unicom.ui:id/home_qiandao_image").findOnce();
    if (detect_sign_button) {
        detect_sign_button.click();
        sleep(8000);
        var detect_sign_at_once_button = text("立即签到").findOnce();
        if (detect_sign_at_once_button) {
            detect_sign_at_once_button.parent().click();
            sleep(5000);
            log("已完成「每日签到」");
        }
        else {
            toastLog("未检测到「立即签到」按钮");
        }
    }
    else {
        toastLog("未检测到首页「签到」按钮");
    }
}
