import { AMObservable } from "../observable";


/**
 * 根据数据源创建observable，可接受以下类型:
 * 1. 数组
 * 2. Promise
 * 
 * @param params 
 * @returns 
 */
export function amFrom(params: any) {
  if (Array.isArray(params)) {
    return new AMObservable((observer: any) => {
      params.forEach(param => observer.next(param))
      observer.complete()
    })
  }

  // TODO: 其他类型处理
  return new AMObservable((observer: any) => {
    Promise.resolve(params)
      .then((res: any) => {
        observer.next(res)
        observer.complete()
      }).catch((err: any) => {
        observer.error(err);
      })
  })
}
