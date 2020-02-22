import {AModule} from './amodule.js'
import {locale} from '../locale/locale.js'
let cases = Object.values(locale.basiccases)
export let basicanswers = new AModule(cases, async (input, sys) => {
    switch (true) {
        case locale.basiccases.greeting.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.impressed)
            await sys.TTS.speak(locale.HELLO)
            sys.Emotions.setFace(sys.Emotions.faces.regular)
        break

        case locale.basiccases.howru.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.amazed)
            await sys.TTS.speak(locale.FINE)
            sys.Emotions.setFace(sys.Emotions.faces.regular)
        break

        case locale.basiccases.thankyou.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.amazed)
            await sys.TTS.speak(locale.THANKSBACK)
            sys.Emotions.setFace(sys.Emotions.faces.impressed)
        break

        case locale.basiccases.bye.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.crying)
            await sys.TTS.speak(locale.GOODBYE)
            sys.Emotions.setFace(sys.Emotions.faces.sleepy)
        break

        case locale.basiccases.whoareyou.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.surprised)
            await sys.TTS.speak(locale.WHOAMI)
            sys.Emotions.setFace(sys.Emotions.faces.thinking)
        break
    }
})
