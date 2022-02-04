const express = require("express"); // подключаю библиотеку express
const fs = require("fs"); // подключаю библиотеку fs

const port = 3000; // выбираю порт
const static_dir = "../pablic"; // папка статики

const app = express(); // создаю приложение

app.use(express.static(static_dir)); // подключаю статику

// создаю get запрос
app.get("/table", (req, res) => {
  // считываю фаил table.json
  fs.readFile("./data/table.json", "utf-8", (err, data) => {
    res.send(data); // отдаю данные
  });
});

// запускаю сервер
app.listen(port, function () {
  console.log("Сервер работает на порту: " + port + "!"); // вывожу в консоль порт сервера
});
