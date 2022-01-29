var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.urlencoded({
    extended: true
}));
// const cars = {
//     1: "audi",
//     2: "opel",
//     3: "francuz",
//     4: "duży fiat",
//     5: "mercedes",
//     6: "male fajne autko"
// }
const cars = [
    {
        1: "audi"
    },
    {
        2: "opel"
    },

    {
        3: "francuz"
    },

    {
        4: "duży fiat"
    },

    {
        5: "mercedes"
    },

    {
        6: "male fajne autko"
    }


]

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.get("/", function (req, res) {
    let strona = `<form action="/handleForm" method="POST"> <table> `
    console.log(Object.values(cars[0]))
    for (let i = 0; i <= 5; i++) {
        // let trS = `<tr>`
        // strona = strona.concat(trS)
        // let td1 = `${i} -> ${cars[i]}`
        // strona = strona.concat(td1)
        // console.log(cars[i])
        let row = `<tr>`
        strona = strona.concat(row)
        let td = `<td> ${i} -> ${Object.values(cars[i])} <input type="radio" name=${Object.values(cars[i])} value="nowe" > <input type="radio" name=${Object.values(cars[i])} value="używane"> <input type="radio" name=${Object.values(cars[i])} value="powypadkowe"> </td>`
        strona = strona.concat(td)
        let rowEnd = `<tr>`
        strona = strona.concat(rowEnd)
    }
    let submitBtn = "<button type=`submit`> Submit </button>"
    strona = strona.concat(submitBtn)
    strona = strona.concat("</table> </form>")
    // console.log(strona)
    res.send(strona)
})

app.post("/handleForm", function (req, res) {
    let uzywane 

})