auto.waitFor();
// ----------------------------
// 脚本信息设定
let task_name = "中国联通签到";
let app_name = "中国联通";
let waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let CommonModules = require('CommonModules.js');
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
    let detect_sign_button = id("com.sinovatech.unicom.ui:id/home_qiandao_image").findOnce();
    if (detect_sign_button) {
        detect_sign_button.click();
        sleep(15000);
        console.log("已完成「每日签到」");
    }
    else {
        console.error("未检测到首页「签到」按钮");
    }
}
