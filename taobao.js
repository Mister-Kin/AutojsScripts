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
        detect_get_gold_coin_button.click();
        let detect_get_gold_coin_page_state = common.detectWidgetItem("textContains", "已连签", "none", "normal");
        if (detect_get_gold_coin_page_state) {
            console.log("已进入领淘金币页面");
            let detect_sign_button = common.detectWidgetItem("textContains", "赚金币", "error", "normal");
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
        let detect_sign_immediately_button = common.detectWidgetItem("text", "O1CN01WMxEPd1DyZX55YeeW_!!6000000000285-54-tps-210-200", "error", "normal");
        if (detect_sign_immediately_button) {
            detect_sign_immediately_button.parent().click();
            let detect_sign_state = common.detectWidgetItem("text", "今天", "error", "normal");
            if (detect_sign_state.parent().childCount() != 3) {
                console.log("已领取「签到领现金」元宝");
            }
            else {
                console.log("未检测到操作成功的控件信息，请之后尝试重新运行脚本");
            }
        }
    }
}
