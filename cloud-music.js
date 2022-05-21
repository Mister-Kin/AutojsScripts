// ----------------------------
// 脚本信息设定
let task_name = "网易云音乐签到";
let app_name = "网易云音乐";
let waiting_time = 25; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp_nonRoot(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
getDailyPoints();
// ----------------------------
//common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyPoints() {
    let detect_drawer_menu_button = desc("抽屉菜单").findOnce();
    if (detect_drawer_menu_button) {
        detect_drawer_menu_button.click();
        sleep(5000);
        let detect_points_centre_button = text("云贝中心").findOnce();
        if (detect_points_centre_button) {
            detect_points_centre_button.parent().parent().click();
            sleep(8000);
            console.log("已领取「签到的云贝」");
        }
        else {
            console.error("未检测到「云贝中心」按钮");
        }
        sleep(5000); // 版本更新越来越卡，增加延时
        // 目前的版本中，text 的末尾含有空格，为避免这种状况，将 text 选择器换为 textContains 选择器
        let detect_points_from_listening_music = textContains("听音乐30分钟").find();
        if (detect_points_from_listening_music.nonEmpty()) {
            detect_points_from_listening_music.forEach(function (element) {
                recursiveClick(element);
                sleep(8000);
            }
            );
            console.log("已领取「听音乐的云贝」");
        }
        else {
            console.log("未检测到「听音乐30分钟」按钮");
        }
    }
    else {
        console.error("未检测到「抽屉菜单」按钮");
    }
}

function recursiveClick(element) {
    if (element != null)
        if (!element.click())
            recursiveClick(element.parent());
}
