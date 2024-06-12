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
    sleep(5000)
    setScreenMetrics(1080, 2412)
    click(350, 380)
    sleep(3000)
    let sign_success_info = common.detectSuccessInfo("textContains", "签到成功")
    if (sign_success_info) {
        console.log("已完成「每日签到」")
    }
}
