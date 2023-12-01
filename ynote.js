// ----------------------------
// 脚本信息设定
let task_name = "有道云笔记签到";
let app_name = "有道云笔记";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
closeUpdateWindow();
closeAd();
getDailyDiskSpace();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function closeAd() {
    let detect_close_ad_button = common.detectWidgetItem("id", "com.youdao.note:id/ad_close", "none", "lite");
    if (detect_close_ad_button) {
        console.log("检测到弹出式广告");
        detect_close_ad_button.click();
        console.log("已关闭弹出式广告");
    }
}

function closeUpdateWindow() {
    let detect_update_button = common.detectWidgetItem("textContains", "发现新版本", "none", "lite");
    if (detect_update_button) {
        console.log("检测到APP升级弹窗");
        let detect_close_update_button = common.detectWidgetItem("textContains", "以后再说", "error", "normal");
        if (detect_close_update_button) {
            detect_close_update_button.click();
            console.log("已关闭APP升级弹窗");
        }
        else {
            console.error("检测到APP升级弹窗，但未检测到关闭按钮控件「以后再说」，将退出操作");
        }
    }
}

function getDailyDiskSpace() {
    let detect_mine_button = common.detectWidgetItem("text", "我的", "error", "normal");
    if (detect_mine_button) {
        detect_mine_button.parent().click();
        console.log("已领取「登录奖励空间」");
        let detect_sign_to_get_disk_space_button = common.detectWidgetItem("text", "签到得空间", "none", "normal");
        if (detect_sign_to_get_disk_space_button) {
            detect_sign_to_get_disk_space_button.click();
            sleep(2000);
            let detect_sign_to_get_disk_space_button_second = common.detectWidgetItem("text", "签到得空间", "none", "normal");
            detect_sign_to_get_disk_space_button_second.click();
            if (common.detectSuccessInfo("textContains", "签到成功")) {
                console.log("已领取「签到奖励空间」");
            }
        }
        else {
            let detect_already_sign_to_get_disk_space_button = common.detectWidgetItem("text", "已签到", "log", "noraml");
            if (detect_already_sign_to_get_disk_space_button) {
                console.info("已经领取过「签到奖励空间」，无需重复领取");
            }
            else {
                console.log("未检测到「签到得空间」按钮，领取「签到奖励空间」失败");
            }
        }
    }
}
