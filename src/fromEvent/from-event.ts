import { AMObservable } from './../observable';

/**
 * 根据元素的事件生成一个observable
 * @param element 目标元素
 * @param event 需要监听的事件名称
 * @returns 
 */
export function amFromEvent(element: any, eventName: string) {
  return new AMObservable((observer: any) => {
    const handler = (e: any) => observer.next(e)
    element.addEventListener(eventName, handler)
    // 移除监听
    return {
      unsubscribe: () => element.removeEventListener(eventName, handler)
    }
  })
}
