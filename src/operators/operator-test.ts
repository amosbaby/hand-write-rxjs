import { from, interval } from "rxjs";
import { amFrom } from "./from";
import { amInterval } from "./interval";
import { am_filter, am_map } from "./operators";
import { amTimer } from "./timer";

const source$ = interval(1000)
// source$.subscribe(console.log)

// const interval$ = amInterval(1000).filter((value: any) => value > 2).map((value: any) => value + 1000)
const interval$ = amInterval(1000).pipe(am_filter((value: any) => value > 2)).pipe(am_map((value: any) => value + 1000))
const subscribe = interval$.subscribe(console.log)

setTimeout(() => {
  subscribe.unsubscribe()
}, 10000);


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
