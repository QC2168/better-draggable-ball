class drag {
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
    // 是否处于拖动状态
    flag: boolean
    constructor(element: HTMLElement) {
        this.element = element;
        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;
        this.elementWidth = this.element.offsetWidth;
        this.elementHeight = this.element.offsetHeight;
        this.isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
        this.element.style.position = 'absolute';
        this.elementX = 0;
        this.elementY = 0;
        this.flag = false;
        this.watchTouch()

    }
    private watchTouch(): void {
        this.element.addEventListener('click',(e:any)=>{
        })
        this.element.addEventListener('touchstart',()=>{
            this.flag=true
        })
        window.addEventListener('touchend', (e)=>{
            this.flag=false
        })
        window.addEventListener('touchmove', this.move.bind(this))
    }

    private setElementPosition(x: number, y: number): void {
        // 溢出处理
        // 溢出范围
        let rightScope = this.screenWidth - this.elementWidth
        let bottomScope = this.screenHeight - this.elementHeight
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

        this.element.style.top = y + 'px'
        this.element.style.left = x + 'px'
    }
    private move(event: TouchEvent): void {
        if(!this.flag)return
        var rect = (event.target as any).getBoundingClientRect();        
        let offsetX =event.targetTouches[0].pageX - rect.left;
        let offsetY =event.targetTouches[0].pageY - rect.top;
        let x = this.elementX = event.touches[0].pageX-this.elementWidth/2
        let y = this.elementY = event.touches[0].pageY-this.elementHeight/2
        this.setElementPosition(x, y)
    }

}