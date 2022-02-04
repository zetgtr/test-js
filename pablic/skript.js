const API_URL = "http://localhost:3000/"; // создаю переменную для API
let pageNumber = 1; // номер пагинации
let tablePerPage = 10; // сколько столбцов выводить
let filtredTable; // создаю переменную filtredTable
let data; // создаю переменную data
// создаю обект для скрытия/паказа
let showClass = {
  firstName: false,
  lastName: false,
  about: false,
  eyeColor: false,
};

// получаю данные таблицы
function getData() {
  fetch(`${API_URL}table`) // подключаюсь к серверу
    .then((request) => request.json()) // возвращаю обещание с полученого текста
    .then((dataTable) => {
      data = dataTable; // записываю получиные данные в data
      render(); // делаю ререндер
    });
}

// сортировка таблицы
function sortTable(e) {
  e.target.textContent === "firstName" && // проверка  на сортировку
    data.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)); //сортировка по firstName
  e.target.textContent === "lastName" &&
    data.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)); //сортировка по lastName
  e.target.textContent === "about" &&
    data.sort((a, b) => a.about.localeCompare(b.about)); // сортировка по about
  e.target.textContent === "eyeColor" &&
    data.sort((a, b) => a.eyeColor.localeCompare(b.eyeColor)); //сортировка по eyeColor
  render();
}

// скрытие столбца
function showOn(text) {
  let chbox = document.getElementById(text); // фокус на выбранный chbox
  // если true
  if (chbox.checked) {
    let show = document.querySelectorAll("." + text); // выбираю все элементы выбранного chbox
    // обхожу циклом show
    for (i = 0; i < show.length; i++) {
      show[i].classList.add("show"); // добовляю класс для скрытия
      showClass[text] = true; // добовляю класс для коректной работы пагинации
    }
  }
  // если false
  else {
    let show = document.querySelectorAll("." + text); // выбираю все элементы выбранного chbox
    for (i = 0; i < show.length; i++) {
      show[i].classList.remove("show"); // удаляю класс для скрытия
      showClass[text] = false; // убираю класс для коректной работы пагинации
    }
  }
}

// показ окна выбора скрытия столбца
function show() {
  document.querySelector(".editing").classList.add("editing_on"); // добовляю класс для показа окна
  document.querySelector(".editing_window").classList.add("none"); // добовляю класс что бы скрыть окно для редактирования
  document.querySelector(".show_window").classList.remove("none"); // удаляю если есть класс для скрытия
  document.querySelector(".showOff").addEventListener(
    "click",
    () => document.querySelector(".editing").classList.remove("editing_on") // удаленние класса для редактирования при клике на крестик
  );
}

//редактирование строки
function editingOn(e) {
  let firstNameText = "";
  let lastNameText = "";
  let aboutText = "";
  let eyeColorText = "";
  document.querySelector(".editing").classList.add("editing_on"); // добовляю класс для показа окна
  document.querySelector(".editing_window").classList.remove("none"); // удаляю если есть класс для скрытия
  document.querySelector(".show_window").classList.add("none"); // добовляю класс что бы скрыть окно для редактирования
  document.querySelector(".editing_window").innerHTML = ` 
    <div class="editingOff">&#10006</div>
    <h3>firstName</h3>
    <input class="inputFirstName"/>
    <h3>lastName</h3>
    <input class="inputLastName"/>
    <h3>about</h3>
    <textarea class="inputAbout"></textarea>
    <h3>eyeColor</h3>
    <input class="inputEyeColor"/>
    <div class="save">Сохранить</div>
    `; // создаю структуру окна
  document
    .querySelector(".inputFirstName")
    .addEventListener("change", (e) => (firstNameText = e.target.value)); // обрабодчик события при вводе firstName
  document
    .querySelector(".inputLastName")
    .addEventListener("change", (e) => (lastNameText = e.target.value)); // обрабодчик события при вводе lastName
  document
    .querySelector(".inputAbout")
    .addEventListener("change", (e) => (aboutText = e.target.value)); // обрабодчик события при вводе about
  document
    .querySelector(".inputEyeColor")
    .addEventListener("change", (e) => (eyeColorText = e.target.value)); // обрабодчик события при вводе eyeColor
  // при клике на кнопку "Сохранить" вызывается функция с редактированием массива данных
  document.querySelector(".save").addEventListener("click", () => {
    let dataPage = (pageNumber - 1) * 10 + Number(e.path[1].id); // считаю какой элемент редактировать
    data[dataPage].name.firstName = firstNameText; // меняю элемент в массиве
    data[dataPage].name.lastName = lastNameText;
    data[dataPage].about = aboutText;
    data[dataPage].eyeColor = eyeColorText;
    render(); // делаю ререндер
  });
  // вешаю событие на удаленние класса для редактирования
  document.querySelector(".editingOff").addEventListener(
    "click",
    () => document.querySelector(".editing").classList.remove("editing_on") // удаленние класса для редактирования при клике на крестик
  );
}

