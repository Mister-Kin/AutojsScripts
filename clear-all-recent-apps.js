// ----------------------------
// 脚本信息设定
let task_name = "清理最近应用";
// ----------------------------
let common = require('common.js');
common.startLog(task_name);
// ----------------------------
// 脚本自定义功能
recents();
let detect_clear_all_button1 = common.detectWidgetItem("id", "com.android.launcher:id/btn_clear", "none", "normal");
if (detect_clear_all_button1) {
    detect_clear_all_button1.click();
    console.log("已清理「最近应用」");
}
else {
    let detect_clear_all_button2 = common.detectWidgetItem("id", "com.android.systemui:id/recent_igmbutton_clear_all", "none", "normal");
    if (detect_clear_all_button2) {
        detect_clear_all_button2.click();
        console.log("已清理「最近应用」");
    }
    else {
        console.log("未检测到「清理」按钮");
    }
}
// ----------------------------
common.endLog(task_name);
home();
exit();
