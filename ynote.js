// ----------------------------
// 脚本信息设定
let task_name = "有道云笔记签到";
let app_name = "有道云笔记";
let waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp_nonRoot(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
closeAd();
getDailyDiskSpace();
// ----------------------------
//common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function closeAd() {
    let detect_close_ad_button = id("com.youdao.note:id/ad_close").findOnce();
    if (detect_close_ad_button) {
        console.log("检测到弹出式广告");
        detect_close_ad_button.click();
        sleep(3000);
        console.log("已关闭弹出式广告");
    }
}

function getDailyDiskSpace() {
    let detect_mine_button = text("我的").findOnce();
    if (detect_mine_button) {
        detect_mine_button.parent().click();
        sleep(5000);
        console.log("已领取「登录奖励空间」");
        let detect_sign_to_get_disk_space_button = text("签到得空间").findOnce();
        if (detect_sign_to_get_disk_space_button) {
            detect_sign_to_get_disk_space_button.click();
            sleep(5000);
            console.log("已领取「签到奖励空间」");
        }
        else {
            console.error("未检测到「签到得空间」按钮");
        }
    }
    else {
        console.error("未检测到「我的」按钮");
    }
}
