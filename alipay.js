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
                sleep(5000);
                back();
                sleep(2000);
                back();
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
            let time = new Date();
            let date = time.getDate();
            let month = time.getMonth() + 1;
            let year = time.getFullYear();
            let last_day = getLastDay(year, month);
            if (date != last_day) {
                date = date + 1;
            }
            else {
                date = date - 1
            }
            let date_text = "第" + date + "天";
            // 无法直接依照控件信息查找时，只要其父控件可点击，就找其父控件下的其他控件
            let detect_get_daily_gold_button = common.detectWidgetItem("text", date_text, "error", "normal");
            if (detect_get_daily_gold_button) {
                if (detect_get_daily_gold_button.parent().parent().click()) {
                    if (common.detectSuccessInfo("textContains", "成功领取黄金票")) {
                        console.log("已领取「黄金票」");
                    }
                }
            }

        }
        else {
            console.error("未检测到「每周收益」按钮");
        }
    }
}

// 获取当月最后一天
// 实现思路：获取下个月的1号的00：00时刻，然后减去1秒(或者毫秒、分钟、小时)，再输出day即可获取当月最后一天的日期
function getLastDay(year, month) {
    return new Date(new Date(`${month < 12 ? year : ++year}-${month == 12 ? 1 : ++month} 00:00`).getTime() - 1).getDate()
}
