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
    let detect_sign_button = common.detectWidgetItem("id", "com.sinovatech.unicom.ui:id/home_qiandao_image", "none", "normal")
    if (detect_sign_button) {
        detect_sign_button.click()
        if (common.detectSuccessInfo("textContains", "话费红包")) {
            console.log("已完成「每日签到」")
        }
    }
    else {
        console.error("未检测到首页「签到」按钮")
    }
}
