class Pionek extends THREE.Mesh {
    constructor() {
        super()
        this.geometry = new THREE.CylinderGeometry(5, 5, 3, 32);
        this.material = new THREE.MeshBasicMaterial({
            // color: 0x308AE6,
            map: new THREE.TextureLoader().load('../gfx/pionekMaterial.jpg'),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            opacity: 0.5,
            color: 0xff0000
        });
        console.log(this)
        // this.name = "bbb" Moge w ten sposób podmieniać parametry
    }
    // set kolor(val) {
    //     console.log("setter")
    //     this.pawnMaterial.color.setHex(val);
    // }

    setColor = (val) => {
        console.log("setter")
        this.material.color.setHex(val);
    }
    get kolor() {
        console.log("getter")
        return this._kolor
    }
}