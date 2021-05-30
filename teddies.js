let id = new URL(window.location.href).searchParams.get('id')
console.log(id)

fetch('http://localhost:3000/api/teddies/'+ id)
    .then(response => {
        return response.json()
    }).then(data =>{
            document.getElementById('title').innerHTML = data.name
            document.getElementById('name').innerHTML = data.name
    }).then( ()=>{
        main.appendChild(section)
    })