import {config} from '../config.js'
import {ru} from './ru.js'
import {en} from './en.js'
let locales = {ru: ru, en: en}
export let locale = locales[config.lang.split('_')[0]] || locales['en']
