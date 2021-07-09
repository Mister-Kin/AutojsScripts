auto.waitFor();
// ----------------------------
// 脚本信息设定
var task_name = "网易云音乐签到";
var app_name = "网易云音乐";
var waiting_time = 25; // 启动 APP 的等待时间，单位为秒
// ----------------------------
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
GetDailyPoints();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function GetDailyPoints() {
    var detect_drawer_menu_button = desc("抽屉菜单").findOnce();
    if (detect_drawer_menu_button) {
        detect_drawer_menu_button.click();
        sleep(5000);
        var detect_points_centre_button = text("云贝中心").findOnce();
        if (detect_points_centre_button) {
            detect_points_centre_button.parent().parent().click();
            sleep(8000);
            log("已领取「签到的云贝」");
        }
        else {
            toastLog("未检测到「云贝中心」按钮");
        }
        var detect_points_from_listening_music = text("听音乐30分钟").find();
        if (detect_points_from_listening_music.nonEmpty()) {
            for (var i = 0; i < detect_points_from_listening_music.length; i++){
                detect_points_from_listening_music[i].parent().parent().click();
                sleep(8000);
            }
            log("已领取「听音乐的云贝」");
        }
        else {
            toastLog("未检测到「听音乐30分钟」按钮");
        }
    }
    else {
        toastLog("未检测到「抽屉菜单」按钮");
    }
}
