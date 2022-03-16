class Light {

    constructor(lightHeight) {
        this.lightHeight = lightHeight
        this.container = new THREE.Object3D();

        //wywołanie funkcji init()

        this.init()
    }

    init() {

        // utworzenie i pozycjonowanie światła

        this.light = new THREE.PointLight(0xFFE599, 1);
        this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy!!!

        // dodanie światła do kontenera

        this.container.add(this.light);

        //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
        const geometry = new THREE.SphereGeometry(15, 32, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFE599,
            map: new THREE.TextureLoader().load(
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD3G1AlB761XtNF-rJ_k8rvbTiRHKd9rUWA&usqp=CAU.png"
            )
        });
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(0, 0, 0)
        // dodanie go do kontenera

        this.container.add(this.mesh);
        this.container.position.set(0, 50, 0)
    }

    moveLight(y) {
        this.container.position.set(0, y, 0)
    }
    changeIntensity(x) {
        this.light.intensity = x;
    }
    getLight() {
        return this.container;
    }

}