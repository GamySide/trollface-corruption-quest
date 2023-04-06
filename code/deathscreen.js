class Deathscreen extends Phaser.Scene {
    constructor() {
        super('deathscreen');
    }
    preload() {
        this.load.image("deathscreen", "../assets/titlescene/deathscreen.png");
    }
    create() {
        this.add.image(320, 180, 'deathscreen');
        this.clavier = this.input.keyboard.addKeys('A,Z,E,R,Q,S,D,ENTER,ESC');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pad = {
            leftStick: { x: 0, y: 0 },
            rightStick: { x: 0, y: 0 },
            A: false,
            B: false,
            X: false,
            Y: false,
            L1: 0,
            L2: 0,
            R1: 0,
            R2: 0,
            right: false,
            left: false,
            up: false,
            down: false,
        }
    }
    update() {
        if (this.clavier.ENTER.isDown) {
            location.reload();
        }
        if (this.clavier.ESC.isDown) {
            window.close();
        }
    }

}