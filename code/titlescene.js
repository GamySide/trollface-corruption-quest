var posX;
var posY;
var spawnX;
var spawnY;
var touchDoor = false;
var turn = false;
var bomb = false;
var telecommande = false;
var ilEstSorti = false;
var hpmax = 10;
var hp = 10;

class Titlescene extends Phaser.Scene {
    constructor() {
        super('titlescene');
    }
    preload() {
        this.load.image("background", "../assets/titlescene/background.png");
        this.load.image("start", "../assets/titlescene/start.png");
    }
    create() {
        this.add.image(320, 180, 'background');
        this.add.image(320, 300, 'start');
        this.buttonS = this.add.sprite(320,300, 'start').setInteractive();
        this.buttonS.on('pointerdown', function () {
            this.scene.scene.start('maisonPP',{
                x : 13*16,
                y :4*32,
                hpmax : 10,
                hp : 10,
            });
        });

    }
    update() {
        
    }

}