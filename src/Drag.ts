// import Options from './Options';
interface DefaultPositionType {
  x?: number,
  y?: number
}
interface Options {
  autoAdsorbent?: boolean;

  hideOffset?: number;

  defaultPosition?: DefaultPositionType;
}

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
  moving: boolean;

  // 吸附
  autoAdsorbent: boolean;

  // 隐藏
  hideOffset: number;

  constructor(element: HTMLElement, dConfig: Options = {}) {
    dConfig = this.InitParams(dConfig);
    this.element = element;
    this.screenWidth = document.body.scrollWidth || window.screen.width || 0;
    this.screenHeight = document.body.scrollHeight || window.screen.height || 0;
    this.elementWidth = this.element.offsetWidth || 0;
    this.elementHeight = this.element.offsetHeight || 0;
    this.isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    this.element.style.position = 'absolute';
    this.elementX = 0;
    this.elementY = 0;
    this.elementOffsetX = 0;
    this.elementOffsetY = 0;
    this.moving = false;
    this.autoAdsorbent = dConfig.autoAdsorbent;
    this.hideOffset = this.elementWidth * dConfig.hideOffset;
    if (!this.isPhone) {
      console.error('警告！！当前插件版本只兼容移动端');
    }
    // 默认位置
    this.setElementPosition(dConfig.defaultPosition.x, dConfig.defaultPosition.y);
    this.watchTouch();
    console.log(this);
  }

  protected InitParams(dConfig: Options):Options {
    // 处理下Options未配置的参数
    return {
      autoAdsorbent: dConfig.autoAdsorbent && false,
      hideOffset: dConfig.hideOffset && 0,
      defaultPosition: dConfig.defaultPosition && { x: 0, y: 0 },
    };
  }

  private watchTouch(): void {
    this.element.addEventListener('touchstart', (event: TouchEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      // 页面被卷去的高度
      // 不兼容IE
      const docScrollTop = document.documentElement.scrollTop;
      this.elementOffsetX = event.targetTouches[0].pageX - rect.left;
      this.elementOffsetY = event.targetTouches[0].pageY - rect.top - docScrollTop;
      this.moving = true;
      this.element.addEventListener('touchmove', this.move.bind(this), { passive: false });
    });
    window.addEventListener('touchend', () => {
      this.moving = false;
      document.removeEventListener('touchmove', this.move);
      if (this.autoAdsorbent) this.adsorbent();
    });
  }

  private setElementPosition(x: number, y: number): void {
    // 溢出处理
    // 溢出范围
    // 但页面超出屏幕范围，计算当前屏幕范围

    const leftScope = this.moving ? 0 : 0 - this.hideOffset;
    // 当前屏幕right最大值
    const rs = this.screenWidth - this.elementWidth;
    const rightScope = this.moving ? rs : rs + this.hideOffset;
    const bottomScope = this.screenHeight - this.elementHeight;
    if (x <= leftScope && y <= 0) {
      [x, y] = [leftScope, 0];
    } else if (x >= rightScope && y <= 0) {
      [x, y] = [rightScope, 0];
    } else if (x <= leftScope && y >= bottomScope) {
      [x, y] = [leftScope, bottomScope];
    } else if (x >= rightScope && y >= bottomScope) {
      [x, y] = [rightScope, bottomScope];
    } else if (x > rightScope) {
      x = rightScope;
    } else if (y > bottomScope) {
      y = bottomScope;
    } else if (x <= leftScope) {
      x = leftScope;
    } else if (y <= 0) {
      y = 0;
    }
    this.elementX = x;
    this.elementY = y;
    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;
  }

  private move(event: TouchEvent): void {
    event.preventDefault();
    if (!this.moving) return;
    this.elementY = (event.touches[0].pageX - this.elementOffsetX);
    this.elementX = (event.touches[0].pageY - this.elementOffsetY);
    const ex = (event.touches[0].pageX - this.elementOffsetX);
    const ey = (event.touches[0].pageY - this.elementOffsetY);
    this.setElementPosition(ex, ey);
  }

  private animate(targetLeft: number, spd: number): void {
    const timer = setInterval(() => {
      let step = (targetLeft - this.elementX) / 10;
      // 对步长进行二次加工(大于0向上取整,小于0向下取整)
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      // 动画原理： 目标位置 = 当前位置 + 步长
      const x = this.elementX + step;
      this.setElementPosition(x, this.elementY);
      // 检测缓动动画有没有停止
      if (Math.abs(targetLeft - this.elementX) <= Math.abs(step)) {
        // 处理小数赋值
        const xt = targetLeft;
        this.setElementPosition(xt, this.elementY);
        clearInterval(timer);
      }
    }, spd);
  }

  private adsorbent() {
    // 判断吸附方向
    // 屏幕中心点
    const screenCenterY = Math.round(this.screenWidth / 2);
    // left 最大值
    const rightScope = this.screenWidth - this.elementWidth;
    // 根据中心点来判断吸附方向
    if (this.elementX < screenCenterY) {
      this.animate(0 - (this.hideOffset), 10);
    } else {
      this.animate(rightScope + (this.hideOffset), 10);
    }
  }
}
