document.addEventListener("DOMContentLoaded", init);
const URL_API = 'http://localhost:7030/api/'

var customers = []

function init() {
  search()
}


function agregar() {
  clean()
  abrirFormulario()
}

function abrirFormulario() {
  htmlModal = document.getElementById("modal");
  htmlModal.setAttribute("class", "modale opened");
}

function cerrarModal() {
  htmlModal = document.getElementById("modal");
  htmlModal.setAttribute("class", "modale");
}


async function search() {
  var url = URL_API + 'customers'
  var response = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  customers = await response.json();

  var html = ''
  for (customer of customers) {
    var row = `<tr>
    <td>${customer.firstname}</td>
    <td>${customer.lastname}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>
      <a href="#" onclick="edit(${customer.id})" class="myButton">Editar</a>
      <a href="#" onclick="remove(${customer.id})" class="btnDelete">Eliminar</a>
    </td>
  </tr>`
    html = html + row;
  }
  document.querySelector('#customers > tbody').outerHTML = html
}

async function remove(id) {
  respuesta = confirm('¿Está seguro de eliminarlo?')
  if (respuesta) {
    var url = URL_API + 'customers/' + id
    await fetch(url, {
      "method": 'DELETE',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
    window.location.reload();
  }
}

function clean() {
  document.getElementById('txtId').value = ''
  document.getElementById('txtFirstname').value = ''
  document.getElementById('txtLastname').value = ''
  document.getElementById('txtPhone').value = ''
  document.getElementById('txtAddress').value = ''
  document.getElementById('txtEmail').value = ''
}

async function save() {
  var data = {
    "address": document.getElementById('txtAddress').value,
    "email": document.getElementById('txtEmail').value,
    "firstname": document.getElementById('txtFirstname').value,
    "lastname": document.getElementById('txtLastname').value,
    "phone": document.getElementById('txtPhone').value
  }

  var id = document.getElementById('txtId').value
  if (id != '') {
    data.id = id
  }

  var url = URL_API + 'customers'
  await fetch(url, {
    "method": id != '' ? 'PUT' : 'POST',
    "body": JSON.stringify(data),
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  window.location.reload();
}

/*function search(){
  var resultado = [
    {
      "id": 123,
      "adress" : "San Roque 4312",
      "email": "agustina@gmail.com",
      "firstname": "Agustina",
      "lastname": "Herrera",
      "phone": "385642184"
    },
    {
      "id": 123,
      "adress" : "San Roque 4312",
      "email": "agustina@gmail.com",
      "firstname": "Damian",
      "lastname": "Vallejos",
      "phone": "354654"
    },
    {
      "id": 123,
      "adress" : "San Roque 4312",
      "email": "agustina@gmail.com",
      "firstname": "Luis",
      "lastname": "Pinto",
      "phone": "385351"
    }

  ]
}
*/
