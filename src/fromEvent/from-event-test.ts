import { fromEvent } from "rxjs";
import { JSDOM } from 'jsdom' // 用于在node端做一些dom相关操作
import { amFromEvent } from "./from-event";

const element = new JSDOM(`<div>Hello world</div>`).window.document.querySelector('div');

const source$ = fromEvent(element!, 'click')

source$.subscribe(console.log)

const source2$ = amFromEvent(element!, 'click')

source2$.subscribe(console.log)


setTimeout(() => {
  element?.click()
}, 1000);
