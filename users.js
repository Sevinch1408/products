"use strict";


let baseURL = "https://api.escuelajs.co/api/v1/users";
let token = localStorage.getItem("token");
console.log(baseURL);
async function getData() {
  const response = await fetch(`${baseURL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`
    }


  })
  const result = await response.json();
  console.log(result);
  dataRender(result)
}
// =========== render all data =====================

getData()

function dataRender(data) {
  data.forEach(el => {
    const tr = createElement("tr", "item", `
  <img class="image" src="${el.avatar}">
    <td>${el.name} </td>
    <td>${el.role}</td>
    <td> <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary" data-edit=${el.id}>EDIT</button></td>
   
`);


    $("#data").appendChild(tr);
  });
}



// ============== add data functions ================



function addData() {

  const nameS = $('#user-name').value.trim();
  const emailF = $('#user-email').value.trim();
  const params = {
    name: nameS,
    email: emailF,

  }
  console.log(params);


  if (nameS.length === 0 || emailF.length === 0) {
    alert('Please fill...')
  }
  else {

    fetch(`https://api.escuelajs.co/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)

    })

  }

}


$('#send').addEventListener('submit', (e) => {
  e.preventDefault()
  addData()
})

//============== Edit =========
// ======= edit data =============================



$('#data').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-primary')) {
    let id = e.target.getAttribute('data-edit');
    localStorage.setItem('editId', id);
    sendModal()
  }
})

async function sendModal() {
  let id = localStorage.getItem('editId');

  const data = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);
  const result = await data.json();
  console.log(result.name);
  $('#editname').value = result.name;
}

$('#editsend').addEventListener('submit', (e) => {
  e.preventDefault()
  let id = localStorage.getItem('editId');
  let editname = $('#editname').value;
  // console.log(emailS);


  let params = {
    email:editname 

  }
  console.log(params);
  fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)

  })

})













