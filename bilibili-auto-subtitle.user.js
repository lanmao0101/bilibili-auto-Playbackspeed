// ==UserScript==
// @name         B站视频倍速控制（快捷键V & 切P保持 & 记忆倍速）
// @namespace    https://github.com/yourname/bilibili-speed-control
// @version      1.1
// @description  按V键循环切换视频倍速，切P自动保持上次倍速，自动记忆常用倍速，适配B站2025新版播放器
// @author       YourName
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // -------------------------- 可自定义配置 --------------------------
  const TOGGLE_KEY = 'KeyV';       // 切换倍速的快捷键（可修改为KeyB/KeyN等）
  const NEED_SHIFT = false;        // 是否需要Shift键配合（true/false）
  const SPEED_LIST = [0.5, 1.0, 1.25, 1.5, 2.0, 2.5]; // 循环切换的倍速列表（可自定义添加/删除）
  const DEFAULT_SPEED = 1.0;       // 首次使用的默认倍速
  // -----------------------------------------------------------------

  // 从本地存储读取记忆的倍速，没有则用默认值
  let lastSpeed = localStorage.getItem('bilibili_last_speed') ? parseFloat(localStorage.getItem('bilibili_last_speed')) : DEFAULT_SPEED;
  // 当前倍速在列表中的索引
  let currentSpeedIndex = SPEED_LIST.indexOf(lastSpeed) !== -1 ? SPEED_LIST.indexOf(lastSpeed) : SPEED_LIST.indexOf(DEFAULT_SPEED);

  // 获取B站播放器的视频元素（兼容新版播放器）
  function getVideoElement() {
    return document.querySelector('video.bpx-player-video') || document.querySelector('video');
  }

  // 设置视频倍速
  function setPlaybackSpeed(speed) {
    const video = getVideoElement();
    if (video) {
      video.playbackRate = speed;
      lastSpeed = speed;
      // 保存倍速到本地，下次打开自动使用
      localStorage.setItem('bilibili_last_speed', speed);
      // 显示倍速切换提示
      showSpeedTip(speed);
      console.log(`[B站倍速控制] 已设置倍速为 ${speed}x`);
    } else {
      console.warn('[B站倍速控制] 未找到视频元素，可能播放器还未加载完成');
    }
  }

  // 循环切换倍速（按快捷键时触发）
  function togglePlaybackSpeed() {
    currentSpeedIndex = (currentSpeedIndex + 1) % SPEED_LIST.length;
    setPlaybackSpeed(SPEED_LIST[currentSpeedIndex]);
  }

  // 显示倍速切换的提示弹窗
  function showSpeedTip(speed) {
    // 移除旧的提示
    const oldTip = document.querySelector('.speed-control-tip');
    if (oldTip) oldTip.remove();

    // 创建提示元素
    const tip = document.createElement('div');
    tip.className = 'speed-control-tip';
    tip.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.85);
      color: #fff;
      padding: 14px 24px;
      border-radius: 10px;
      font-size: 20px;
      z-index: 999999;
      pointer-events: none;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(4px);
    `;
    tip.textContent = `${speed}x`;
    document.body.appendChild(tip);

    // 1秒后自动隐藏提示
    setTimeout(() => {
      tip.style.opacity = '0';
      setTimeout(() => tip.remove(), 300);
    }, 1000);
  }

  // 1. 快捷键切换倍速（排除输入框/文本域的场景）
  document.addEventListener('keydown', e => {
    const inInput = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (!inInput && e.code === TOGGLE_KEY && e.shiftKey === NEED_SHIFT && !e.repeat) {
      e.preventDefault(); // 阻止默认快捷键冲突
      togglePlaybackSpeed();
    }
  });

  // 2. 切P时自动恢复上次的倍速
  let lastP = new URLSearchParams(location.search).get('p');
  setInterval(() => {
    const nowP = new URLSearchParams(location.search).get('p');
    if (nowP !== lastP) {
      lastP = nowP;
      // 等待切P后播放器加载完成，再设置倍速
      setTimeout(() => setPlaybackSpeed(lastSpeed), 1200);
    }
  }, 1000);

  // 3. 页面加载完成后设置默认/记忆倍速
  window.addEventListener('load', () => {
    setTimeout(() => setPlaybackSpeed(lastSpeed), 2000);
  });

  // 4. 监听视频加载完成，确保倍速设置生效
  document.addEventListener('DOMContentLoaded', () => {
    const video = getVideoElement();
    if (video) {
      video.addEventListener('loadeddata', () => {
        setPlaybackSpeed(lastSpeed);
      });
    }
  });

})();
