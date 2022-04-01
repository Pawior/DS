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
    this.camera = new THREE.PerspectiveCamera(35, 16 / 9, 0.1, 10000);
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

    /**--------------------------------------------
     *               Raycast
     *---------------------------------------------**/

    this.createBoard();
    this.createPionek();
    this.render(); // wywołanie metody render
    this.raycaster();
  }

  raycaster = () => {
    const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
    const mouseVector = new THREE.Vector2();

    document.addEventListener("mousedown", () => {
      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children);
      console.log(intersects.length);
      if (intersects.length > 0) {
        // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
        console.log(intersects[0].object);
        this.pickedPionek = intersects[0].object;
      } else {
        console.log("nie wybrano pionka");
      }
    });
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
        if (elem == 1) {
          let pionek = new Pionek();
          pionek.setColor(0xffffff);
          pionek.position.set(tileX * 10, 2, z);
          this.scene.add(pionek);
        } else if (elem == 2) {
          let pionek = new Pionek();
          pionek.setColor(0x85611b);
          pionek.position.set(tileX * 10, 2, z);
          this.scene.add(pionek);
        }
        tileX++;
      });
      z = (i + 1) * 10;
    });
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    console.log("render leci");
  };
}
