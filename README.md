# Auto.js Scripts

## Introduction
Scripts of Auto.js for automatic works on Android phone.

## Platform
- Hardware: HUAWEI P9 Plus
- Software:
  - Auto.js v4.11 alpha2 + Xposed Edge Pro v6.06
  - AutoX.js v5.3.2 + Xposed Edge Pro v6.06

## Features
Support automatic works of following apps, such as daily sign-in tasks.
- 支付宝
- 米游社
- 中国联通
- 网易云音乐
- 京东
- 淘宝
- 有道云笔记

## Workflow
Unlock phone by Xposed Edge Pro, and execute Auto.js scripts using shell commands in Xposed Edge Pro.

For example, following shell command is used for executing
Auto.js scripts in Xposed Edge Pro. In this case, the script is mihoyo.js.
```
am start -n org.autojs.autojs/.external.open.RunIntentActivity -d file:///storage/emulated/0/脚本/mihoyo.js -t text/javascript
```

**Note**: It's not recommended to use Auto.js to unlock phone because of it's unstable background service. Instead, it's reliable to use Xposed Edge Pro to light up the screen, unlock phone by recorded gestures or simulated tap operation and execute Auto.js scripts by shell commands.

## Author
**Auto.js Scripts** © Mr. Kin, all files may not be used for commercial purposes.

Authored and maintained by Mr. Kin.
