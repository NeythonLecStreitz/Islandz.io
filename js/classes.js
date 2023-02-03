class Player {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = "./assets/player_sprites/handgun/idle/survivor-idle_handgun_0.png"
        image.onload = () => {
            const scale = .5
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
        }
    }

    draw() {
        if (this.image) {
            c.drawImage(
                this.image, 
                this.position.x, this.position.y, 
                this.width, this.height)
        }
       
    }
}

