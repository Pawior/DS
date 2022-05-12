class Game {
  constructor() {
    this.szachownica = [
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
    ];
    this.pionki = [
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
    ];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 10000);
    // było 55
    this.camera.position.set(0, 100, 150);
    // 0, 100, 150
    // this.camera.position.set(0, 100, -100);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.rotation.x -= 0.7;
    // this.camera.rotation.x -= Math.PI / 2;
    // this.camera.rotation.y = Math.PI / 2;
    // this.camera.rotation.y = Math.PI;
    this.camera.updateProjectionMatrix();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffe6);
    // this.renderer.setSize(600, 600);
    document.getElementById("root").append(this.renderer.domElement);
    const axes = new THREE.AxesHelper(1000);
    this.scene.add(axes);
    this.pickedPionek;
    this.pionkiBody;

    this.createBoard();
    this.createPionek();
    this.render(); // wywołanie metody render
    this.raycaster();
    this.searchNewMoves();
    this.canMove = true;
    this.timerInterval;

    // this.waitForMove();

    this.colorPionkow = "";
    fetch("/giveColor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.colorPionkow = data.colorPionkow;
        if (this.colorPionkow == "black") {
          this.camera.position.set(0, 100, -80);
          this.camera.rotation.y = Math.PI;
          this.camera.rotation.x += 1.4;
          this.canMove = false;
          let checkGameRdy = setInterval(() => {
            let divWaiting = document.querySelector("#loginDiv-waiting");
            if (divWaiting.style.display == "none") {
              document.querySelector("#loginDiv-moveWaiting").style.display =
                "block";
              this.countdown();
              clearInterval(checkGameRdy);
            }
          }, 1000);

          this.camera.updateProjectionMatrix();
        } else {
          let checkGameRdy = setInterval(() => {
            let divWaiting = document.querySelector("#loginDiv-waiting");
            if (divWaiting.style.display == "none") {
              document.querySelector("#loginDiv-moveWaiting").style.display =
                "none";
              this.countdown();
              clearInterval(checkGameRdy);
            }
          }, 1000);
        }
      });

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);
  }

  waitForMove = () => {
    console.log("Waiting forwaitForMove");
    setInterval(() => {
      console.log(this.canMove);
      if (this.canMove) {
        document.querySelector("#loginDiv-moveWaiting").style.display = "none";
      }
      if (this.canMove == false) {
        document.querySelector("#loginDiv-moveWaiting").style.display = "block";
      }

      // fetch("/didMove", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: {
      //     colorPionkow: JSON.stringify(this.colorPionkow),
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // console.log(data.pionek);

      //     console.log(data);

      //     data ? (this.canMove = true) : (this.canMove = false);
      //     if (this.canMove) {
      //       document.querySelector("#loginDiv-moveWaiting").style.display =
      //         "none";
      //     }
      //     if (!this.canMove) {
      //       document.querySelector("#loginDiv-moveWaiting").style.display =
      //         "block";
      //     }
      //   });
    }, 1000);
  };

  /**--------------------------------------------
   *               Raycast
   *---------------------------------------------**/

  raycaster = () => {
    const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
    const mouseVector = new THREE.Vector2();

    document.addEventListener("mousedown", () => {
      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, this.camera);
      if (this.canMove) {
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
          // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
          this.oldPicked;
          this.picked = intersects[0].object;
          console.log(this.picked);
          if (this.picked.name.includes("pionek")) {
            if (this.picked._color == this.colorPionkow) {
              this.pickedPionek = intersects[0].object;
              this.handleMove();
              this.oldPicked = intersects[0].object;
            }
          }
          if (this.picked.name == "pole") {
            this.pickedPole = intersects[0].object;
            this.handleFieldClick();
          }
        } else {
          // console.log("nie wybrano pionka");
        }
      }
    });
  };

  searchNewMoves = () => {
    let doesChange = false;
    setInterval(() => {
      fetch("/porownywanie_tablicy", {
        method: "POST",
        headers: {
          "Content-type": "text/plain",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(data) !== JSON.stringify(this.pionkiBody)) {
            console.log("Przesyłam pionka");
            // console.log(data.pionek);
            this.movePionek(data.pionek, data.newX, data.newY);
            doesChange = !doesChange;
            this.pionkiBody = data;

            console.log(this.canMove);
          }
        });
    }, 1000);
  };

  handleFieldClick = () => {
    // console.log(this.pickedPole);
    // let newNet = new Net();
    if (this.oldPicked) {
      let newX = this.pickedPole._positionInfo[0];
      let newY = this.pickedPole._positionInfo[2];
      let oldX = this.oldPicked.positionCoords[0];
      let oldY = this.oldPicked.positionCoords[2];

      let pionekX = this.pickedPionek.positionCoords[0];
      let pionekY = this.pickedPionek.positionCoords[2];

      const checkCollision = () => {
        let enemyRight = `pionek${parseInt(newX) - 1}_${parseInt(newY) - 1}`;
        let enemyLeft = `pionek${parseInt(newX) + 1}_${parseInt(newY) + 1}`;
        let enemyUpper = `pionek${parseInt(newX) + 1}_${parseInt(newY) - 1}`;
        let enemyBottom = `pionek${parseInt(newX) - 1}_${parseInt(newY) + 1}`;
        if (
          this.scene.getObjectByName(enemyRight) ||
          this.scene.getObjectByName(enemyLeft) ||
          this.scene.getObjectByName(enemyUpper) ||
          this.scene.getObjectByName(enemyBottom)
        ) {
          console.log("Jest enemy");
          if (
            parseInt(newY) == parseInt(pionekY) + 2 ||
            parseInt(newY) == parseInt(pionekY) - 2
          ) {
            if (
              newX == parseInt(pionekX) - 2 ||
              newX == parseInt(pionekX) + 2
            ) {
              let enemyX = (parseInt(newX) + parseInt(pionekX)) / 2;
              let enemyY = (parseInt(newY) + parseInt(pionekY)) / 2;
              console.log(enemyX);
              console.log(enemyY);
              let enemyToRemove = `pionek${enemyX}_${enemyY}`;
              console.log(enemyToRemove);
              let enemyToRemoveGot = this.scene.getObjectByName(enemyToRemove);
              console.log(enemyToRemoveGot);
              this.scene.remove(enemyToRemoveGot);
              return true;
            }
          }
        }
        return false;
      };

      const canMoveWhite = () => {
        if (this.pickedPionek._color == "white") {
          if (
            parseInt(newY) == parseInt(pionekY) + 1 ||
            parseInt(newY) == parseInt(pionekY) - 1
          ) {
            if (newX == pionekX - 1) {
              return true;
            }
          }
          return false;
        } else return false;
      };
      const canMoveBlack = () => {
        if (this.pickedPionek._color == "black") {
          if (
            parseInt(newY) == parseInt(pionekY) + 1 ||
            parseInt(newY) == parseInt(pionekY) - 1
          ) {
            if (newX == parseInt(pionekX) + 1) {
              return true;
            }
          }
          return false;
        } else return false;
      };

      const moveHandler = () => {
        this.pionki[oldX][oldY] = 0;
        this.pionki[newX][newY] = 1;
        let body = {
          pionek: this.pickedPionek,
          newX: newX,
          newY: newY,
        };
        // this.pionkiBody = {
        //   pionek: this.pickedPionek,
        //   newX: newX,
        //   newY: newY,
        // };
        fetch("/aktualizacja_tablicy", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            // console.table(this.pionki);

            this.pickedPionek.setPosition(newX, newY);
            this.pickedPionek.pionekName = `${newX}_${newY}`;
            this.pickedPionek.positionCoords = `${newX}_${newY}`;
            this.pickedPionek = undefined;
            this.repairPrevious();
            this.canMove = false;
            document.querySelector("#loginDiv-moveWaiting").style.display =
              "block";
            this.countdown();
          });
      };

      if (canMoveWhite() || canMoveBlack() || checkCollision()) {
        moveHandler();
      }
    }
  };
  handleMove = () => {
    // console.log(this.pickedPionek);
    this.repairPrevious();
    this.pickedPionek.setColor(0xabc);
  };

  repairPrevious = () => {
    if (this.oldPicked) {
      // if ( this.oldPicked._color == 0xabc)
      if (this.oldPicked._color == "black") {
        this.oldPicked.setColor(0x85611b);
      } else if (this.oldPicked._color == "white") {
        this.oldPicked.setColor(0xffffff);
      }
    }
  };

  createBoard = () => {
    let geometry = new THREE.BoxGeometry(10, 1, 10);
    let materialWhite = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: false,
      opacity: 0.5,
    });
    let materialBlack = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: false,
      opacity: 0.5,
    });
    let z = 0;
    this.szachownica.forEach((arr, i) => {
      let tileX = -3.5;
      arr.forEach((elem, index) => {
        let tile;
        if (elem == 1) {
          tile = new THREE.Mesh(geometry, materialBlack);
        } else if (elem == 0) {
          tile = new THREE.Mesh(geometry, materialWhite);
        }
        tile.name = "pole";
        tile._positionInfo = `${i}_${index}`;
        tile.position.set(tileX * 10, 0, z);
        this.scene.add(tile);

        tileX++;
      });
      z = (i + 1) * 10;
    });
  };

  createPionek = () => {
    let z = 0;
    this.pionki.forEach((arr, i) => {
      let tileX = -3.5;
      arr.forEach((elem, index) => {
        let pionek = new Pionek();
        if (elem == 1) {
          pionek.setColor(0xffffff);
          pionek.position.set(tileX * 10, 2, z);
          pionek.positionInfo = `${i}_${index}`;
          pionek.pionekName = `${i}_${index}`;
          pionek.color = "white";
          this.scene.add(pionek);
        } else if (elem == 2) {
          pionek.setColor(0x85611b);
          pionek.position.set(tileX * 10, 2, z);
          pionek.positionInfo = `${i}_${index}`;
          pionek.pionekName = `${i}_${index}`;
          pionek.color = "black";
          this.scene.add(pionek);
        }

        tileX++;
      });
      z = (i + 1) * 10;
    });
  };

  movePionek = (chgPionek, chgX, chgY) => {
    console.log(chgPionek);
    try {
      let pionekToMove = this.scene.getObjectByName(chgPionek.object.name);

      let pionekX = pionekToMove.positionCoords[0];
      let pionekY = pionekToMove.positionCoords[2];

      const checkCollision = () => {
        let enemyRight = `pionek${parseInt(chgX) - 1}_${parseInt(chgY) - 1}`;
        let enemyLeft = `pionek${parseInt(chgX) + 1}_${parseInt(chgY) + 1}`;
        let enemyUpper = `pionek${parseInt(chgX) + 1}_${parseInt(chgY) - 1}`;
        let enemyBottom = `pionek${parseInt(chgX) - 1}_${parseInt(chgY) + 1}`;
        if (
          this.scene.getObjectByName(enemyRight) ||
          this.scene.getObjectByName(enemyLeft) ||
          this.scene.getObjectByName(enemyUpper) ||
          this.scene.getObjectByName(enemyBottom)
        ) {
          console.log("Jest enemy");
          if (
            parseInt(chgY) == parseInt(pionekY) + 2 ||
            parseInt(chgY) == parseInt(pionekY) - 2
          ) {
            if (
              chgX == parseInt(pionekX) - 2 ||
              chgX == parseInt(pionekX) + 2
            ) {
              console.log("change: ");
              console.log(parseInt(chgX) + " " + parseInt(chgY));
              console.log("pionek stara pozycja: ");
              console.log(parseInt(pionekX) + " " + parseInt(pionekY));

              let enemyX = (parseInt(chgX) + parseInt(pionekX)) / 2;
              let enemyY = (parseInt(chgY) + parseInt(pionekY)) / 2;
              console.log(enemyX);
              console.log(enemyY);
              let enemyToRemove = `pionek${enemyX}_${enemyY}`;
              console.log(enemyToRemove);
              let enemyToRemoveGot = this.scene.getObjectByName(enemyToRemove);
              console.log(enemyToRemoveGot);
              this.scene.remove(enemyToRemoveGot);
              return true;
            }
          }
        }
        return false;
      };

      checkCollision();

      pionekToMove.pionekName = `${chgX}_${chgY}`;
      // pionekToMove.positionInfo = `${chgX}_${chgY}`;
      pionekToMove.setPositionInfo(`${chgX}_${chgY}`);
      pionekToMove.positionCoords = `${chgX}_${chgY}`;
      let tileX = (-3.5 + chgY) * 10;
      let z = (chgX + 1) * 10;
      pionekToMove.setPosition(chgX, chgY);
      if (chgX != pionekX && chgY != pionekY) {
        this.canMove = true;
        document.querySelector("#loginDiv-moveWaiting").style.display = "none";
        this.countdown();
      }
    } catch (e) {
      console.error(e);
    }
  };

  countdown = () => {
    clearInterval(this.timerInterval);
    let timeLeft = 8;
    let divTimer = document.getElementById("countdown-timer");

    this.timerInterval = setInterval(() => {
      if (timeLeft == -1) {
        clearInterval(this.timerInterval);
        // doSomething();
        if (this.canMove == true) {
          this.canMove = false;
          document.querySelector("#loginDiv-moveWaiting").style.display =
            "block";
          this.countdown();
        } else if (this.canMove == false) {
          this.canMove = true;
          document.querySelector("#loginDiv-moveWaiting").style.display =
            "none";
          this.countdown();
        }
      } else {
        divTimer.innerHTML = timeLeft + " seconds remaining";
        timeLeft--;
      }
    }, 1000);
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
  };
}
