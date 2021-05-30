"use strict";
// 获取屏幕宽高
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
// 获取元素
var dElement = document.getElementById("drag");
// 判断是否移动设备
var isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
console.log(isPhone);
// if(!isPhone) throw new Error("该功能只在mobile端生效")
// 获取元素宽高
var elementWidth = dElement ? dElement.offsetWidth : 0;
var elementHeight = dElement ? dElement.offsetHeight : 0;
// 元素坐标
var elementX = 0;
var elementY = 0;
// 鼠标是否按住
var mousePress = false;
// 设置绝对定位
if (dElement) {
    dElement.style.position = 'absolute';
}
console.log('screenWidth===>', screenWidth);
console.log('screenHeight===>', screenHeight);
console.log('elementWidth===>', elementWidth);
console.log('elementHeight===>', elementHeight);
// 获取鼠标移动的位置
function mouse(event) {
    if (isPhone) {
        // touch
        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;
        setElementPosition(x, y);
    }
    else {
        // mouse
        var x = event.x;
        var y = event.y;
        setElementPosition(x, y);
    }
}
function setElementPosition(x, y) {
    var _a, _b, _c, _d;
    // 溢出处理
    // 溢出范围
    var rightScope = screenWidth - elementWidth;
    var bottomScope = screenHeight - elementHeight;
    if (x <= 0 && y <= 0) {
        _a = [0, 0], x = _a[0], y = _a[1];
    }
    else if (x >= rightScope && y <= 0) {
        _b = [rightScope, 0], x = _b[0], y = _b[1];
    }
    else if (x <= 0 && y >= bottomScope) {
        _c = [0, bottomScope], x = _c[0], y = _c[1];
    }
    else if (x >= rightScope && y >= bottomScope) {
        _d = [rightScope, bottomScope], x = _d[0], y = _d[1];
    }
    else if (x > rightScope) {
        x = rightScope;
    }
    else if (y > bottomScope) {
        y = bottomScope;
    }
    else if (x <= 0) {
        x = 0;
    }
    else if (y <= 0) {
        y = 0;
    }
    console.log("x===>>" + x + "   y===>>" + y);
    dElement ? dElement.style.top = y + 'px' : 0;
    dElement ? dElement.style.left = x + 'px' : 0;
}
function touchStart() {
    mousePress = true;
    if (isPhone) {
        window.addEventListener('touchmove', mouse);
    }
    else {
        window.addEventListener('mousemove', mouse);
    }
}
function touchEnd() {
    mousePress = false;
    if (isPhone) {
        window.removeEventListener('touchmove', mouse);
    }
    else {
        window.removeEventListener('mousemove', mouse);
    }
}
if (dElement) {
    // 判断设备
    if (isPhone) { //移动端
        console.log('moile');
        dElement.addEventListener('touchstart', touchStart);
        window.addEventListener('touchend', touchEnd);
    }
    else {
        console.log('pc');
        dElement.addEventListener('mousedown', touchStart);
        window.addEventListener('mouseup', touchEnd);
    }
}
