class Ui {
    constructor() {
        this.init();
    }
    init() {
        let text = document.createElement("h3")
        text.innerHTML = "Podaj swoje imie:";
        let input = document.createElement("input");
        input.type = "text"
        input.id = "inputLogin"
        let btnLogin = document.createElement("button")
        let btnReset = document.createElement("button")
        btnLogin.id = "btnLogin"
        btnLogin.innerHTML = "LOGUJ"
        btnReset.id = "btnReset"
        btnReset.innerHTML = "RESETUJ"
        document.querySelector("#loginDiv").appendChild(text)
        document.querySelector("#loginDiv").appendChild(input)
        document.querySelector("#loginDiv").appendChild(btnLogin)
        document.querySelector("#loginDiv").appendChild(btnReset)
    };
}