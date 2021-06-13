import './index.scss';
import Drag from './Drag';

const dragDom = document.createElement('div');
dragDom.setAttribute('id', 'drag');
const body = document.getElementsByTagName('body')[0];
body.appendChild(dragDom);
new Drag(dragDom, {
  defaultPosition: { x: 10, y: 10 },
  autoAdsorbent: true,
});
