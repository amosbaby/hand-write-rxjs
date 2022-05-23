import { from, interval } from "rxjs";
import { amFrom } from "./from";
import { amInterval } from "./interval";
import { am_filter, am_map, am_merge, am_take, am_tap } from "./operators";
import { amTimer } from "./timer";

const source$ = interval(1000)
// source$.subscribe(console.log)

// const interval$ = amInterval(1000).filter((value: any) => value > 2).map((value: any) => value + 1000)
// 一个参数
// const interval$ = amInterval(1000).pipe(am_filter((value: any) => value > 2)).pipe(am_map((value: any) => value + 1000))
// 多个参数
const interval$ = amInterval(1000)
  .pipe(
    am_filter((value: any) => value > 2),
    am_map((value: any) => value + 1000),
    am_take(2),
    am_merge(amFrom(['amos', 'allen'])),
    am_tap((value: any) => { console.log('tap:', value) })
  )
const subscribe = interval$.subscribe(console.log)

setTimeout(() => {
  subscribe.unsubscribe()
}, 5500);


// const timer$ = amTimer(1000)
// timer$.subscribe(console.log)
// const dataPromise = new Promise(resolve => {
//   setTimeout(() => {
//     resolve('Promise done')
//   }, 1000);
// })

// const fromArray$ = from([1, 2, 3])
// const fromPromise$ = from(dataPromise)

// fromArray$.subscribe(console.log)
// fromPromise$.subscribe(console.log)


// const fromArray$ = amFrom([1, 2, 3])
// const fromPromise$ = amFrom(dataPromise)

// fromArray$.subscribe(console.log)
// fromPromise$.subscribe(console.log)
