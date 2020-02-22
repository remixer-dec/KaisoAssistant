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
    }
}
