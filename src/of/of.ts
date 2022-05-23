import { AMObservable, AmObserver } from './../observable';
export function of<T>(...args: T[]) {
  return new AMObservable((observer: AmObserver<any>) => {
    args.forEach(arg => observer.next(arg))
    observer.complete()
  })
}
