// ----------------------------
// 脚本信息设定
let task_name = "网易云音乐签到";
let app_name = "网易云音乐";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
getDailyPoints();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function daily_sign() {
    let detect_drawer_menu_button = common.detectWidgetItem("desc", "抽屉菜单", "error", "normal");
    if (detect_drawer_menu_button) {
        detect_drawer_menu_button.click();
        let detect_points_center_button = common.detectWidgetItem("textContains", "云贝中心", "error", "normal");
        if (detect_points_center_button) {
            detect_points_center_button.parent().parent().click();
            if (common.detectSuccessInfo("textContains", "每日签到")) {
                console.log("已进入云贝中心");
                let detect_already_sign_button = common.detectWidgetItem("text", "已签到", "error", "normal");
                if (detect_already_sign_button) {
                    console.info("今日已签到，无需重复签到");
                }
                else {
                    let detect_sign_button = common.detectWidgetItem("text", "签到", "error", "normal");
                    if (detect_sign_button) {
                        detect_sign_button.parent().click();
                        console.log("签到成功");
                    }
                    else {
                        console.error("未能找到签到按钮");
                    }
                }
            }
            else {
                console.error("未能进入云贝中心");
            }
        }
    }
}
