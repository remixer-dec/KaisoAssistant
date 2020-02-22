import * as Emotions from './emotions.js'
import * as SR from './recognition.js'
import * as TTS from './synthesis.js'
import * as MM from './modules/modulemanager.js'
import * as Modals from './modal.js'
import {locale} from './locale/locale.js'
export let assistant = {
    init: function() {
        Emotions.setFace(Emotions.faces.regular)
        SR.initialize(['*'])
        charicon.ontouchend = () => {
            Emotions.setFace(Emotions.faces.surprised)
        }
        charicon.onclick = async () => {
            Emotions.setFace(Emotions.faces.listening)
            let text = await SR.recognize().catch(e => {speechText.innerText = e; Emotions.setFace(Emotions.faces.annoyed)})
            if (text) {
                speechText.innerText = text
                Emotions.setFace(Emotions.faces.serious)
                this.process(text.toLowerCase())
            }
        }
    },
    process: function(txt) {
        if (!MM.chackAll(txt, {SR:SR, TTS:TTS, Emotions:Emotions, Modals: Modals})) {
            TTS.speak(locale.IDK)
        }
    }
}
