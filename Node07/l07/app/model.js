class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getName() {
        return this.name;
    }
    update() {
        this.name = "żyrafa"
        this.color = "kolorowa"
    }
}

let animalsArray = []

module.exports = { Animal, animalsArray };