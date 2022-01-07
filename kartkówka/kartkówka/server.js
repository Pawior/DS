var express = require("express");
var app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});

let users = [
  { cyfra: "1", dane: "Nazwisko Imie" },
  { cyfra: "2", dane: "Nazwisko Imie" },
  { cyfra: "3", dane: "Nazwisko Imie" },
  { cyfra: "4", dane: "Nazwisko Imie" },
  { cyfra: "5", dane: "Nazwisko Imie" },
  { cyfra: "6", dane: "Nazwisko Imie" },
];

app.get("/", function (req, res) {
  let ide = "";
  for (j = 0; j < users.length; j++) {
    //console.log(users[j].cyfra);
    //var strona = `<p>${users[j].email}</p>`
    //res.send(strona)
    ide =
      ide +
      `<tr><td>${users[j].cyfra}</td><td>${users[j].dane} ${users[j].cyfra}</td><td><input type="radio" value="obecny" name="${j}"></td><td><input type="radio" value="nieobecny" name="${j}"></td><td><input type="radio" value="spozniony" name="${j}"></td></tr>`;
  }
  let strona = `
    <form action="/usun" method="GET">
    <table>

  <tr><td></td><td></td><td>obecny</td><td>nieobecny</td><td>spóźniony</td></tr>

  ${ide}

  </table>
  <button type="submit" id="sub">Send</button>
  </form>`;
  res.send(strona);
  // res.sendFile(__dirname + "/page.html");
});

app.get("/usun", function (req, res) {
  console.log(req.query);
  let ob = req.query;
  console.log(ob);
  console.log(ob[3]);
  //let ob2 = ob.length
  ob2 = [];
  let k = 0;
  let l = 0;
  let m = 0;
  for (let i = 0; i < users.length; i++) {
    ob2.push(ob[i]);
    if (ob2[i] === "obecny") {
      k = k + 1;
    } else if (ob2[i] === "nieobecny") {
      l = l + 1;
    } else {
      m = m + 1;
    }
  }

  //console.log(ob2.length);
  //console.log(k);
  let text = `Obecny: ${k}, Nieobecny: ${l}, Spóźniony: ${m}`;
  res.send(text);
});
