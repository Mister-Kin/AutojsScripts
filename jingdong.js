// ----------------------------
// 脚本信息设定
let task_name = "京东签到";
let app_name = "京东";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
getDailyBeans();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyBeans() {
    let detect_get_beans_button = common.detectWidgetItem("text", "领京豆", "error", "normal");
    if (detect_get_beans_button) {
        detect_get_beans_button.parent().click();
        let detect_sign_to_get_beans_button = common.detectWidgetItem("textContains", "签到领", "none", "normal");
        if (detect_sign_to_get_beans_button) {
            console.log("已进入领京豆页面");
            click(detect_sign_to_get_beans_button.bounds().centerX(), detect_sign_to_get_beans_button.bounds().centerY());
            if (common.detectSuccessInfo("textContains", "已签到")) {
                console.log("已领取「京豆」");
            }
        }
        else {
            let detect_already_sign_to_get_daily_beans = common.detectWidgetItem("textContains", "已连签", "info", "noraml");
            if (detect_already_sign_to_get_daily_beans) {
                console.log("已进入领京豆页面");
                console.info("已经领取过「京豆」，无需重复领取");
            }
            else {
                console.log("未检测到「签到领京豆」按钮，领取「京豆」失败");
            }
        }
    }
}
