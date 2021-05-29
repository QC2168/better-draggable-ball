// 获取屏幕宽高
const screenWidth: number = window.screen.width
const screenHeight: number = window.screen.height
// 获取元素
const dElement: HTMLElement | null = document.getElementById("drag")
// 判断是否移动设备
let isPhone:boolean=/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
// 获取元素宽高
const elementWidth: number | HTMLElement | undefined = dElement?.offsetWidth
const elementHeight: number | HTMLElement | undefined = dElement?.offsetHeight
// 元素坐标
const elementX: number = 0
const elementY: number = 0
// 鼠标是否按住
let mousePress: boolean = false
// 设置绝对定位
if (dElement) {
    dElement.style.position = 'absolute'
}
type MT=MouseEvent|TouchEvent
// 获取鼠标移动的位置
function mouse(event:MT) {
    console.log(typeof event);
    // // touch
    // console.log(event.touches[0].pageX);
    // console.log(event.touches[0].pageY);
    // let x = event.touches[0].pageX
    // let y = event.touches[0].pageY

    // // mouse
    // let x = event.x
    // let y = event.y
    // setElementPosition(x, y)
}
function setElementPosition(x: number, y: number) {
    if (!dElement) return;
    dElement.style.top = y + 'px'
    dElement.style.left = x + 'px'
}
function touchStart() {
    mousePress = true
    if(isPhone){
        window.addEventListener('touchmove', mouse)
    }else{
        window.addEventListener('mousemove', mouse)
    }
    
    
}
function touchEnd() {
    mousePress = false
    window.removeEventListener('mousemove', mouse)
    // window.removeEventListener('touchmove', mouse)
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



