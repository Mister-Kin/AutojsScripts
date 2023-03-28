// var root_flag = true; // 手机已 root
var root_flag = false; // 手机未 root

let common = {};

common.getMainActivity = function (app_name) {
    switch (app_name) {
        case "米游社":
            return "com.mihoyo.hyperion.main.HyperionMainActivity";
        case "支付宝":
            return "com.eg.android.AlipayGphone.AlipayLogin";
        case "中国联通":
            return "com.sinovatech.unicom.basic.ui.activity.MainActivity";
        case "京东":
            return "com.jingdong.app.mall.MainFrameActivity";
        case "有道云笔记":
            return "com.youdao.note.activity2.MainActivity";
        case "淘宝":
            return "com.taobao.tao.TBMainActivity";
        case "网易云音乐":
            return "com.netease.cloudmusic.activity.MainActivity";
        default:
            return;
    }
}

common.openMainActivity = function (app_name) {
    let app_package_name = getPackageName(app_name);
    let app_main_activity = this.getMainActivity(app_name);
    let mainActivityFlag = 0;
    let try_time = 0;
    while (mainActivityFlag == 0) {
        sleep(100);
        if (app_name != "中国联通" && app_name != "网易云音乐" && app_name != "京东") {
            app.startActivity({
                action: "android.intent.action.VIEW",
                packageName: app_package_name,
                className: app_main_activity,
            });
        }
        else {
            if (try_time == 50 || try_time == 100 || try_time == 200) {
                this.stopApp(app_name);
            }
            app.launchApp(app_name);
        }
        try_time++;
        if (currentActivity() == app_main_activity) {
            mainActivityFlag = 1;
        }
        if (try_time > 300) {
            console.error("已尝试启动300次，均未检测到正确的activity");
            return false;
        }
    }
    console.log("已启动到「" + app_name + "」的主activity");
    return true;
}

common.detectWidgetItem = function (item_type, item_content, log_level, try_time_frequency) {
    let try_time_max = 0;
    if (try_time_frequency == "normal") {
        try_time_max = 50;
    }
    else if (try_time_frequency == "lite") {
        try_time_max = 20;
    }
    else {
        try_time_max = try_time_frequency;
    }
    if (item_type == "text") {
        let detect_widget_item = text(item_content).findOnce();
        let try_time = 0;
        while (!detect_widget_item) {
            sleep(100);
            detect_widget_item = text(item_content).findOnce();
            try_time++;
            if (try_time > try_time_max) {
                this.detectWidgetItemLog(log_level, item_content, try_time_max);
                return null;
            }
        }
        return detect_widget_item;
    }
    else if (item_type == "id") {
        let detect_widget_item = id(item_content).findOnce();
        let try_time = 0;
        while (!detect_widget_item) {
            sleep(100);
            detect_widget_item = id(item_content).findOnce();
            try_time++;
            if (try_time > try_time_max) {
                this.detectWidgetItemLog(log_level, item_content, try_time_max);
                return null;
            }
        }
        return detect_widget_item;
    }
    else if (item_type == "textContains") {
        let detect_widget_item = textContains(item_content).findOnce();
        let try_time = 0;
        while (!detect_widget_item) {
            sleep(100);
            detect_widget_item = textContains(item_content).findOnce();
            try_time++;
            if (try_time > try_time_max) {
                this.detectWidgetItemLog(log_level, item_content, try_time_max);
                return null;
            }
        }
        return detect_widget_item;
    }
    else if (item_type == "desc") {
        let detect_widget_item = desc(item_content).findOnce();
        let try_time = 0;
        while (!detect_widget_item) {
            sleep(100);
            detect_widget_item = desc(item_content).findOnce();
            try_time++;
            if (try_time > try_time_max) {
                this.detectWidgetItemLog(log_level, item_content, try_time_max);
                return null;
            }
        }
        return detect_widget_item;
    }
}

common.detectTextWithIndexInParent = function (text_content, index_in_parent, log_level, try_time_frequency) {
    let try_time_max = 0;
    if (try_time_frequency == "normal") {
        try_time_max = 50;
    }
    else if (try_time_frequency == "lite") {
        try_time_max = 20;
    }
    else {
        try_time_max = try_time_frequency;
    }
    let detect_widget_item = text(text_content).indexInParent(index_in_parent).findOnce();
    let try_time = 0;
    while (!detect_widget_item) {
        sleep(100);
        detect_widget_item = text(text_content).indexInParent(index_in_parent).findOnce();
        try_time++;
        if (try_time > try_time_max) {
            this.detectWidgetItemLog(log_level, text_content, try_time_max);
            return null;
        }
    }
    return detect_widget_item;
}

