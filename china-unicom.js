// ----------------------------
// 脚本信息设定
let task_name = "中国联通签到"
let app_name = "中国联通"
// ----------------------------
let common = require('common.js')
common.startLog(task_name)
common.runApp(app_name)
// ----------------------------
// 脚本自定义函数
dailySign()
// ----------------------------
common.stopApp(app_name)
common.endLog(task_name)
home()
exit()

function dailySign() {
    let detect_my_button = common.detectWidgetItem("id", "com.sinovatech.unicom.ui:id/main_tab_user_layout", "error", "normal")
    if (detect_my_button) {
        detect_my_button.click()
        let detect_in_my_page = common.detectWidgetItem("text", "我的套餐", "error", "normal")
        if (detect_in_my_page) {
            console.log("已进入「我的」页面")
            let detect_sign_button = common.detectWidgetItem("id", "com.sinovatech.unicom.ui:id/user_login_qiandao", "error", "normal")
            if(detect_sign_button){
                detect_sign_button.click()
                if (common.detectSuccessInfo("textContains", "话费红包")) {
                    console.log("已完成「每日签到」")
                }
            }
        }
    }
    else {
        console.error("未检测到「我的」按钮")
    }
}
