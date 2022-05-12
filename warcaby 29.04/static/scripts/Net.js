class Net {
  constructor() {
    this.init();
    this.colorPionkow = "";
    // this.oldTab = []
  }
  init() {
    let btnLogin = document.querySelector("#btnLogin");
    btnLogin.addEventListener("click", this.fetchit);
  }
  fetchit() {
    let btnReset = document.querySelector("#btnReset");
    let inputLogin = document.querySelector("#inputLogin");
    let userName = inputLogin.value;
    let data = {
      user: userName,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/post", options)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#loginDiv").style.display = "none";
        document.querySelector("#statusBar-hi").innerHTML = "Hi " + data.user;
        const checkUsersInterval = setInterval(() => {
          fetch("/checkUsers", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.arrLen == 2) {
                clearInterval(checkUsersInterval);
                if (document.querySelector("#usersError")) {
                  document.querySelector("#usersError").style.display = "none";
                }
                document.querySelector("#loginDiv-waiting").style.display =
                  "none";
                if (this.colorPionkow != "white") {
                  this.colorPionkow = "black";
                  // document.querySelector(
                  //   "#loginDiv-moveWaiting"
                  // ).style.display = "block";
                }
                console.log(this.colorPionkow);
              } else if (data.arrLen == 1) {
                document.querySelector("#statusBar-usersError").innerHTML =
                  "<p id='usersError'> Nieprawidłowa ilość userów</p>";
                document.querySelector("#loginDiv-waiting").style.display =
                  "block";
                // document.querySelector("#root").style.pointerEvents = "none";
                // document.querySelector(".loginDiv-modal").addEventListener(
                //   "click",
                //   function (event) {
                //     event.stopPropagation();
                //   },
                //   true
                // );
                this.colorPionkow = "white";
              } else {
                // document.querySelector("#statusBar-usersError").innerHTML =
                //   "<p id='usersError'> Nieprawidłowa ilość userów</p>";
                document.querySelector("#loginDiv-tooMuch").style.display =
                  "block";
              }
            });
        }, 500);
      })
      .catch((err) => console.log(err));
  }

  // searchNewMoves = () => {
  //   setInterval(() => {
  //     fetch("/porownywanie_tablicy", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "text/plain",
  //       },
  //     })
  //       .then(response => response.json())
  //       .then((newTab) => {
  //         if (!JSON.stringify(this.oldTab) === JSON.stringify(newTab)) {
  //           this.oldTab = [...newTab]
  //         }

  //       })
  //   }, 1000);
  // }
  // getCurrentTab = () => {
  //   return this.oldTab;
  // }
  // searchNewMoves()
}
