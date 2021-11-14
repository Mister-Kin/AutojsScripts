auto.waitFor();
// ----------------------------
// 脚本信息设定
let task_name = "米游社签到";
let app_name = "米游社";
let waiting_time = 20; // 启动 APP 的等待时间，单位为秒
// ----------------------------
let CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
CommonModules.RunApp(app_name, waiting_time);
// ----------------------------
// 脚本自定义函数
EntryTab("崩坏：星穹铁道");
DailySign();
EntryTab("崩坏3");
DailySign();
likeAndGlance();
GetHonkaiImpact3rdDailyBonus();
// ----------------------------
CommonModules.StopApp(app_name);
CommonModules.EndLog(task_name);
home();
exit();

function EntryTab(tab_name) {
    let detect_tab_button = text(tab_name).find();
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

function DailySign() {
    let detect_not_sign_button = text("未签到").findOnce();
    if (detect_not_sign_button) {
        detect_not_sign_button.parent().click();
        sleep(8000);
        back();
        sleep(5000);
        console.log("已完成「讨论区签到」");
    }
    else {
        console.info("未检测到「未签到」按钮，讨论区已签到过");
    }
}

function GetHonkaiImpact3rdDailyBonus() {
    let detect_bonus_button = text("福利补给").findOnce();
    if (detect_bonus_button) {
        detect_bonus_button.parent().parent().click();
        sleep(5000);
        // 获取时间
        let date = new Date().getDate();
        let date_text = "第" + date + "天";
        sleep(3000);
        let detect_date_button = text(date_text).findOnce();
        if (detect_date_button) {
            detect_date_button.parent().click();
            sleep(5000);
            console.log("已领取「" + date_text + "」的福利补给");
        }
        else {
            console.error("未检测到「" + date_text + "」按钮");
        }
    }
    else {
        console.error("未检测到「福利补给」按钮");
    }
}

function likeAndGlance() {
    let count_like = 0, count_glance = 0, count_swipe = 0;
    while (true) {
        if (count_like == 5) {
            break;
        }
        // 向下滑动
        swipe(device.width / 2, device.height / 5 * 4, device.width / 2, device.height / 5 * 4 - device.height / 5 * 3, 300);
        sleep(2000);
        count_swipe++;
        console.log("向下滑动第" + count_swipe + "次");
        // 检测点赞按钮
        let detect_like_button = id("com.mihoyo.hyperion:id/likeCountTv").find().findOne(selected(false));
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
                back();
                sleep(5000);
            }
        }
        else {
            console.log("未检测到需要「点赞」的按钮");
        }
    }
    for (let i = 0; i < count_swipe; i++) {
        swipe(device.width / 2, device.height / 5, device.width / 2, device.height / 5 + device.height / 5 * 3, 300);
        sleep(2000);
    }
    console.log("已滑动至顶部");
}
