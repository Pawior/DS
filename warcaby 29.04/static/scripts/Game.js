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
    this.camera.position.set(0, 100, 150);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.rotation.x -= 0.7;
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
  }

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
      const intersects = raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
        // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
        this.oldPicked;
        this.picked = intersects[0].object;
        // console.log(this.picked);
        if (this.picked.name.includes("pionek")) {
          this.pickedPionek = intersects[0].object;
          this.handleMove();
          this.oldPicked = intersects[0].object;
        }
        if (this.picked.name == "pole") {
          this.pickedPole = intersects[0].object;
          this.handleFieldClick();
        }
      } else {
        // console.log("nie wybrano pionka");
      }
    });
  };

  searchNewMoves = () => {
    let doesChange = false;
    setInterval(() => {
      console.log("szukam");
      fetch("/porownywanie_tablicy", {
        method: "POST",
        headers: {
          "Content-type": "text/plain",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(this.pionki);
          if (JSON.stringify(data) !== JSON.stringify(this.pionkiBody)) {
            console.log("noweeee");
            this.movePionek(data.pionek, data.newX, data.newY);
            doesChange = !doesChange;
            this.pionkiBody = data;
          }
        });
    }, 1000);
    console.log("beka");
  };

  handleFieldClick = () => {
    console.log(this.pickedPole);
    if (this.oldPicked) {
      let newX = this.pickedPole._positionInfo[0];
      let newY = this.pickedPole._positionInfo[2];
      let oldX = this.oldPicked._positionInfo[0];
      let oldY = this.oldPicked._positionInfo[2];
      this.pionki[oldX][oldY] = 0;
      this.pionki[newX][newY] = 1;
      let body = {
        pionek: this.pickedPionek,
        newX: newX,
        newY: newY,
      };
      this.pionkiBody = {
        pionek: this.pickedPionek,
        newX: newX,
        newY: newY,
      };
      fetch("/aktualizacja_tablicy", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // this.pionki = [...data];
          console.log(data);
          console.table(this.pionki);
          this.pickedPionek.setPosition(newX, newY);
          this.pickedPionek.pionekName = `${newX}_${newY}`;
          this.pickedPionek = undefined;
          this.repairPrevious();
        });
    }
  };
  handleMove = () => {
    console.log(this.pickedPionek);
    this.pickedPionek.setColor(0xabc);
    this.repairPrevious();
  };

  repairPrevious = () => {
    if (this.oldPicked) {
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
          pionek._positionInfo = `${i}_${index}`;
          pionek.pionekName = `${i}_${index}`;
          pionek.color = "white";
          this.scene.add(pionek);
        } else if (elem == 2) {
          pionek.setColor(0x85611b);
          pionek.position.set(tileX * 10, 2, z);
          pionek._positionInfo = `${i}_${index}`;
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
    console.log(chgX);
    console.log(chgY);
    console.log(chgPionek.object.name);

    let pionekToMove = this.scene.getObjectByName(chgPionek.object.name);
    console.log(pionekToMove);
    pionekToMove.pionekName = `${chgX}_${chgY}`;
    let tileX = (-3.5 + chgY) * 10;
    let z = (chgX + 1) * 10;
    pionekToMove.setPosition(chgX, chgY);
    // this.pionki.forEach((arr, i) => {
    //   let tileX = -3.5;
    //   arr.forEach((elem, index) => {
    //     // let pionek = this.pionki[(i, index)];
    //     let pionek = scene.getObjectByName(`pionek${i_index}`);

    //     if (elem == 1) {
    //       // pionek.setColor(0xffffff);
    //       // pionek.position.set(tileX * 10, 2, z);
    //       pionek.setPosition(tileX * 10, z);
    //       pionek._positionInfo = `${i}_${index}`;
    //       pionek.color = "white";
    //       pionek.pionekName = `${i}_${index}`;
    //     } else if (elem == 2) {
    //       // pionek.setColor(0x85611b);
    //       // pionek.position.set(tileX * 10, 2, z);
    //       console.log(pionek);
    //       pionek.setPosition(tileX * 10, z);
    //       pionek._positionInfo = `${i}_${index}`;
    //       pionek.color = "black";
    //       pionek.pionekName = `${i}_${index}`;
    //     }

    //     tileX++;
    //   });
    //   z = (i + 1) * 10;
    // });
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };
}
