export async function showNotification(title, text, date) {
    const swReg = await navigator.serviceWorker.getRegistration()
    Notification.requestPermission(function(result) {
        if (result === 'granted') {
            swReg.showNotification(title, {
                tag: date.getTime(),
                body: text,
                showTrigger: new TimestampTrigger(date.getTime())
            });
        }
    })
}
