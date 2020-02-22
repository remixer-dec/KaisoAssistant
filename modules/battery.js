import {AModule} from './amodule.js'
import {locale} from '../locale/locale.js'
let cases = locale.batcases
export let battery = new AModule(cases, async (input, sys) => {
    sys.Emotions.setFace(sys.Emotions.faces.slightlysurprised)
    let level = parseInt((await navigator.getBattery()).level * 100)
    await sys.TTS.speak(locale.CHARGED.replace('%LVL%', level))
    sys.Emotions.setFace(sys.Emotions.faces.regular)
})
