// ----------------------------
// 脚本信息设定
let task_name = "京东签到";
let app_name = "京东";
let waiting_time = 28; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
getDailyBeans();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyBeans() {
    let detect_get_beans_button = text("领京豆").findOnce();
    if (detect_get_beans_button) {
        detect_get_beans_button.parent().click();
        sleep(15000);
        let detect_sign_to_get_beans_button = text("签到领京豆").findOnce();
        if (detect_sign_to_get_beans_button) {
            click(detect_sign_to_get_beans_button.bounds().centerX(), detect_sign_to_get_beans_button.bounds().centerY());
            sleep(5000);
            console.log("已领取「京豆」");
        }
        else {
            console.error("未检测到「签到领京豆」按钮");
        }
    }
    else {
        console.error("未检测到首页「领京豆」按钮");
    }
}
