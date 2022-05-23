
import { AMObservable } from "../observable";

/**
 * 定时执行，返回一个数字
 * @param delay 
 * @returns 
 */

export function am_interval(duration: number) {
  return new AMObservable((observer: any) => {
    let index = 0
    const intervalTag = setInterval(() => {
      observer.next(index++)
    }, duration);
    // 移除监听
    return {
      unsubscribe: () => { clearInterval(intervalTag) }
    }
  })
}
