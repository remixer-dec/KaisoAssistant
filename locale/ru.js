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
    batcases: ['сколько зарядки','сколько зарядки осталось','зарядки ещё много','уровень заряда']
}
