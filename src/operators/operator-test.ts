import { interval } from "rxjs";
import { amInterval } from "./interval";

// const source$ = interval(1000)
// source$.subscribe(console.log)

const interval$ = amInterval(1000)
interval$.subscribe(console.log)
