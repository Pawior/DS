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
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
    ];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 10000);
    this.camera.position.set(0, 50, 200);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0066ff);
    // this.renderer.setSize(600, 600);
    document.getElementById("root").append(this.renderer.domElement);
    const axes = new THREE.AxesHelper(1000);
    this.scene.add(axes);

    this.createBoard();
    this.render(); // wywołanie metody render
  }

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
          tile = new THREE.Mesh(geometry, materialWhite);
        } else if (elem == 0) {
          tile = new THREE.Mesh(geometry, materialBlack);
        }
        tile.position.set(tileX * 10, 0, z);
        this.scene.add(tile);
        tileX++;
        console.log(tileX);
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
