// ----------------------------
// 脚本信息设定
let task_name = "中国联通签到";
let app_name = "中国联通";
let waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp_nonRoot(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
dailySign();
// ----------------------------
//common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function dailySign() {
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
