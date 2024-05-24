// ----------------------------
// 脚本信息设定
let task_name = "米游社签到";
let app_name = "米游社";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
common.runApp(app_name);
// ----------------------------
// 脚本自定义函数
closeTeenageModeDialog();
// 米游社的顶部控件获取时有问题，经常首个标签页能够正常获取，进入到第二个标签页就获取异常
// 现为解决这个，定义两个变量来存储首个标签页中需要点击的元素坐标
let get_daily_bonus_position = [0, 0];
entryTab("崩坏3");
getDailyBonus("崩坏3");
common.openMainActivity(app_name);
likeAndGlance(false);
// 暂时无法解决图形验证码的问题，将签到功能移至最后执行
dailySign();
// ----------------------------
common.stopApp(app_name);
common.endLog(task_name);
home();
exit();

function entryTab(tab_name) {
    let detect_tab_button = text(tab_name).find();
    let try_time = 0;
    while (detect_tab_button.empty()) {
        sleep(100);
        detect_tab_button = text(tab_name).find();
        try_time++;
        if (try_time > 50) {
            common.detectWidgetItemLog("log", tab_name, 50);
            break;
        }
    }
    if (detect_tab_button.nonEmpty()) {
        for (let index = 0; index < detect_tab_button.length; index++) {
            const element = detect_tab_button[index];
            if (element.id() == "com.mihoyo.hyperion:id/mHomeTabItemTvTitle") {
                element.parent().click();
                sleep(5000);
                console.log("已进入「" + tab_name + "」标签页");
                break;
            }
            if (index == detect_tab_button.length - 1) {
                console.error("未检测到「" + tab_name + "」按钮");
            }
        }
    }
    else {
        console.error("未检测到「" + tab_name + "」文字");
    }
}

function dailySign() {
    let detect_deck_button = common.detectWidgetItem("text", "甲板", "error", "normal");
    if (detect_deck_button) {
        detect_deck_button.parent().parent().parent().parent().click();
        sleep(5000);
        console.log("已切换到「甲板」子标签页");
        // TODO：尝试添加yolo训练框架智能完成识别验证码
        let detect_sign_button = common.detectWidgetItem("text", "打卡", "error", "normal");
        if (detect_sign_button) {
            detect_sign_button.parent().parent().click();
            sleep(5000);
        }
        else {
            console.info("未找到社区「打卡」按钮");
        }
        if (common.detectSuccessInfo("text", "已打卡")) {
            console.log("已完成社区打卡");
        }
        else {
            console.log("未完成社区打卡");
        }
    }
    else {
        console.info("未找到「甲板」子标签页");
    }
}

function getDailyBonus(bonus_type) {
    let detect_bonus_button = common.detectWidgetItem("text", "签到福利", "error", "normal");
    if (detect_bonus_button) {
        // detect_bonus_button.parent().parent().click();
        if (get_daily_bonus_position[0] > 0) {
            click(get_daily_bonus_position[0], get_daily_bonus_position[1]);
        }
        else {
            let click_position = detect_bonus_button.bounds();
            get_daily_bonus_position[0] = click_position.centerX();
            get_daily_bonus_position[1] = click_position.centerY();
            try {
                click(click_position.centerX(), click_position.centerY());
            } catch (error) { };
            console.log("进入「签到福利」子标签页");
        }
        sleep(8000);
        // 获取已累计签到的天数
        let detect_already_sign_text = common.detectWidgetItem("textContains", "已累计签到", "error", "normal");;
        if (detect_already_sign_text) {
            let detect_already_sign_day = detect_already_sign_text.parent().child(1).text();
            console.log("当前已累计签到" + detect_already_sign_day + "天");
            // 执行签到领取福利
            let date = Number(detect_already_sign_day) + 1;
            let date_text = "第" + date + "天";
            let detect_date_button = common.detectWidgetItem("textContains", date_text, "error", "normal");
            if (detect_date_button) {
                detect_date_button.parent().click();
                sleep(5000);
                console.log("已领取「" + date_text + "」的签到福利");
                console.log("本月已累计签到" + date + "天");
                back();
                back();
            }
        }
        else {
            console.error("未检测到「已累计签到天数」的信息");
        }
    }
    else {
        console.error("未检测到「签到福利」按钮");
    }
}

function likeAndGlance(swipe_back_flag) {
    let count_like = 0, count_glance = 0, count_share = 0, count_swipe = 0;
    while (true) {
        // TODO：寻找能否判断的逻辑，比如以图搜图？。目前新版无法通过select属性判断是否已经点赞过，增加点赞次数尽可能完成日常任务
        if (count_like == 10) {
            break;
        }
        if (count_swipe > 30) {
            console.log("当前已向下滑动超过30次，强制退出循环");
            break;
        }
        // 向下滑动
        swipe(device.width / 2, device.height / 5 * 4, device.width / 2, device.height / 5 * 4 - device.height / 5 * 3, 300);
        sleep(2000);
        count_swipe++;
        console.log("向下滑动第" + count_swipe + "次");
        // 检测点赞按钮
        let detect_like_button = id("com.mihoyo.hyperion:id/likeBtn").find().findOne(selected(false));
        if (detect_like_button) {
            detect_like_button.click();
            count_like++;
            console.log("已点赞" + count_like + "次");
            sleep(2000);
            // 浏览帖子
            if (count_glance < 3) {
                detect_like_button.parent().children().findOne(id("com.mihoyo.hyperion:id/commentCountTv")).click();
                count_glance++;
                console.log("已浏览" + count_glance + "个帖子");
                sleep(8000);
                if (count_share < 1) {
                    let detect_share_button = id("com.mihoyo.hyperion:id/mPostDetailActionBarIvMore2").findOne();
                    detect_share_button.click();
                    sleep(2000);
                    let detect_copy_link_button = text("复制链接").findOnce();
                    detect_copy_link_button.parent().click();
                    count_share++;
                    console.log("已分享" + count_share + "次，已完成分享任务");
                    sleep(1000);
                }
                back();
                sleep(5000);
            }
        }
        else {
            console.log("未检测到需要「点赞」的按钮");
        }
    }
    if (swipe_back_flag) {
        for (let i = 0; i < count_swipe; i++) {
            swipe(device.width / 2, device.height / 5, device.width / 2, device.height / 5 + device.height / 5 * 3, 300);
            sleep(2000);
        }
        console.log("已滑动至顶部");
    }
}


function closeTeenageModeDialog() {
    let detect_go_to_teenage_mode_widget = common.detectWidgetItem("id", "com.mihoyo.hyperion:id/tv_dialog_i_know", "none", "normal");
    if (detect_go_to_teenage_mode_widget) {
        let detect_know_button = common.detectWidgetItem("text", "我知道了", "error", "normal");
        if (detect_know_button) {
            console.log("检测到青少年模式弹窗");
            detect_know_button.click();
            console.log("已关闭青少年模式弹窗");
        }
    }
}
