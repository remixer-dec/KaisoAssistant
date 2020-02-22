export let ru = {
    IDK: "Не знаю.",
    CURRENTTIME: 'Текущее время: ',
    CHARGED: 'Осталось %LVL% процентов.',
    timeLocalizer: function(unit, time) {
        let t = []
        switch(time % 10) {
            case 0:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 5:
                t = ['часов','минут','секунд']
            break

            case 1:
                t = ['час', 'минута', 'секунда']
            break

            case 2:
            case 3:
            case 4:
                t = ['часа','минуты','секунды']
            break
        }
        if (Math.floor(time / 10) == 1) {
            t = ['часов','минут','секунд']
        }
        let units = {h: 0, m: 1, s: 2}
        return time + ' ' + t[units[unit]]
    },
    timecases: ['который час','сколько времени','сколько время'],
    batcases: ['сколько зарядки','сколько зарядки осталось','зарядки ещё много','уровень заряда'],
    ENTERTHENAME: 'Какое название добавить?',
    NAMEEXISTS: 'Элемент с таким названием уже существует. Попробуйте ещё раз.',
    ENTERTHETEXT: 'Готово. Какой текст добавить?',
    DELETED: 'Успешно удалено, номера других заметок могли измениться.',
    ICANT: 'Я не могу понять речь. Простите.',
    TOTALNOTES: 'Всего заметок: ',
    ADDED: 'Успешно добавлено',
    NOTFOUND: 'Не могу найти элемент с этим номером.',
    notecases: {
        create: /((Добавь|Создай)( новую?) заметку|Запиши текст|Новая заметка|Слушай сюда)/i,
        list: /(Прочитай (все )?заметки|Мои заметки|Заметки|Что в заметках)/i,
        read: /((Прочитай|Расскажи|Зачитай|Поведай) заметку (номер )?[0-9]+)/i,
        show: /((Покажи|Выведи) (текст )?заметк(у|и) (номер )?[0-9]+)/i,
        delete: /((Удали|Сотри|Уничтожь|Выпили) заметку (номер )?[0-9]+)/i
    },
    HELLO: 'Привет',
    FINE: 'Отлично',
    THANKSBACK: 'Не за что',
    GOODBYE: 'До скорых встреч!',
    WHOAMI: 'Я - голосовой ассистент с базовым функционалом, умею управлять заметками и могу рассказать текущее время и уровень заряда. Когда-нибудь я научусь делать нечто большее.',
    basiccases: {
        greeting: /(Привет|Здравствуй|Зд(о|а)рова)/i,
        howru: /Как (у тебя )?(дела|ты|жизнь)/i,
        thankyou: /(Спасибо|Благодарю)/i,
        bye: /(Пока$|Прощай|До свидания)/i,
        whoareyou: /(Ты (кто|что)|(кто|что) ты)/i
    },
    ENTERTHEDATE: 'Когда назначить событие?',
    ENTERTHETIME: 'Во сколько часов напомнить?',
    ENTERTHETEXT: 'О чём напомнить?',
    REMINDERSET: 'Напоминание установлено',
    REMINDER: 'Напоминание ассистента',
    remindercases: {
        qanda: /(Напомни мне$|(Создай|Добавь) (событие|напомина(ние|лку)))/i,
        allinone: /(Напомни|Создай напоминание)( мне)? (?<interval>через (минуту|[0-9]+ мину(т|ты|ту)|час|[0-9]+ час(а|ов)|день|[0-9]+ (день|дн(я|ей))|неделю|[0-9]+ недел(и|ь)|месяц|[0-9]+ месяц(ев|а)|год))?(?<date>сегодня|завтра|послезавтра|[0-9]+ [а-я]{3,8})?(?<time>( ?в )?([0-9]{1,2})?( |:)?([0-9]{1,2})?)(?<topic>.+)/i
    },
    dateParser(date) {
        if (typeof date == "object") return date
        let d = new Date()
        let relatives = /((после)?завтра|сегодня|(поза)?вчера)/i
        let relarr = ['позавчера', 'вчера', 'сегодня', 'завтра', 'послезавтра']
        let found = false
        if (relatives.test(date)) {
            d.setDate(d.getDate() + (relarr.indexOf(date.match(relatives)[1]) - 2))
            found = true
        }
        let exact = /([0-9]{1,2}) (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)/i
        let exactarr = 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря'.split('|')
        if (exact.test(date)) {
            d.setDate(parseInt(date.match(exact)[1]))
            d.setMonth(exactarr.indexOf(date.match(exact)[2]))
            found = true
        }
        let intervalic = /через ([0-9]+)? ?((?<day>дн(я|ей)|день)|(?<week>недел(ю|и|ь))|(?<month>меся(ц|цев|ца))|(?<year>(год|лет)))/i
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
    timeunits: /час|минут/,
    timeParser(time, date){
        let exact = /в? ?(?<hours>[0-9]{1,2})( часов)?( |:)?(?<minutes>[0-9]{1,2})?/i
        let intervalic = /через ([0-9]+)? ?((?<minutes>мину(т|ты|ту))|(?<hours>ча(с|са|сов)))/i
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
