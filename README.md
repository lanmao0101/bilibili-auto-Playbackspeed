# Bilibili Video Speed Control
一款适配B站2025新版播放器的油猴脚本，支持**快捷键循环切换倍速**、**切分P自动保持倍速**、**本地记忆常用倍速**，彻底解决B站原生倍速操作繁琐、切P重置倍速的问题。

## ✨ 功能特点
- 🎯 **快捷键快速切换**：默认按 `V` 键循环切换倍速，可自定义快捷键/是否需要Shift配合；
- 🔄 **切分P自动保持**：切换视频分P后自动恢复上一次设置的倍速，无需重复调整；
- 💾 **本地记忆倍速**：关闭页面/浏览器后，再次打开B站会自动恢复上次使用的倍速；
- 🎨 **倍速提示弹窗**：切换倍速时显示半透明提示，1秒后自动消失，不遮挡视频；
- ⚙️ **高度自定义**：支持自定义倍速列表、默认倍速、切换快捷键；
- 🧩 **兼容新版播放器**：适配B站2025新版播放器布局，兼容 `video.bpx-player-video` 核心元素。

## 📥 安装方法
### 1. 前置条件
先在浏览器安装油猴插件（二选一）：
- Tampermonkey（推荐）：[Chrome/Edge 应用商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
- Greasemonkey：[Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/greasemonkey/)

### 2. 安装脚本
#### 方式1：直接安装（推荐）
点击下方链接，油猴插件会自动识别并安装：
```
https://raw.githubusercontent.com/你的用户名/仓库名/main/bilibili-speed-control.user.js
```
（替换 `你的用户名/仓库名` 为实际的GitHub用户名和仓库名）

#### 方式2：手动安装
1. 克隆本仓库：
   ```bash
   git clone https://github.com/你的用户名/仓库名.git
   ```
2. 打开油猴插件 → 新建脚本 → 清空默认内容 → 粘贴本脚本的代码；
3. 保存脚本（快捷键 `Ctrl+S`），刷新B站视频页面即可生效。

## 🚀 使用说明
### 基础使用
1. 安装完成后，打开B站任意视频页面（`https://www.bilibili.com/video/*` 或 `https://www.bilibili.com/list/*`）；
2. 按 `V` 键（默认）循环切换倍速，切换时会显示 `0.5x/1.0x/1.25x...` 提示；
3. 切换视频分P时，脚本会自动在1.2秒后恢复上次设置的倍速；
4. 关闭浏览器后再次打开B站，视频会自动使用上次记忆的倍速。

### 快捷键说明
| 快捷键（默认） | 功能                     | 备注                     |
|----------------|--------------------------|--------------------------|
| `V`            | 循环切换倍速             | 输入框/文本域中不会触发 |
| `Shift + V`    | 无（默认关闭）           | 可通过配置开启Shift配合  |

## ⚙️ 自定义配置
脚本顶部提供了可自定义的参数，修改后保存即可生效：
```javascript
// -------------------------- 可自定义配置 --------------------------
const TOGGLE_KEY = 'KeyV';       // 切换倍速的快捷键（参考：KeyB/KeyN/KeyZ等）
const NEED_SHIFT = false;        // 是否需要Shift键配合（true=需要，false=不需要）
const SPEED_LIST = [0.5, 1.0, 1.25, 1.5, 2.0, 2.5]; // 循环切换的倍速列表
const DEFAULT_SPEED = 1.0;       // 首次使用的默认倍速
// -----------------------------------------------------------------
```

### 配置示例
#### 示例1：修改快捷键为 `B` 键
```javascript
const TOGGLE_KEY = 'KeyB'; // 按B键切换倍速
```

#### 示例2：添加4倍速、需要Shift配合
```javascript
const NEED_SHIFT = true; // 需按Shift+V切换
const SPEED_LIST = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0]; // 自定义倍速列表
```

## ❗ 注意事项
1. 脚本仅适配B站视频/列表页面（`video/*`/`list/*`），其他页面（如首页、直播）不生效；
2. 若快捷键冲突（如V键被其他插件占用），可修改 `TOGGLE_KEY` 为其他键（参考[键盘键值对照表](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code/code_values)）；
3. 切P后延迟1.2秒设置倍速，是为了等待播放器加载完成（可根据网络情况调整 `setTimeout` 的1200毫秒）；
4. 倍速记忆基于浏览器本地存储（`localStorage`），清空浏览器缓存会重置记忆的倍速；
5. 若倍速设置不生效，可刷新页面或检查播放器是否为B站新版（旧版播放器需手动适配 `video` 选择器）。

## 📄 许可证
本项目采用 MIT 许可证开源，详见 [LICENSE](LICENSE) 文件。

## 📞 反馈与贡献
- 如有BUG或功能建议，可提交 [Issue](https://github.com/你的用户名/仓库名/issues)；
- 欢迎提交 PR 改进代码，提交前请确保代码兼容B站新版播放器。

---
> 适配B站2025新版播放器 | 轻量无冗余 | 本地无隐私数据上传
