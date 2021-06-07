import './index.scss'
import Drag from './Drag'
let dragDom=document.createElement('div')
dragDom.setAttribute('id','drag')
let body=document.getElementsByTagName('body')[0]
body.appendChild(dragDom)
new Drag(dragDom,true)