var posX;
var posY;
var touchDoor = false;
var turn = false;
var bomb = false;
var telecommande = false;

class MaisonPiege extends Phaser.Scene {
    constructor() {
        super('maisonPiege');
    }
    init(data){
        this.posX = data.x;
        this.posY = data.y
    }
    preload() {
        this.load.image("placeholderMaison", "../assets/map_ville/placeholderMaison.png");
        this.load.tilemapTiledJSON("maisonPiege", "../assets/map_ville/mapMaisonPiege.json");
        this.load.spritesheet('perso', '../assets/perso.png',
            { frameWidth: 32, frameHeight: 64 });
    }

    create() {
        const cartemaisonPiege = this.add.tilemap("maisonPiege");
        const tileset = cartemaisonPiege.addTilesetImage("placeholderMaison", "placeholderMaison");

        const sol = cartemaisonPiege.createLayer(
            "sol",
            tileset
        );
        const wall = cartemaisonPiege.createLayer(
            "mur invisible",
            tileset
        );
        const sortie = cartemaisonPiege.createLayer(
            "sortie",
            tileset
        );
        const tapis = cartemaisonPiege.createLayer(
            "tapis",
            tileset
        );
        const props = cartemaisonPiege.createLayer(
            "props",
            tileset
        );
        const mur = cartemaisonPiege.createLayer(
            "mur",
            tileset
        );
        this.player = this.physics.add.sprite(this.posX, this.posY, 'perso');

        const murdevant = cartemaisonPiege.createLayer(
            "murdevant",
            tileset
        );
        
        props.setCollisionByExclusion(-1, true);
        wall.setCollisionByExclusion(-1, true);
        sortie.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, props);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, sortie, porte);
        function porte(){
            touchDoor = true
        }
        
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 11, end: 15 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: 6, end: 10 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 16, end: 21 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 22, end: 27 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'bomb',
            frames: this.anims.generateFrameNumbers('perso', { start: 34, end: 39 }),
            frameRate: 6,
            repeat: 0
        });
        this.anims.create({
            key: 'switch',
            frames: this.anims.generateFrameNumbers('perso', { start: 28, end: 33 }),
            frameRate: 6,
            repeat: 0
        });
        this.clavier = this.input.keyboard.addKeys('A,Z,E,R');
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
        this.physics.world.setBounds(-1 * 32, -2 * 32, 20 * 32, 20 * 32);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(-8 * 32, -8 * 32, 8 * 32, 5 * 32);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.input.gamepad.once('connected', function (mypad) {
            // 'pad' is a reference to the gamepad that was just connected
            this.pad = mypad;
            console.log(this.pad);
        });

        if (this.cursors.left.isDown || this.pad.leftStick.x <= -0.5 || this.pad.left == true && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else if (this.cursors.right.isDown || this.pad.leftStick.x >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            this.player.setVelocityX(0);
            turn = true;
        }

        if (this.cursors.up.isDown || this.pad.leftStick.y <= -0.5 && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            this.player.setVelocityY(-160); //alors vitesse négative en X
            this.player.anims.play('up', true); //et animation => gauche
            this.player.setVelocityX(0);
        }
        else if (this.cursors.down.isDown || this.pad.leftStick.y >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(160); //alors vitesse positive en X
            this.player.anims.play('down', true); //et animation => gauche
            this.player.setVelocityX(0);
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            this.player.setVelocityY(0);
            if (turn == true && bomb == false && telecommande == false) {
                this.player.anims.play('turn', true); //et animation => gauche
            }
        }
        turn = false;

        if (this.clavier.A.isDown && bomb == false && telecommande == false) {
            console.log('patate')
            turn = false;
            bomb = true;
            this.player.anims.play('bomb', true); //et animation => gauche
            setTimeout(() => {
                bomb = false;
            }, 1000)

        }

        if (this.clavier.Z.isDown && telecommande == false && bomb == false) {
            console.log('patate')
            turn = false;
            telecommande = true;
            this.player.anims.play('switch', true); //et animation => gauche
            setTimeout(() => {
                telecommande = false;
            }, 1000)

        }
        if (touchDoor == true){
            this.scene.start('village',{
                x : 352,
                y : 32,
            });
            touchDoor = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }

    }
}