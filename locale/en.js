export let en = {
    IDK: "I don't know",
    CURRENTTIME: "Current time is ",
    CHARGED: '%LVL% percent left.',
    timeLocalizer: function(unit, time){
        return time + ' ' + {h: 'hours', m: 'minutes', s:'seconds'}[unit] //TODO: make it less robotic
    },
    timecases: ['what time is it', 'what time is now', 'tell me the time', 'current time'],
    batcases: ['what is the battery level', 'how much charge is left', 'battery level'],
    ENTERTHENAME: 'Which title would you like to use?',
    NAMEEXISTS: 'An element with exact title already exists. Please try again.',
    ENTERTHETEXT: 'Done. What text would you like to add?',
    DELETED: 'Done. The index of other notes might have been changed',
    ICANT: 'I cannot understand you. Sorry.',
    TOTALNOTES: 'Notes: ',
    ADDED: 'Successfully added',
    NOTFOUND: 'I cant find an element with this index',
    notecases: {
        create: /((Please )?(add|create) a( new) note|new note)/i,
        list: /((Please )?(Read|Show|List) (me )?(all )?(of )?(the |my )?notes)/i,
        read: /((Please )?(Read|Voice) (a |the )?note (number )?[0-9]+)/i,
        show: /((Please )?(Show( me)?|Display) (a |the )?note (number )?[0-9]+)/i,
        delete: /((Please )?(Delete|Remove|Destroy|Get rid of) (a |the )?note (number )?[0-9]+)/i,
    },
    HELLO: 'Hello there',
    FINE: 'Im fine',
    THANKSBACK: 'No problem',
    GOODBYE: 'See you next time!',
    WHOAMI: 'I am a voice assistant with basic abilities, such as note management. I can also tell you the time. Some day I will be able to do a lot more!',
    basiccases: {
        greeting: /(Hello|Greetings|^Hi|Howdy)/i,
        howru: /How are you/i,
        thankyou: /Thank(s| you)/i,
        bye: /((Good )?bye|Later$)/i,
        whoareyou: /(Who|What)( the ....)? are you/i
    },
    ENTERTHEDATE: 'Tell me the date of this event',
    ENTERTHETIME: 'Tell me the time of this event',
    ENTERTHETEXT: 'What exactly can I remind you about?',
    REMINDERSET: 'Reminder set.',
    REMINDER: 'Assistant reminder',
    remindercases: {
        qanda: /(Remind me$|(Create|Add) (a reminder|an event))/i,
        allinone: /(Remind me)? (?<interval>in ?a?n? (minute|[0-9]+ minu(te|tes)|hour|[0-9]+ hour(s)?|day|[0-9]+ days?|week|[0-9]+ weeks?|month|[0-9]+ months?|year))?(?<date>today|tomorrow|the day after tomorrow|[A-z]{3,8} [0-9]+)?(?<time>( ?at )?([0-9]{1,2})?( |:)?([0-9]{1,2})?)(?<topic>.+)/i
    },
    dateParser(date) {
        if (typeof date == "object") return date
        let d = new Date()
        let relatives = /(yesterday|today|tomorrow|the day after tomorrow)/i
        let relarr = ['', 'yesterday', 'today', 'tomorrow', 'the day after tomorrow']
        let found = false
        if (relatives.test(date)) {
            d.setDate(d.getDate() + (relarr.indexOf(date.match(relatives)[1]) - 2))
            found = true
        }
        let months = ['january', 'feburary','march','april','may','june','july','august','september','october','november','december']
        let exact = new RegExp('([0-9]{1,2}) (' + months.join('|') + ')','i')
        let exactarr = months
        if (exact.test(date)) {
            d.setDate(parseInt(date.match(exact)[1]))
            d.setMonth(exactarr.indexOf(date.match(exact)[2]))
            found = true
        }
        let intervalic = /in ?a?n? ([0-9]+)? ?((?<day>days?)|(?<week>weeks?)|(?<month>moths?)|(?<year>years?))/i
        if (intervalic.test(date)) {
            let match = date.match(intervalic)
            let intervals = {year: 365, month: 30, week: 7, day: 1}
            let intervalunit = intervals[Object.entries(match.groups).filter(x => x[1] != undefined)[0][0]]
            let interval = match[1] ? parseInt(match[1]) : 1
            d.setDate(d.getDate() + interval * intervalunit)
            found = true
        }
        return found ? d : false
    },
    timeunits: /hour|minute/,
    timeParser(time, date){
        let exact = /a?t? ?(?<hours>[0-9]{1,2})( hours?)?( |:)?(?<minutes>[0-9]{1,2})?/i
        let intervalic = /in a?n? ?([0-9]+)? ?((?<minutes>minutes?)|(?<hours>hours?))/i
        if (exact.test(time)) {
            let match = time.match(exact)
            date.setHours(parseInt(match.groups.hours))
            date.setMinutes(match.groups.minutes ? match.groups.minutes : 0)
        } else if (intervalic.test(time)) {
            let amatch = time.match(intervalic)
            let intervals = {minutes: 1, hours: 60}
            let intervalunit = intervals[Object.entries(amatch.groups).filter(x=>x[1] != undefined)[0][0]]
            let interval = amatch[1] ? parseInt(amatch[1]) : 1
            date.setMinutes(date.getMinutes() + interval * intervalunit)
        } else {
            return date
        }
        return date
    }
}
