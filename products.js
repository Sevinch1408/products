"use strict";


let baseURL = "https://api.escuelajs.co/api/v1/products";
let token = localStorage.getItem("token");
// console.log(baseURL);
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
    const card = createElement("div", "item", `
  <img class="elImage" src="${el.category.image}">
    <h4>Title:${el.title} </h4>
    <h4>Price:${el.price}</h4>
    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary bg-primary" data-edit=${el.id}>EDIT</button>
     <button class="btn btn-danger bg-danger" data-del=${el.id}>DELETE</button>
`);


    $("#data").appendChild(card);
  });
}


// ============== add data functions ================
function addData() {

  const productName = $('#product-name').value.trim();
  const productPrice = $('#product-price').value.trim();

  const params = {
    title: productName,
    price: productPrice

  }

  console.log(params);
  if (productName.length === 0 || productPrice.length === 0) {
    alert("Please fill...")
  } else {
    fetch('https://api.escuelajs.co/api/v1/products/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(params)
      }
    })
  }


}

$('#send').addEventListener('submit', (e) => {
  e.preventDefault()
  addData()
})

// ============DELETE==========
$('#data').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger')) {
    let id = e.target.getAttribute('data-del');

    fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({})
    })

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
})





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
  // console.log(id);
  const data = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const result = await data.json();
// console.log(result.price);
  $('#editname').value=result.title;
  $('#editprice').value = result.price;
}

$('#editsend').addEventListener('submit', (e)=> {
  e.preventDefault()
  let id = localStorage.getItem('editId');
  let title = $('#editname').value;
  let price = $('#editprice').value;
console.log(price);


  let params = {
    title: title,
    price: price

  }
console.log(params);
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)

  })

})















