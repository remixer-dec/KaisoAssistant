import {config} from './config.js'
var synth = window.speechSynthesis
var voices = []
//https://stackoverflow.com/questions/49506716
function tryToGetVoices() {
    voices = synth.getVoices()
    if (voices.length < 1) {
        setTimeout(tryToGetVoices,1500)
    }
}
setTimeout(tryToGetVoices,1500)

export function speak(text, options = {}) {
    let selectedVoice = voices.filter(v => v.lang == config.lang)[0]
    options = {pitch: 1, speed:1, voice: selectedVoice, ...options}
    return new Promise ((rs, rj) => {
        var utterThis = new SpeechSynthesisUtterance(text)
        utterThis.voice = options.voice
        utterThis.lang = utterThis.voice.lang
        utterThis.pitch = options.pitch
        utterThis.rate = options.speed
        synth.speak(utterThis)
        utterThis.onerror = () => rj(false)
        utterThis.onend = () => rs(true)
    })
}
