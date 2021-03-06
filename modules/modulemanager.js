import {time} from './time.js'
import {battery} from './battery.js'
import {notes} from './notes.js'
import {basicanswers} from './basicanswers.js'
import {reminder} from './reminder.js'

let modules = [time, battery, notes, basicanswers,reminder]

export function chackAll(input, sys){
    let anwserfound = false
    for (let m of modules) {
        if (m.check(input, sys)){
            anwserfound = true
            break
        }
    }
    return anwserfound
}
