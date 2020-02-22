import {assistant} from './assistant.js'
assistant.init()
if('serviceWorker'in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        if(!navigator.serviceWorker.controller) {
            return;
        }
    })
}
