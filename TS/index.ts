// 获取屏幕宽高
const screenWidth: number = window.screen.width
const screenHeight: number = window.screen.height
// 获取元素
const dElement: HTMLElement | null = document.getElementById("drag")
// 判断是否移动设备
let isPhone: boolean = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
console.log(isPhone);
// if(!isPhone) throw new Error("该功能只在mobile端生效")
// 获取元素宽高

const elementWidth: number = dElement ? dElement.offsetWidth : 0
const elementHeight: number = dElement ? dElement.offsetHeight : 0
// 元素坐标
const elementX: number = 0
const elementY: number = 0
// 鼠标是否按住
let mousePress: boolean = false
// 设置绝对定位
if (dElement) {
    dElement.style.position = 'absolute'
}
console.log('screenWidth===>', screenWidth);
console.log('screenHeight===>', screenHeight);
console.log('elementWidth===>', elementWidth);
console.log('elementHeight===>', elementHeight);
// 获取鼠标移动的位置
function mouse(event: TouchEvent | MouseEvent): void {
    if (isPhone) {
        // touch
        let x = (event as TouchEvent).touches[0].pageX
        let y = (event as TouchEvent).touches[0].pageY
        setElementPosition(x, y)
    } else {
        // mouse
        let x = (event as MouseEvent).x
        let y = (event as MouseEvent).y
        setElementPosition(x, y)
    }

}
function setElementPosition(x: number, y: number): void {
    // 溢出处理
    // 溢出范围
    let rightScope = screenWidth - elementWidth
    let bottomScope = screenHeight - elementHeight
    if (x <= 0 && y <= 0) {
        [x, y] = [0, 0]
    } else if (x >= rightScope && y <= 0) {
        [x, y] = [rightScope, 0]
    } else if (x <= 0 && y >= bottomScope) {
        [x, y] = [0, bottomScope]
    } else if (x >= rightScope && y >= bottomScope) {
        [x, y] = [rightScope, bottomScope]
    } else if (x > rightScope) {
        x = rightScope
    } else if (y > bottomScope) {
        y = bottomScope
    } else if (x <= 0) {
        x = 0
    } else if (y <= 0) {
        y = 0
    }
    console.log(`x===>>${x}   y===>>${y}`);

    dElement?dElement.style.top = y + 'px':0
    dElement?dElement.style.left = x + 'px':0
}
function touchStart() {
    mousePress = true
    if (isPhone) {
        window.addEventListener('touchmove', mouse)
    } else {
        window.addEventListener('mousemove', mouse)
    }


}
function touchEnd() {
    mousePress = false
    if (isPhone) {
        window.removeEventListener('touchmove', mouse)
    } else {
        window.removeEventListener('mousemove', mouse)
    }


}
if (dElement) {
    // 判断设备
    if (isPhone) { //移动端
        console.log('moile');
        dElement.addEventListener('touchstart', touchStart)
        window.addEventListener('touchend', touchEnd)
    } else {
        console.log('pc');
        dElement.addEventListener('mousedown', touchStart)
        window.addEventListener('mouseup', touchEnd)
    }
}