// создание таблицы
function createTable(data) {
  const table = document.createElement("table"); // создаю элемент table
  table.id = "table"; // добовляю id
  const tbody = document.createElement("tbody"); // создаю элемент tbody
  const thead = document.createElement("thead"); // создаю элемент thead
  // создаю заголовки
  thead.innerHTML = `<tr>
    <th class="firstName ${
      showClass.firstName == true && "show" // добовляю класс для скрытия если нужно
    }">firstName</th>
    <th class="lastName ${showClass.lastName == true && "show"}">lastName</th>
    <th class="about ${showClass.about == true && "show"}">about</th>
    <th class="eyeColor ${showClass.eyeColor == true && "show"}">eyeColor</th>
    </tr>`;
  table.append(thead); // добовляю thead в таблицу
  table.append(tbody); // добовляю tbody в таблицу
  // прохожу циклом что бы создать строку
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr"); // создаю элемент th
    tr.id = i; // даю ему id
    // создаю таблицу
    tr.innerHTML = `<td class="firstName ${
      showClass.firstName == true && "show" // добовляю класс для скрытия если нужно
    }">${data[i].name.firstName}</td>
        <td class="lastName ${showClass.lastName == true && "show"}">${
      data[i].name.lastName // передаю данные в таблицу
    }</td>
        <td class="about ${showClass.about == true && "show"}">${
      data[i].about
    }</td>
                   <td class="eyeColor ${
                     showClass.eyeColor == true && "show"
                   }" style="background-color: ${data[i].eyeColor}">${
      data[i].eyeColor // добовляю цвет фона
    }</td>`;
    tbody.append(tr); // добавляю строку в таблицу
  }
  document.getElementById("category").append(table); // добавляю таблицу
  const td = document.querySelectorAll("td"); // выделяю элементы td
  // прохожу циклом что бы повесить событие
  for (i = 0; i < td.length; i++) {
    td[i].addEventListener("click", editingOn); // вешаю обработчик на редактирование
  }
  const th = document.querySelectorAll("th"); // выделяю элементы th
  for (i = 0; i < th.length; i++) {
    th[i].addEventListener("click", sortTable);
  }
}

// создаю пагинацию
function pages() {
  let from = (pageNumber - 1) * tablePerPage; // считаем значения
  let to = from + tablePerPage;
  filtredTable = data.slice(from, to); // записываю в filtredTable изменненую массу массива data
  const pages = Math.ceil(data.length / tablePerPage); // считаю сколько должно быть ячеек пагинации
  // прохожу циклом что бы создать ячейки пагинации
  for (i = 1; i < pages + 1; i++) {
    let pageItem = document.createElement("div"); // создаю div
    pageItem.innerHTML = i; // пишу номер пагинации
    i == pageNumber && pageItem.classList.add("activ"); // если число цикла равно выбранному номеру. То добовить класс activ
    pageItem.classList.add("page_text"); // добавить класс page_text
    pageItem.addEventListener("click", pageClick); // вешаю событие клик
    document.querySelector("#page").append(pageItem); // вывожу ячейку
  }
}

// событие на клик пгинации
function pageClick(page) {
  pageNumber = page.path[0].textContent; // записываю в pageNumber текст нажатой ячейки пагинации
  render(); // делаю ререндер
}

// функция ререндер
function render() {
  document.getElementById("category").innerHTML = ""; // отчищаю все в элементе с id "category"
  document.getElementById("page").innerHTML = "";
  pages(); // создаю пагинацию
  createTable(filtredTable); // создаю таблицу
}

document.querySelector(".settings_button").addEventListener("click", show); // вешаю событие на кнопку настройки
getData(); // получаю данные с сервера
