// ----------------------------
// 脚本信息设定
let task_name = "网易云音乐签到";
let app_name = "网易云音乐";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
getDailyPoints();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function getDailyPoints() {
    let detect_drawer_menu_button = common.detectWidgetItem("desc", "抽屉菜单", "error", "normal");
    if (detect_drawer_menu_button) {
        detect_drawer_menu_button.click();
        let detect_points_center_button = common.detectWidgetItem("textContains", "云贝中心", "error", "normal");
        if (detect_points_center_button) {
            detect_points_center_button.parent().parent().click();
            if (common.detectSuccessInfo("textContains", "云贝账单")) {
                console.log("已进入云贝中心");
                console.log("已领取「签到的云贝」");
                // 目前的版本中，text 的末尾含有空格，为避免这种状况，将 text 选择器换为 textContains 选择器
                let detect_points_from_listening_music = textContains("听音乐30分钟").find();
                let detect_points_from_listening_podcast = textContains("听播客30秒").find();
                let try_time = 0;
                while (detect_points_from_listening_music.empty()) {
                    sleep(100);
                    detect_points_from_listening_music = textContains("听音乐30分钟").find();
                    try_time++;
                    if (try_time > 50) {
                        common.detectWidgetItemLog("log", "听音乐30分钟", 50);
                        break;
                    }
                }
                while (detect_points_from_listening_podcast.empty()) {
                    sleep(100);
                    detect_points_from_listening_podcast = textContains("听播客30秒").find();
                    try_time++;
                    if (try_time > 50) {
                        common.detectWidgetItemLog("log", "听播客30秒", 50);
                        break;
                    }
                }
                if (detect_points_from_listening_music.nonEmpty()) {
                    detect_points_from_listening_music.forEach(function (element) {
                        recursiveClick(element);
                        sleep(1000);
                    }
                    );
                    console.log("已领取「听音乐的云贝」");
                }
                if (detect_points_from_listening_podcast.nonEmpty()) {
                    detect_points_from_listening_podcast.forEach(function (element) {
                        recursiveClick(element);
                        sleep(1000);
                    }
                    );
                    console.log("已领取「听播客的云贝」");
                }
            }
            else {
                console.error("未能进入云贝中心");
            }
        }
    }
}

function recursiveClick(element) {
    if (element != null)
        if (!element.click())
            recursiveClick(element.parent());
}
