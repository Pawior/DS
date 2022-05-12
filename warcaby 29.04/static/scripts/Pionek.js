class Pionek extends THREE.Mesh {
  constructor() {
    super();
    this.geometry = new THREE.CylinderGeometry(5, 5, 3, 32);
    this.material = new THREE.MeshBasicMaterial({
      // color: 0x308AE6,
      map: new THREE.TextureLoader().load("../gfx/pionekMaterial.jpg"),
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: false,
      opacity: 0.5,
      color: 0xff0000,
    });
    this.positionCoords = "";
    this._color = "";
    this.name = "pionek";
    // this.name = "bbb" Moge w ten sposób podmieniać parametry
  }
  // set kolor(val) {
  //     console.log("setter")
  //     this.pawnMaterial.color.setHex(val);
  // }

  setColor = (val) => {
    console.log("zmieniam klor");
    console.log(val);
    this.material.color.setHex(val);
  };
  set positionInfo(pos) {
    this.positionCoords = pos;
  }

  get positionInfo() {
    return this._positionInfo;
  }
  set pionekName(id) {
    this.name = `pionek${id}`;
  }
  get pionekName() {
    return this.name;
  }
  set color(val) {
    this._color = val;
  }
  get color() {
    return this._color;
  }
  setPosition = (newX, newZ) => {
    let z = newX * 10;
    let x = parseInt(newZ) + -3.5;
    console.log(x);
    x *= 10;
    console.log(x);
    new TWEEN.Tween(this.position) // co
      .to({ x: x, z: z }, 500) // do jakiej pozycji, w jakim czasie
      .repeat(0) // liczba powtórzeń
      .easing(TWEEN.Easing.Bounce.Out) //.Out) // typ easingu (zmiana w czasie)
      .onUpdate(() => {
        console.log(this.position);
      })
      .onComplete(() => {
        console.log("koniec animacji");
      }) // funkcja po zakończeniu animacji
      .start();
    // this.position.setZ(z);
    // this.position.setX(x);
  };
  setPositionInfo = (newPos) => {
    this.positionCoords = newPos;
  };
}
