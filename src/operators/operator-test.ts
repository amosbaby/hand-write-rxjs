import { interval } from "rxjs";
import { amInterval } from "./interval";
import { amTimer } from "./timer";

// const source$ = interval(1000)
// source$.subscribe(console.log)

// const interval$ = amInterval(1000)
// interval$.subscribe(console.log)


const timer$ = amTimer(1000)
timer$.subscribe(console.log)
