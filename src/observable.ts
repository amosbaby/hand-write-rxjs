
/**
 * Observable手写实现
 */
export class AMObservable<T> {
  private _subscribe: any

  /**
   * 接收一个订阅方法，它有一个observer参数，是在订阅的时候才传进来
   * @param subscribe 
   */
  constructor(subscribe: any) {
    this._subscribe = subscribe
  }

  /**
   * 接收一个观察者对象
   * @param observer 它有三个方法：
   * 1. next
   * 2. error
   * 3. complete
   */
  subscribe(observer: any) {
    const defaultObserver = {
      next: (value: any) => { },
      error: (err: any) => { },
      complete: () => { },
    }
    if (typeof observer === 'function') {
      // 如果传入的是一个方法，则将next替换成observer
      return this._subscribe({ ...defaultObserver, next: observer })
    } else {
      return this._subscribe({ ...defaultObserver, ...observer })
    }
  }

  /**
   * 通过operator将observable转化，并将结果返回
   * 可以接收多个参数，后一个operator接收前一个的结果作为参数
   * @param operator 
   * @returns 
   */
  pipe(...operators: any) {
    return operators.reduce((prev: any, fn: any) => fn(prev), this)
  }

  /**
   * 转化输出
   * @param fn 
   * @returns 
   */
  map(fn: Function) {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = this.subscribe({
        // 将原有observable的三个方法处理转移到新observable的观察者上
        next: (value: any) => observer.next(fn(value)),
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

  /**
   * 过滤observable输出
   * @param fn 过滤函数，为true则发送，否则不发送
   * @returns 
   */
  filter(fn: Function) {
    return new AMObservable((observer: any) => {
      const unsubscribeObj = this.subscribe({
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

export interface AmObserver<T> {
  next: (value: T) => void,
  error: (err: any) => void,
  complete: () => void
}

export interface AmSubscriber<T> extends AmObserver<T> {
}
