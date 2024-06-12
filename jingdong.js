// ----------------------------
// 脚本信息设定
let task_name = "京东签到"
let app_name = "京东"
// ----------------------------
let common = require('common.js')
common.startLog(task_name)
common.runApp(app_name)
// ----------------------------
// 脚本自定义函数
getDailyBeans()
// ----------------------------
common.stopApp(app_name)
common.endLog(task_name)
home()
exit()

function getDailyBeans() {
    let detect_get_beans_button = common.detectWidgetItem("textContains", "秒杀", "error", "normal")
    if (detect_get_beans_button) {
        detect_get_beans_button.parent().click()
        console.log("已打开「秒杀」页面")
        sleep(2000)
        click(312, 451)
        sleep(1000)
        click(312, 451)
        sleep(2000)
    }
    if (common.detectSuccessInfo("textContains", "已签到")) {
        console.log("已领取「京豆」")
    }
    else {
        console.log("未领取到「京豆」")
    }
}
