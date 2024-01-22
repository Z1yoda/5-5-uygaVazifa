const nameInput = document.querySelector("#nameInput");
const authorInput = document.querySelector("#authorInput");
const bookType = document.querySelector("#bookType");
const btn = document.querySelector("#btn");
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");
const form = document.querySelector("#form");

function validation() {
  if (!nameInput.value.trim()) {
    alert("Name is empty!");
    nameInput.focus();
    return false;
  }

  if (!authorInput.value.trim()) {
    alert("Author's Name is empty!");
    authorInput.focus();
    return false;
  }

  if (!bookType.value.trim() || bookType.value == "Select type...") {
    alert("Book type is empty!");
    bookType.focus();
    return false;
  }
  return true;
}

function createRow(book, index) {
  return `<tr>
  <td>${index}</td>
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.type}</td>
  <td data-id="${book.id}">
    <button class="btn btn-success">edit</button>
    <button class="btn btn-danger" id="deleteBtns">delete</button>
  </td>
  </tr>`;
}

function getData() {
  let data = [];
  if (localStorage.getItem("book")) {
    data = JSON.parse(localStorage.getItem("book"));
  }
  return data;
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (validation()) {
    let book = {
      id: Math.random().toString(5).substr(2, 4),
      name: nameInput.value,
      author: authorInput.value,
      type: bookType.value,
    };

    let data = getData();
    data.push(book);
    localStorage.setItem("book", JSON.stringify(data));

    let tr = createRow(book, data.length + 1);
    tbody.innerHTML += tr;
    form.reset();
  } else {
    console.log("Validatsiyadan o'tmadi");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let data = getData();

  data.forEach((book, index) => {
    let tr = createRow(book, index + 1);
    tbody.innerHTML += tr;
  });

  let deleteBtns = document.querySelectorAll("#deleteBtns");

  deleteBtns.forEach((del) => {
    del.addEventListener("click", function () {
      let isDeleted = confirm("Is it deleted?");
      if (isDeleted) {
        let id = this.parentNode.getAttribute("data-id");
        data = data.filter(book => {
          return book.id != id;
        });

        localStorage.setItem("book", JSON.stringify(data));
        tbody.innerHTML = "";
        data.forEach((book, index) => {

          let tr = createRow(book, index + 1);
          tbody.innerHTML += tr;
        })
      }
    });
  });
});
