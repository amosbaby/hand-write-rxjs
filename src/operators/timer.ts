
import { AMObservable } from "../observable";

/**
 * 延时执行，返回0
 * @param delay 
 * @returns 
 */

export function am_timer(delay: number) {
  return new AMObservable((observer: any) => {
    let index = 0
    const timerTag = setTimeout(() => {
      observer.next(0)
    }, delay);

    // 移除监听
    return {
      unsubscribe: () => { clearInterval(timerTag) }
    }
  })
}
