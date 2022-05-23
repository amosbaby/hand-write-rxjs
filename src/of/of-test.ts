import { of } from 'rxjs'
import { of as amOf } from './of'

export const observer = {
  next: (value: any) => console.log(value),
  error: (error: any) => console.error(error),
  complete: () => console.log('done')
}


const dataStream$ = of(1, 2, 3)

dataStream$.subscribe(observer)

const dataStream2$ = amOf(5, 6, 7)

dataStream2$.subscribe(observer)
