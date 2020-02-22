import {default as Tools} from './tools.js'
export const faces = {
    regular: '-- _ --',
    scared: '⊙_⊙',
    surprised: '⌾_⌾',
    impressed: '⍟_⍟',
    notimpressed: 'ꆤ _ ꆤ',
    slightlysurprised: 'ꉺ _ ꉺ',
    wtf: '⓿_⓿',
    amazed: '◉⏑◉',
    fridgid: '● _ ●',
    looking_right: '⚈_⚈',
    thinking: '❍_❍',
    dead_inside: '⨷_⨷',
    gambler: 'Ⱉ_Ⱉ',
    listening: '⸎_⸎',
    serious: 'ㆆ_ㆆ',
    crying: 'ꀬ _ ꀬ',
    king: 'ꄃ _ ꄃ',
    annoyed: '> _ <',
    sleepy: '꒡_꒡',
    codegeass: '⎉_⎉',
    shaman: 'o꙲_o꙰'
}

export function setFace(face) {
    charicon.innerText = face
}

export function setRandomFace() {
    charicon.innerText = Tools.arrayRNG(Object.values(faces))
}

window.setRandomFace = setRandomFace
