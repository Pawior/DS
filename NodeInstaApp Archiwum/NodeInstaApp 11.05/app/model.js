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
animalsArray.push({ name: 'cat', color: 'black' })
animalsArray.push({ name: 'dog', color: 'yellow' })
module.exports = { Animal, animalsArray };