common.detectWidgetItemWithChain = function (class_name, depth, draw_order, index_in_parent, log_level, try_time_frequency) {
    let try_time_max = 0;
    if (try_time_frequency == "normal") {
        try_time_max = 50;
    }
    else if (try_time_frequency == "lite") {
        try_time_max = 20;
    }
    else {
        try_time_max = try_time_frequency;
    }
    let detect_widget_item = className(class_name).depth(depth).drawingOrder(draw_order).indexInParent(index_in_parent).findOnce();
    let try_time = 0;
    while (!detect_widget_item) {
        sleep(100);
        detect_widget_item = className(class_name).depth(depth).drawingOrder(draw_order).indexInParent(index_in_parent).findOnce();
        try_time++;
        if (try_time > try_time_max) {
            this.detectWidgetItemLog(log_level, item_content, try_time_max);
            return null;
        }
    }
    return detect_widget_item;
}

common.detectWidgetItemLog = function (log_level, item_content, try_time_max) {
    let log_message = "已尝试检测" + try_time_max + "次，均未检测到「" + item_content + "」按钮控件";
    switch (log_level) {
        case "error":
            console.error(log_message);
            break;
        case "log":
            console.log(log_message);
            break;
        case "none":
            break;
    }
}

common.detectSuccessInfo = function (item_type, item_content) {
    let detect_success_info = this.detectWidgetItem(item_type, item_content, "error", "normal");
    if (!detect_success_info) {
        console.error("未检测到操作成功的控件信息，请之后尝试重新运行脚本");
        return false;
    }
    return true;
}

common.runApp = function (app_name) {
    let app_package_name = getPackageName(app_name);
    let app_main_activity = this.getMainActivity(app_name);
    if (!root_flag) {
        let state = this.openMainActivity(app_name);
        if (!state) {
            console.log("运行「" + app_name + "」失败");
            exit();
        }
    }
    else {
        let state = shell("am start -n " + app_package_name + "/" + app_main_activity, root_flag);
        if (state.code == 0) {
            console.log("已运行「" + app_name + "」");
        }
        else {
            console.error("运行「" + app_name + "」失败");
        }
    }
};

common.stopApp = function (app_name) {
    let app_package_name = getPackageName(app_name);
    let stop_success_message = "已停止「" + app_name + "」";
    let stop_fail_message = "未能停止「" + app_name + "」";
    if (!root_flag) {
        openAppSetting(app_package_name);
        let detect_force_stop_button = this.detectWidgetItem("text", "强行停止", "error", "normal");
        if (detect_force_stop_button) {
            detect_force_stop_button.click();
            if (device.model == "RMX3560") {
                let detect_confirm_button = this.detectWidgetItem("text", "强行停止", "error", "normal");
                if (detect_confirm_button) {
                    detect_confirm_button.click();
                    console.log(stop_success_message);
                }
                else {
                    console.error("未检测到「强行停止」按钮：" + stop_fail_message);
                }
            }
            else if (device.model == "VIE-AL10") {
                let detect_confirm_button = this.detectWidgetItem("text", "确定", "error", "normal");
                if (detect_confirm_button) {
                    detect_confirm_button.click();
                    console.log(stop_success_message);
                }
                else {
                    console.error("未检测到「确定」按钮：" + stop_fail_message);
                }
            }
            else {
                let detect_confirm_button_1 = this.detectWidgetItem("textContains", "确定", "error", "normal");
                let detect_confirm_button_2 = this.detectWidgetItem("textContains", "强行停止", "error", "normal");
                if (detect_confirm_button_1) {
                    detect_confirm_button_1.click();
                    console.log(stop_success_message);
                }
                if (detect_confirm_button_2) {
                    detect_confirm_button_2.click();
                    console.log(stop_success_message);
                }
                if (!detect_confirm_button_1 && !detect_confirm_button_2) {
                    console.error(stop_fail_message);
                }
            }
        }
        else {
            console.error("未检测到「强行停止」按钮：" + stop_fail_message);
        }
    }
    else {
        console.log("开始停止「" + app_name + "」");
        let state = shell("am force-stop " + app_package_name, root_flag);
        if (state.code == 0) {
            console.log("已强行停止「" + app_name + "」");
        }
        else {
            console.error("强行停止「" + app_name + "」失败");
        }
    }
};

common.startLog = function (task_name) {
    console.log("----------------------------------");
    console.log("开始「" + task_name + "」任务");
    console.log("----------------------------------");
};

common.endLog = function (task_name) {
    console.log("----------------------------------");
    console.log("结束「" + task_name + "」任务");
    console.log("----------------------------------");
};

module.exports = common;
