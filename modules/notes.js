import {AModule} from './amodule.js'
import {locale} from '../locale/locale.js'
let allNotes = localStorage['kaiso-notes'] ? JSON.parse(localStorage['kaiso-notes']) : {}
let cases = Object.values(locale.notecases)

function addNote(name, text) {
    allNotes[name] = text
    saveNotes()
}

function deleteNote(id) {
    delete allNotes[Object.keys(allNotes)[id]]
    saveNotes()
}


function saveNotes() {
    localStorage['kaiso-notes'] = JSON.stringify(allNotes)
}

async function parseNumber(input, sys) {
    let number = input.match(/[0-9]+/)
    if (!number) {
        sys.Emotions.setFace(sys.Emotions.faces.looking_right)
        await sys.TTS.speak(locale.NOTFOUND)
        return false
    } else {
        number = parseInt(number)
        number -= 1
        if (number >= Object.keys(allNotes).length) {
            sys.Emotions.setFace(sys.Emotions.faces.looking_right)
            await sys.TTS.speak(locale.NOTFOUND)
            return false
        }
        return number
    }
}

export let notes = new AModule(cases, async (input, sys) => {
    let n = 0
    sys.Emotions.setFace(sys.Emotions.faces.thinking)
    switch (true) {
        case locale.notecases.create.test(input):
            await sys.TTS.speak(locale.ENTERTHENAME)
            sys.Emotions.setFace(sys.Emotions.faces.listening)
            let noteName = await sys.SR.recognize().catch(async e => await sys.TTS.speak(locale.ICANT))
            sys.Emotions.setFace(sys.Emotions.faces.thinking)
            if (!noteName || typeof noteName != 'string') break
            if (noteName in allNotes) {
                await sys.TTS.speak(locale.NAMEEXISTS)
                break
            }
            sys.Emotions.setFace(sys.Emotions.faces.listening)
            await sys.TTS.speak(locale.ENTERTHETEXT)
            let noteText = await sys.SR.recognize().catch(async e => await sys.TTS.speak(locale.ICANT))
            if (!noteText || typeof noteName != 'string') break
            addNote(noteName, noteText)
            sys.Emotions.setFace(sys.Emotions.faces.thinking)
            await sys.TTS.speak(locale.ADDED)
        break

        case locale.notecases.list.test(input):
            let noteList = Object.entries(allNotes)
            await sys.TTS.speak(locale.TOTALNOTES + noteList.length)
            for(let noteID in noteList) {
                await sys.TTS.speak((parseInt(noteID) + 1) + ". " + noteList[noteID][0])
            }
        break

        case locale.notecases.read.test(input):
            n = await parseNumber(input, sys)
            if (n === false) break
            await sys.TTS.speak(Object.values(allNotes)[n])
        break

        case locale.notecases.show.test(input):
            n = await parseNumber(input, sys)
            if (n === false) break
            sys.Modals.showModal(Object.values(allNotes)[n])
        break

        case locale.notecases.delete.test(input):
            n = await parseNumber(input, sys)
            if (n === false) break
            sys.Emotions.setFace(sys.Emotions.faces.shaman)
            await sys.TTS.speak(locale.DELETED)
            deleteNote(n)
        break
    }
    sys.Emotions.setFace(sys.Emotions.faces.regular)
})
