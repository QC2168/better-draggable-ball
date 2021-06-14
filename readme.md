## better-draggable-ball

### 这是一款使用纯TYPESCRIPT开发的可拖拽悬浮球，这意味着它不需要安装其他依赖即可直接导入到你的开发项目当中使用



#### 最简单的使用方法

第一步，您需要在您的项目中安装它，执行以下命令

```typescript
npm install better-draggable-ball --save
```

在您的项目中导入`BetterGraggbleBall`

```typescript
import BDrag from 'better-draggable-ball';
```

创建一个div，并给他设置一个ID值和样式

```html
<div class="root">
    <div class="BDrag"></div>
</div>
```

```css
.drag{
    width: 50px;
    height: 50px;
    background-color: rgb(238, 238, 238);
    border-radius: 50%;
    border: 5px solid rgb(170, 170, 170);
}
```

`BetterGraggbleBall`提供了一个类，实例化的第一个参数是一个原生DOM元素

```javascript
const BDragDom = document.getElementById('BDrag')
const BDrag = new BDrag(BDragDom)
```

