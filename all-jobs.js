let filePathList = ["china-unicom.js", "ynote.js", "taobao.js", "jingdong.js", "alipay.js", "mihoyo.js", "cloud-music.js"]

filePathList = filePathList.map(function (filePath) {
    return files.path(filePath)
})

events.on("exit", function () {
    console.log("所有签到任务执行完毕，已退出")
})

setInterval(function () { }, 1000)

let limitTime = 180000

while (1) {
    if (filePathList.length > 0) {
        let e = engines.execScriptFile(filePathList[0])
        while (!e.getEngine()); //等待脚本运行
        let currentScriptEngine = e.getEngine()
        let lastTime = new Date().getTime()
        while (1) {
            let currentTime = new Date().getTime()
            if (currentTime - lastTime > limitTime) {
                console.log("脚本运行超时, 开始执行销毁命令")
                currentScriptEngine.forceStop()
                console.log("脚本运行超时, 结束执行销毁命令")
                break
            }
            if (currentScriptEngine.isDestroyed()) {
                break
            } else {
                sleep(100)
            }
        }
    } else {
        engines.myEngine().forceStop()
    }
    filePathList.shift()
}
