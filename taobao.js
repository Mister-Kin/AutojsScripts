// ----------------------------
// 脚本信息设定
let task_name = "淘宝签到";
let app_name = "淘宝";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
getDailyGoldCoin();
common.openMainActivity(app_name);
bonusSign();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyGoldCoin() {
    let detect_get_gold_coin_button = common.detectWidgetItem("desc", "领淘金币", "error", "normal");
    if (detect_get_gold_coin_button) {
        click(detect_get_gold_coin_button.bounds().centerX(), detect_get_gold_coin_button.bounds().centerY());
        let detect_get_gold_coin_page_state = common.detectWidgetItem("textContains", "O1CN010MqzU21M3d67awGt3_!!6000000001379-2-tps-240-34.png_240x5000Q75s50.jpg_", "none", "normal");
        if (detect_get_gold_coin_page_state) {
            console.log("已进入领淘金币页面");
            let detect_sign_button = common.detectWidgetItem("textContains", "O1CN01ejm6cm1dU3NBwqSMd_!!6000000003738-2-tps-328-100.png_490x330Q75s50.jpg_", "error", "normal");
            if (detect_sign_button) {
                detect_sign_button.click();
                // click(540, 660);
                if (common.detectSuccessInfo("textContains", "明日签到")) {
                    console.log("已领取「淘金币」");
                }
            }
            else {
                console.log("今日的「淘金币」已领取过");
            }
        }
    }
}

function bonusSign() {
    let detect_sign_button = common.detectWidgetItem("desc", "签到", "error", "normal");
    if (detect_sign_button) {
        click(detect_sign_button.bounds().centerX(), detect_sign_button.bounds().centerY());
        let detect_sign_immediately_button = common.detectWidgetItem("textContains", "立即签到", "error", "normal");
        if (detect_sign_immediately_button) {
            detect_sign_immediately_button.click();
            let detect_close_popup_button = common.detectWidgetItem("text", "关闭", "none", "lite");
            if (detect_close_popup_button) {
                detect_close_popup_button.click();
                console.log("检测到弹窗，已关闭弹窗");
            }
            let detect_sign_state = common.detectWidgetItem("text", "今天", "error", "normal");
            if (detect_sign_state.parent().childCount() != 3) {
                console.log("已领取「签到领现金」元宝");
            }
            else {
                console.log("未检测到操作成功的控件信息，请之后尝试重新运行脚本");
            }
        }
        let detect_click_bonus = common.detectWidgetItem("text", "点击领取", "error", "normal");
        if (detect_click_bonus) {
            detect_click_bonus.parent().parent().click();
            console.log("已领取「签到领现金」元宝");
        }
        else {
            console.log("未检测到「点击领取」按钮，请之后尝试重新运行脚本");
        }
    }
}
