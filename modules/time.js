import {AModule} from './amodule.js'
import {locale} from '../locale/locale.js'
let cases = locale.timecases
export let time = new AModule(cases, async (input, sys) => {
    sys.Emotions.setFace(sys.Emotions.faces.sleepy)
    await sys.TTS.speak(locale.CURRENTTIME + new Date().toLocaleTimeString('ru').split(':').map((x,i) => locale.timeLocalizer(['h','m','s'][i], x)).join(', '))
    sys.Emotions.setFace(sys.Emotions.faces.regular)
})
