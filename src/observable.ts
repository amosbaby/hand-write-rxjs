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
      this._subscribe({ ...defaultObserver, next: observer })
    } else {

      this._subscribe({ ...defaultObserver, ...observer })
    }
  }
}

export interface AmObserver<T> {
  next: (value: T) => void,
  error: (err: any) => void,
  complete: () => void
}

export interface AmSubscriber<T> extends AmObserver<T> {
}
