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
    let detect_get_beans_button = common.detectWidgetItem("textContains", "领京豆", "error", "normal")
    if (detect_get_beans_button) {
        detect_get_beans_button.parent().click()
        let detect_get_beans_button_flag = common.detectWidgetItem("text", "26003b9b12129c6e", "error", "normal")
        if (detect_get_beans_button_flag) {
            console.log("已打开「领京豆」页面")
            setScreenMetrics(1080, 2412)
            common.sml_mov(900, 100, 950, 150, 1000)
            let detect_sign_to_get_beans_button = common.detectWidgetItem("textContains", "签到领豆", "none", "normal")
            if (detect_sign_to_get_beans_button) {
                click(540, detect_sign_to_get_beans_button.bounds().top + detect_sign_to_get_beans_button.bounds().height() * 3 / 4)
            }
            let detect_get_more_beans_button = common.detectWidgetItemWithChain("android.widget.TextView", 20, 0, 1, "error", "lite")
            if (detect_get_more_beans_button) {
                console.log("已领取「京豆」")
            }
            else {
                console.log("未领取到「京豆」")
            }
        }
        else {
            console.log("未打开「领京豆」页面")
        }
    }
}
