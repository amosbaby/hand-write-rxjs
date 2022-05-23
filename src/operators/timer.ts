
import { AMObservable } from "../observable";

/**
 * 延时执行，返回0
 * @param delay 
 * @returns 
 */

export function amTimer(delay: number) {
  return new AMObservable((observer: any) => {
    let index = 0
    setTimeout(() => {
      observer.next(0)
    }, delay);
  })
}
