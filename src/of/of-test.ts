// import { of } from 'rxjs'
import { of as amOf } from './of'

export const observer = {
  next: (value: any) => console.log(value),
  error: (error: any) => console.error(error),
  complete: () => console.log('done')
}


// const dataStream$ = of(1, 2, 3)

// dataStream$.subscribe(observer)

// 测试手写实现的of
// const dataStream2$ = amOf(5, 6, 7)

// dataStream2$.subscribe(observer)

// 测试subscribe传入一个函数
const dataStream3$ = amOf(7, 8, 7)

dataStream3$.subscribe(console.log)
