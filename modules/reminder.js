import {AModule} from './amodule.js'
import {locale} from '../locale/locale.js'
import {showNotification} from '../notifications.js'

let cases = Object.values(locale.remindercases)
export let reminder = new AModule(cases, async (input, sys) => {
    switch (true) {
        case locale.remindercases.qanda.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.fridgid)
            await sys.TTS.speak(locale.ENTERTHEDATE)
            sys.Emotions.setFace(sys.Emotions.faces.listening)
            let date = await sys.SR.recognize().catch(async e => await sys.TTS.speak(locale.ICANT))
            sys.Emotions.setFace(sys.Emotions.faces.fridgid)
            if (!date) return
            await sys.TTS.speak(locale.ENTERTHETIME)
            sys.Emotions.setFace(sys.Emotions.faces.listening)
            let time = await sys.SR.recognize().catch(async e => await sys.TTS.speak(locale.ICANT))
            sys.Emotions.setFace(sys.Emotions.faces.fridgid)
            if (!time) return
            await sys.TTS.speak(locale.ENTERTHETEXT)
            sys.Emotions.setFace(sys.Emotions.faces.listening)
            let text = await sys.SR.recognize().catch(async e => await sys.TTS.speak(locale.ICANT))
            sys.Emotions.setFace(sys.Emotions.faces.fridgid)
            if (!text) return
            parseEventDetails(date,time,text,sys)
        break

        case locale.remindercases.allinone.test(input):
            sys.Emotions.setFace(sys.Emotions.faces.fridgid)
            parseRegexData(input.match(locale.remindercases.allinone).groups,sys)
        break
    }
})

function parseRegexData(groups, sys){
    if (groups.interval){
        if (groups.interval.match(locale.timeunits)) {
            parseEventDetails(new Date(), groups.interval, groups.topic, sys)
        } else {
            parseEventDetails(groups.interval, groups.time ? groups.time.trim() || '' : '', groups.topic, sys)
        }
    } else {
        return parseEventDetails(groups.date || new Date(), groups.time ? groups.time.trim() || '' : '', groups.topic, sys)
    }
}

function parseEventDetails(date, time, text, sys) {
    text = text.trim()
    let thedate = locale.dateParser(date)
    let thetime = false
    if (thedate) thetime = locale.timeParser(time,thedate)
    if (!thedate) {
        sys.TTS.speak(locale.ICANT)
        //TODO: show modal with details
        return
    } else {
        sys.TTS.speak(locale.REMINDERSET)
        showNotification(locale.REMINDER, text, thetime)
    }
}
