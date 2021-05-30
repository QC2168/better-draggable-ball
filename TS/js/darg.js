"use strict";
var drag = /** @class */ (function () {
    function drag(element) {
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
        this.watchTouch();
    }
    drag.prototype.watchTouch = function () {
        var _this = this;
        this.element.addEventListener('click', function (e) {
        });
        this.element.addEventListener('touchstart', function () {
            _this.flag = true;
        });
        window.addEventListener('touchend', function (e) {
            _this.flag = false;
        });
        window.addEventListener('touchmove', this.move.bind(this));
    };
    drag.prototype.setElementPosition = function (x, y) {
        var _a, _b, _c, _d;
        // 溢出处理
        // 溢出范围
        var rightScope = this.screenWidth - this.elementWidth;
        var bottomScope = this.screenHeight - this.elementHeight;
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
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
    };
    drag.prototype.move = function (event) {
        if (!this.flag)
            return;
        var rect = event.target.getBoundingClientRect();
        var offsetX = event.targetTouches[0].pageX - rect.left;
        var offsetY = event.targetTouches[0].pageY - rect.top;
        var x = this.elementX = event.touches[0].pageX - this.elementWidth / 2;
        var y = this.elementY = event.touches[0].pageY - this.elementHeight / 2;
        this.setElementPosition(x, y);
    };
    return drag;
}());
