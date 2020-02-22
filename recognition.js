import {config} from './config.js'
let globalRecognition = false
export function initialize(wordlist) {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var grammar = '#JSGF V1.0; grammar letters; public <letter> = ' + wordlist.join(' | ') + ' ;'

    var recognition = new SpeechRecognition()
    globalRecognition = recognition
    var speechRecognitionList = new SpeechGrammarList()

    speechRecognitionList.addFromString(grammar, 1)
    recognition.grammars = speechRecognitionList
    recognition.lang = config.lang.replace('_','-')
    recognition.interimResults = false
    recognition.maxAlternatives = 1
}

var isStarted = false
export async function recognize(words) {
    if(!isStarted){
        isStarted = true
        return new Promise((rs, rj) => {
            globalRecognition.start(words)
            globalRecognition.onnomatch = (e) => rj('no match')
            globalRecognition.onerror = (e) => rj(e.error)
            globalRecognition.onspeechend = () => globalRecognition.stop()
            globalRecognition.onend = () => isStarted = false
            globalRecognition.onresult = function(event) {
                let text = Array.from(event.results[0]).sort((a, b) => a.confidence < b.confidence ? 1 : -1)[0].transcript
                speechText.innerText = text
                rs(text)
            }
        })
    } else {
        return false
    }
}
