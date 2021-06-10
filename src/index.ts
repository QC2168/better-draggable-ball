import './index.scss';
import Drag from './Drag';

const dragDom = document.createElement('div');
dragDom.setAttribute('id', 'drag');
const body = document.getElementsByTagName('body')[0];
body.appendChild(dragDom);
const a = new Drag(dragDom, {
  defaultPosition: { x: 9, y: 9 },
  autoAdsorbent: true,
});
console.log(a);
