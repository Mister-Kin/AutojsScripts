auto.waitFor();
var task_name = "清理最近应用";
var CommonModules = require('CommonModules.js');
CommonModules.StartLog(task_name);
recents();
sleep(5000);
var detect_clear_all_button = id("com.android.systemui:id/recent_igmbutton_clear_all").findOnce();
if (detect_clear_all_button) {
    detect_clear_all_button.click();
    sleep(5000);
    log("已清理「最近应用」");
}
else {
    toastLog("未检测到「清理」按钮");
}
CommonModules.EndLog(task_name);
home();
exit();
