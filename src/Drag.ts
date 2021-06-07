export default class Drag {
    // 元素
    element: HTMLElement;
    // 屏幕尺寸
    screenWidth: number;
    screenHeight: number;
    // 元素大小
    elementWidth: number;
    elementHeight: number;
    isPhone: boolean;
    // 当前元素坐标
    elementX: number;
    elementY: number;
    // 元素offset
    elementOffsetX: number;
    elementOffsetY: number;
    // 是否处于拖动状态
    flag: boolean;
    // 吸附
    autoAdsorbent: boolean;
    constructor(element: HTMLElement, autoAdsorbent: boolean = false) {
        this.element = element;
        this.screenWidth = document.body.scrollWidth || window.screen.width;
        this.screenHeight = document.body.scrollHeight || window.screen.height;
        this.elementWidth = this.element.offsetWidth;
        this.elementHeight = this.element.offsetHeight;
        this.isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
        this.element.style.position = "absolute";
        this.elementX = 0;
        this.elementY = 0;
        this.elementOffsetX = 0;
        this.elementOffsetY = 0;
        this.flag = false;
        this.autoAdsorbent = autoAdsorbent;
        if (!this.isPhone) {
            console.error("警告！！当前插件版本只兼容移动端");
        }
        // 默认位置
        this.setElementPosition(0, 0);
        this.watchTouch();
    }
    private watchTouch(): void {
        this.element.addEventListener("touchstart", (event: TouchEvent) => {
            let rect = (event.target as HTMLElement).getBoundingClientRect();
            // 页面被卷去的高度
            // 不兼容IE
            let docScrollTop = document.documentElement.scrollTop;
            this.elementOffsetX = event.targetTouches[0].pageX - rect.left;
            this.elementOffsetY = event.targetTouches[0].pageY - rect.top - docScrollTop;
            this.flag = true;
            this.element.addEventListener("touchmove", this.move.bind(this), { passive: false });
        });
        window.addEventListener("touchend", () => {
            this.flag = false;
            document.removeEventListener("touchmove", this.move);
            if (this.autoAdsorbent) this.adsorbent();
        });
    }

    private setElementPosition(x: number, y: number): void {
        // 溢出处理
        // 溢出范围
        // 但页面超出屏幕范围，计算当前屏幕范围
        let rightScope = this.screenWidth - this.elementWidth;
        let bottomScope = this.screenHeight - this.elementHeight;
        if (x <= 0 && y <= 0) {
            [x, y] = [0, 0];
        } else if (x >= rightScope && y <= 0) {
            [x, y] = [rightScope, 0];
        } else if (x <= 0 && y >= bottomScope) {
            [x, y] = [0, bottomScope];
        } else if (x >= rightScope && y >= bottomScope) {
            [x, y] = [rightScope, bottomScope];
        } else if (x > rightScope) {
            x = rightScope;
        } else if (y > bottomScope) {
            y = bottomScope;
        } else if (x <= 0) {
            x = 0;
        } else if (y <= 0) {
            y = 0;
        }
        this.elementX = x;
        this.elementY = y;
        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
    }
    private move(event: TouchEvent): void {
        event.preventDefault();
        if (!this.flag) return;
        let x = (this.elementX = event.touches[0].pageX - this.elementOffsetX);
        let y = (this.elementY = event.touches[0].pageY - this.elementOffsetY);
        this.setElementPosition(x, y);
    }
    private animate(targetLeft: number, spd: number) {
        let timer = setInterval(() => {
            let step = (targetLeft - this.elementX) / 10;
            //对步长进行二次加工(大于0向上取整,小于0向下取整)
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //动画原理： 目标位置 = 当前位置 + 步长
            let x = this.elementX + step;
            this.setElementPosition(x, this.elementY);
            //检测缓动动画有没有停止
            if (Math.abs(targetLeft - this.elementX) <= Math.abs(step)) {
                //处理小数赋值
                let x = targetLeft;
                this.setElementPosition(x, this.elementY);
                clearInterval(timer);
            }
        }, spd);
    }
    private adsorbent() {
        // 判断吸附方向
        // 屏幕中心点
        let screenCenterY = Math.round(this.screenWidth / 2);
        // left 最大值
        let rightScope = this.screenWidth - this.elementWidth;
        // 根据中心点来判断吸附方向
        this.elementX < screenCenterY ? this.animate(0, 10) : this.animate(rightScope, 10);
    }
}