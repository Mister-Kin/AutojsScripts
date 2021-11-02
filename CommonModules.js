let CommonModules = {};

CommonModules.RunApp = function (app_name, waiting_time) {
    let app_package_name = getPackageName(app_name);
    let app_main_activity = ""
    switch (app_name) {
        case "米游社":
            app_main_activity = "com.mihoyo.hyperion.main.HyperionMainActivity";
            break;
        case "支付宝":
            app_main_activity = "com.eg.android.AlipayGphone.AlipayLogin";
            break;
        case "中国联通":
            app_main_activity = "com.sinovatech.unicom.basic.ui.activity.MainActivity";
            break;
        case "京东":
            app_main_activity = "com.jingdong.app.mall.MainFrameActivity";
            break;
        case "有道云笔记":
            app_main_activity = "com.youdao.note.activity2.MainActivity";
            break;
        case "淘宝":
            app_main_activity = "com.taobao.tao.TBMainActivity";
            break;
        case "网易云音乐":
            app_main_activity = "com.netease.cloudmusic.activity.MainActivity";
            break;
        default:
            break;
    }
    let state = shell("am start -n " + app_package_name + "/" + app_main_activity, true);
    if (state.code == 0) {
        sleep(waiting_time * 1000);
        log("已运行「" + app_name + "」");
    }
    else {
        log("运行" + app_name + "失败");
    }
};

CommonModules.StopApp = function (app_name) {
    let app_package_name = getPackageName(app_name);
    openAppSetting(app_package_name);
    sleep(5000);
    let detect_force_stop_button = text("强行停止").findOnce();
    if (detect_force_stop_button) {
        detect_force_stop_button.click();
        sleep(5000);
        let detect_confirm_button = text("确定").findOnce();
        if (detect_confirm_button) {
            detect_confirm_button.click();
            sleep(5000);
            log("已停止「" + app_name + "」");
        }
        else {
            toastLog("未检测到「确定」按钮：未能停止「" + app_name + "」");
        }
    }
    else {
        toastLog("未检测到「强行停止」按钮：未能停止「" + app_name + "」");
    }
};

CommonModules.StartLog = function (task_name) {
    log("----------------------------------");
    log("开始「" + task_name + "」任务");
    log("----------------------------------");
};

CommonModules.EndLog = function (task_name) {
    log("----------------------------------");
    log("结束「" + task_name + "」任务");
    log("----------------------------------");
};

module.exports = CommonModules;
