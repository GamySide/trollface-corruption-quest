class Deathscreen extends Phaser.Scene {
    constructor() {
        super('deathscreen');
    }
    preload() {
        this.load.image("deathscreen", "../assets/titlescene/deathscreen.png");
    }
    create() {
        this.add.image(320, 180, 'deathscreen');
        this.clavier = this.input.keyboard.addKeys('A,Z,E,R,ENTER,ESCAPE');
    }
    update() {
        console.log("pk")
        if (this.clavier.ENTER.isDown){
            this.scene.start('titlescene',{});
        }
    }

}