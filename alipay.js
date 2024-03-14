// ----------------------------
// 脚本信息设定
let task_name = "支付宝签到";
let app_name = "支付宝";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
getDailyPoints();
common.openMainActivity(app_name);
getDailyGoldBill();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyPoints() {
    let detect_mine_button = common.detectWidgetItem("text", "我的", "error", "normal");
    if (detect_mine_button) {
        // 支付宝这个控件布局层次经常变动，故强制点击两次
        detect_mine_button.parent().parent().click();
        sleep(1000);
        detect_mine_button.parent().click();
        let detect_mine_page = common.detectWidgetItem("id", "com.alipay.android.phone.wealth.home:id/avatar", "none", "normal");
        if (detect_mine_page) {
            console.log("成功切换到「我的」页面");
            // 点击“支付宝会员”按钮（Autojs无法分析控件详情，故采用坐标点击）
            // TODO，解决click的问题，目前点击无效
            click(850, 512);
            let detect_get_all_button = common.detectWidgetItem("text", "全部领取", "log", "lite");
            if (detect_get_all_button) {
                detect_get_all_button.click();
                // 这个控件一直存在，无法检测是否真的有其他积分。当无其他积分时，APP本身会有气泡提示「网络异常」。
                console.log("已领取「其他」积分");
            }
            let detect_daily_sign_button = common.detectWidgetItem("textContains", "今日签到", "none", "normal");
            if (detect_daily_sign_button) {
                detect_daily_sign_button.parent().click();
                console.log("已领取「今日签到」积分");
            }
            else {
                console.info("未检测到「今日签到」按钮，已经领取过「今日签到」积分");
            }
        }
        else {
            console.error("未成功切换到「我的」页面");
        }
    }
}

function getDailyGoldBill() {
    let detect_mine_button = common.detectWidgetItem("text", "理财", "error", "normal");
    if (detect_mine_button) {
        detect_mine_button.parent().parent().click();
        sleep(1000);
        detect_mine_button.parent().click();
        let detect_weekly_profit_button = common.detectWidgetItem("id", "com.alipay.android.widget.fortunehome:id/weekly_profit_container", "none", "normal");
        if (detect_weekly_profit_button) {
            detect_weekly_profit_button.click();
            sleep(5000);
            click(540, 972);
            click(540, 972);
            let detect_already_sign_date_info = common.detectWidgetItem("textContains", "成功领取黄金票", "error", "normal");
            if (detect_already_sign_date_info) {
                console.log("已领取「黄金票」");
            }
        }
        else {
            console.error("未检测到「每周收益」按钮");
        }
    }
}
