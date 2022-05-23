
import { AMObservable } from "../observable";

/**
 * 定时执行，返回一个数字
 * @param delay 
 * @returns 
 */

export function amInterval(duration: number) {
  return new AMObservable((observer: any) => {
    let index = 0
    setInterval(() => {
      observer.next(index++)
    }, duration);
  })
}
