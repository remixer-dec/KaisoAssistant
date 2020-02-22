export let en = {
    IDK: "I don't know",
    CURRENTTIME: "Current time is ",
    CHARGED: '%LVL% percent left.',
    timeLocalizer: function(unit, time){
        return time + ' ' + {h: 'hours', m: 'minutes', s:'seconds'}[unit] //TODO: make it less robotic
    },
    timecases: ['what time is it', 'what time is now', 'tell me the time', 'current time'],
    batcases: ['what is the battery level', 'how much charge is left', 'battery level']
}
