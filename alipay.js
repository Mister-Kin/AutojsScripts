// ----------------------------
// 脚本信息设定
let task_name = "支付宝签到";
let app_name = "支付宝";
let waiting_time = 30; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp_nonRoot(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
getDailyPoints();
getDailyGoldBill();
// ----------------------------
//common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyPoints() {
    let detect_mine_button = text("我的").findOnce();
    if (detect_mine_button) {
        detect_mine_button.parent().parent().click();
        sleep(1000);
        detect_mine_button.parent().click();
        sleep(5000);
        // 点击“支付宝会员”按钮
        click(850, 512);
        sleep(8000);
        let detect_get_all_button = text("全部领取").findOnce();
        if (detect_get_all_button) {
            detect_get_all_button.click();
            sleep(8000);
            // 这个控件一直存在，无法检测是否真的有其他积分。当无其他积分时，APP本身会有气泡提示「网络异常」。
            console.log("已领取「其他」积分");
        }
        else {
            console.log("未检测到「全部领取」按钮");
        }
        let detect_daily_sign_button = text("每日签到").findOnce();
        if (detect_daily_sign_button) {
            detect_daily_sign_button.parent().click();
            sleep(5000);
            console.log("已领取「每日签到」积分");
            back();
            sleep(5000);
            back();
            sleep(5000);
        }
        else {
            console.error("未检测到「每日签到」按钮");
        }
    }
    else {
        console.error("未检测到「我的」按钮");
    }
}

function getDailyGoldBill() {
    let detect_mine_button = text("理财").findOnce();
    if (detect_mine_button) {
        detect_mine_button.parent().parent().click();
        sleep(1000);
        detect_mine_button.parent().click();
        sleep(5000);
        let detect_weekly_profit_button = id("com.alipay.android.widget.fortunehome:id/weekly_profit_container").findOnce();
        if (detect_weekly_profit_button) {
            detect_weekly_profit_button.click();
            sleep(8000);
            let detect_get_daily_gold_button = text("立即领").findOnce();
            if (detect_get_daily_gold_button) {
                detect_get_daily_gold_button.click();
                sleep(5000);
                console.log("已领取「黄金票」");
            }
            else {
                console.error("未检测到「立即领」的按钮");
            }
        }
        else {
            console.error("未检测到「每周收益」按钮");
        }
    }
    else {
        console.error("未检测到「理财」按钮");
    }
}
