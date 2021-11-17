let task_name = "清理最近应用";
let common = require('common.js');
common.startLog(task_name);
recents();
sleep(5000);
let detect_clear_all_button = id("com.android.systemui:id/recent_igmbutton_clear_all").findOnce();
if (detect_clear_all_button) {
    detect_clear_all_button.click();
    sleep(5000);
    console.log("已清理「最近应用」");
}
else {
    console.log("未检测到「清理」按钮");
}
common.endLog(task_name);
home();
exit();
