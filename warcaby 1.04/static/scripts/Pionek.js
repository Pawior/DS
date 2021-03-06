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
    this._positionInfo = "";
    this._color = "";
    this.name = "pionek";
    // this.name = "bbb" Moge w ten sposób podmieniać parametry
  }
  // set kolor(val) {
  //     console.log("setter")
  //     this.pawnMaterial.color.setHex(val);
  // }

  setColor = (val) => {
    this.material.color.setHex(val);
  };
  set positionInfo(pos) {
    this._positionInfo = pos;
  }

  get positionInfo() {
    return this._positionInfo;
  }
  set color(val) {
    this._color = val;
  }
  get color() {
    return this._color;
  }
  setPosition(newX, newZ) {
    let z = newX * 10;
    let x = parseInt(newZ) + -3.5;
    console.log(x);
    x *= 10;
    console.log(x);
    this.position.setZ(z);
    this.position.setX(x);
  }
}
