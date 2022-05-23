import { AMObservable } from "../observable"

/**
   * 转化输出
   * example: amInterval(1000).am_map((value: any) => value * 2)，所有值乘以2
   * @param fn 转化函数
   * @returns 
   */
export function am_map(fn: Function) {
  return (observable: any) => {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = observable.subscribe({
        // 将原有observable的三个方法处理转移到新observable的观察者上
        next: (value: any) => observer.next(fn(value)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      })
      // 移除监听
      return {
        unsubscribe: () => {
          // 需要调用源observable的取消订阅，预防像interval、timer等异步处理
          unsubscribeObj.unsubscribe()
        }
      }
    })
  }
}

/**
 * 过滤observable输出
 * example: amInterval(1000).am_filter((value: any) => value > 2),输出value大于2的值
 * @param fn 过滤函数，为true则发送，否则不发送
 * @returns 
 */
export function am_filter(fn: Function) {
  return (observable: any) => {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = observable.subscribe({
        // 将原有observable的三个方法处理转移到新observable的观察者上
        next: (value: any) => fn(value) ? observer.next(value) : () => { },
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      })
      // 移除监听
      return {
        // 需要调用源observable的取消订阅，预防像interval、timer等异步处理
        unsubscribe: () => { unsubscribeObj.unsubscribe() }
      }
    })
  }
}
