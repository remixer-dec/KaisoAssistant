export function showModal(html){
    let w = document.createElement('div')
    w.className = "modal"
    w.onclick = () => w.remove()
    w.innerHTML = html
    modals.innerHTML = ''
    modals.appendChild(w)
}
