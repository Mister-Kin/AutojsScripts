// ----------------------------
// 脚本信息设定
let task_name = "淘宝签到"
let app_name = "淘宝"
// ----------------------------
let common = require('common.js')
common.startLog(task_name)
common.runApp(app_name)
// ----------------------------
// 脚本自定义函数
getDailyGoldCoin()
common.openMainActivity(app_name)
bonusSign()
// ----------------------------
common.stopApp(app_name)
common.endLog(task_name)
home()
exit()

function getDailyGoldCoin() {
    let detect_get_gold_coin_button = common.detectWidgetItem("desc", "领淘金币", "error", "normal")
    if (detect_get_gold_coin_button) {
        click(detect_get_gold_coin_button.bounds().centerX(), detect_get_gold_coin_button.bounds().centerY())
        let detect_sign_button = common.detectWidgetItem("textContains", "点击签到", "none", "normal")
        if (detect_sign_button) {
            console.log("已进入领淘金币页面")
            sleep(2000)
            let detect_sign_button_second = common.detectWidgetItem("textContains", "点击签到", "none", "normal")
            detect_sign_button_second.parent().click()
            if (common.detectSuccessInfo("textContains", "明天可领")) {
                console.log("已领取「淘金币」")
            }
        }
        else {
            let detect_already_sign_button = common.detectWidgetItem("textContains", "明天可领", "log", "normal")
            if (detect_already_sign_button) {
                console.log("今日的「淘金币」已领取过，无需重复领取")
            }
            else {
                console.log("未检测到「签到领金币」按钮，「签到领金币」失败")
            }
        }
    }
}

function bonusSign() {
    let detect_sign_button = common.detectWidgetItem("desc", "红包签到", "error", "normal")
    if (detect_sign_button) {
        click(detect_sign_button.bounds().centerX(), detect_sign_button.bounds().centerY())
        sleep(2000)
        passVerify()
        let detect_sign_immediately_button = common.detectWidgetItem("textContains", "立即签到", "none", "normal")
        if (detect_sign_immediately_button) {
            detect_sign_immediately_button.click()
            let detect_close_popup_button = common.detectWidgetItem("text", "关闭", "none", "lite")
            if (detect_close_popup_button) {
                detect_close_popup_button.click()
                console.log("检测到弹窗，已关闭弹窗")
            }
            let detect_sign_state = common.detectWidgetItem("textContains", "今天", "error", "normal")
            if (detect_sign_state.parent().childCount() != 3) {
                console.log("已领取「签到领现金」元宝")
            }
            else {
                console.log("未检测到操作成功的控件信息，请之后尝试重新运行脚本")
            }
        }
        let detect_click_bonus = common.detectWidgetItem("text", "点击领取", "error", "normal")
        if (detect_click_bonus) {
            detect_click_bonus.parent().parent().click()
            console.log("已领取「签到领现金」元宝")
        }
        else {
            console.log("未检测到「点击领取」按钮，请之后尝试重新运行脚本")
        }
    }
}

function passVerify() {
    let detect_pass_verify_slider = common.detectWidgetItem("textContains", "向右滑动验证", "none", "lite")
    if (detect_pass_verify_slider) {
        console.log("当前检测到存在验证滑块页面")
        setScreenMetrics(1080, 2412)
        // swipe(183, 1662, 950, 1662, 1000);
        common.sml_mov(183, 1662, 950, 1662, 1000)
        console.log("已通过验证")
    }
}
