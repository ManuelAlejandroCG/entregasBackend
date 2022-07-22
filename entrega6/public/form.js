let username = sessionStorage.getItem('username')
if (username == null) {
    username = prompt('Insert username')
    sessionStorage.setItem('username', username)
}

document.getElementById('username').innerHTML = `Welcome ${username}`
const socket = io()
loadFirstData()
loadFirstItems()

const btnSend = document.getElementById('send')
btnSend.onclick = e => {
    e.preventDefault()
    const msj = document.getElementById('msj').value
    const email = document.getElementById('email').value
    if (email == '') {
        alert('Email field is required to use chat')
    } else {
        socket.emit('chat-in', {
            msj,
            email,
            username
        })
        document.getElementById('msj').value = ''
    }
}

socket.on('chat-out', data => {
    addDataToDiv(data)
})


const btnNew = document.getElementById('new')
btnNew.onclick = e => {
    e.preventDefault()
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const url = document.getElementById('url').value
    if (nombre == '') {
        alert('Name field is required')
    } else {
        if (precio == '') {
            alert('Price field is required')
        } else {
            if (url == '') {
                alert('URL field is required')
            } else {
                socket.emit('newItem-in', {
                    nombre,
                    precio,
                    url
                })
                document.getElementById('nombre').value = ''
                document.getElementById('precio').value = ''
                document.getElementById('url').value = ''
            }
        }
    }
}

socket.on('newItem-out', data => {
    addDataToItems(data)
})

function addDataToDiv(data) {
    const div = document.getElementById('chatBox')
    div.innerHTML += `<br><b style="color:blue">${data.email}</b>[${data.date}]: <i style="color:green">${data.msj}</i>`
}

function loadDataToDiv(data) {
    data.forEach(d => addDataToDiv(d))
}

function loadFirstData() {
    fetch('/data')
        .then(data => data.json())
        .then(d => loadDataToDiv(d.data))
        .catch(e => alert(e))
}

function addDataToItems(data) {
    console.log(data)
    const table = document.getElementById('tabla1')
    var row = table.insertRow(-1);
    var id = row.insertCell(0);
    var nombre = row.insertCell(1);
    var precio = row.insertCell(2);
    var url = row.insertCell(3);
    id.innerHTML = data.id;
    nombre.innerHTML = data.nombre;
    precio.innerHTML = data.precio;
    url.innerHTML = '<img src="' + data.url + '" style=" height:"50"; width="50"></img>';

}

function loadDataToItems(data) {
    console.log('llego')
    console.log(data)
    data.forEach(d => addDataToItems(d))
}

function loadFirstItems() {
    fetch('/dataItems')
        .then(data => data.json())
        .then(d => loadDataToItems(d.data))
        .catch(e => alert(e))
}