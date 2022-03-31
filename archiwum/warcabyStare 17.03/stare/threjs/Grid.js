class Grid {
    constructor(rdyPlane) {
        this.rdyPlane = rdyPlane;
        this.init();
    }
    init() {
        // const texture = new THREE.TextureLoader().load("https://architextures.org/img/home/home8.jpg");
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(4, 4);
        const planeGeometry = new THREE.PlaneGeometry(4000, 4000);
        const planeMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            wireframe: true

        });
        this.rdyPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    }
    returnPlane() {
        return this.rdyPlane;
    }
}