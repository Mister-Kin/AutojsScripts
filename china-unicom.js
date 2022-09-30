// ----------------------------
// 脚本信息设定
let task_name = "中国联通签到";
let app_name = "中国联通";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
dailySign();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function dailySign() {
    let detect_sign_button = common.detectWidgetItem("id", "com.sinovatech.unicom.ui:id/home_qiandao_image", "none", "normal");
    if (detect_sign_button) {
        detect_sign_button.click();
        let detect_sign_state = common.detectWidgetItem("text", "今天", "none", "normal");
        if (detect_sign_state.parent().childCount() == 3) {
            console.info("已经签到过，无需重复签到");
        }
        else {
            // 这个有待修正，目前检测不到这个控件
            if (common.detectSuccessInfo("textContains", "签到")) {
                console.log("已完成「每日签到」");
            }
        }
    }
    else {
        console.error("未检测到首页「签到」按钮");
    }
}
