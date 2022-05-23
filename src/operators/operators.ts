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


/**
 * 指定observable可以调用几次
 * @param count 可执行次数
 * @returns 
 */
export function am_take(count: number) {
  return (observable: any) => {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = observable.subscribe({
        // 将原有observable的三个方法处理转移到新observable的观察者上
        next: (value: any) => {
          if (count--) {
            observer.next(value)
          } else {
            observer.complete()
            unsubscribeObj.unsubscribe()
          }
        },
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


/**
 * 执行副作用函数
 * @param fn 副作用函数
 * @returns 
 */
export function am_tap(fn: Function) {
  return (observable: any) => {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = observable.subscribe({
        // 将原有observable的三个方法处理转移到新observable的观察者上
        next: (value: any) => {
          // 执行副作用函数
          fn(value)
          observer.next(value)
        },
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      })
      // 移除监听
      return {
        // 需要调用源observable的取消订阅，预防像interval、timer等异步处理
        unsubscribe: () => { unsubscribeObj?.unsubscribe() }
      }
    })
  }
}
/**
 * 将多个observable 合并成一个
 * @param fn 副作用函数
 * @returns 
 */
export function am_merge(...observables: any) {
  return (observable: any) => {
    // 如果是由pipe发起的，需要将当前observable加入进来
    if (observable) {
      observables = [observable, ...observables]
    }

    return new AMObservable((observer: any) => {
      let completeCount = 0
      const unsubscribeObjs: any[] = []
      observables.forEach((ob: any) => {
        const unsubscribeObj = ob.subscribe({
          // 将原有observable的三个方法处理转移到新observable的观察者上
          next: (value: any) => {
            observer.next(value)
          },
          error: (err: any) => observer.error(err),
          complete: () => {
            completeCount++
            // 所有的observable执行完后，结束当前observer
            if (completeCount === observables.length) {
              observer.complete()
              unsubscribeObjs.forEach((destroyObj: any) => destroyObj.unsubscribe())
            }
          }
        })
        unsubscribeObjs.push(unsubscribeObj)
        // 移除监听
        return {
          // 需要调用源observable的取消订阅，预防像interval、timer等异步处理
          unsubscribe: () => { unsubscribeObj.unsubscribe() }
        }
      })
    })
  }
}
