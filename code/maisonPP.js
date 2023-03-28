var platforms;
var player;
var turn = false;
var bomb = false;
var telecommande = false;

class village extends Phaser.Scene {
    constructor() {
        super('village');
    }
    preload() {
        this.load.image("placeholderMaison", "../assets/map_ville/placeholderMaison.png");
        this.load.tilemapTiledJSON("carte", "../assets/map_ville/mapMaisonPP.json");
        this.load.spritesheet('perso', '../assets/perso.png',
            { frameWidth: 32, frameHeight: 64 });
    }

    create() {
        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage("placeholderMaison", "placeholderMaison");

        const corruption_lake = carteDuNiveau.createLayer(
            "sol",
            tileset
        );
        const parterre = carteDuNiveau.createLayer(
            "sortie",
            tileset
        );
        const chemin = carteDuNiveau.createLayer(
            "tapis",
            tileset
        );
        const maison_pp = carteDuNiveau.createLayer(
            "props",
            tileset
        );
        const maison_pnj = carteDuNiveau.createLayer(
            "mur",
            tileset
        );
        player = this.physics.add.sprite(7*32 ,4*32, 'perso');

        const maison_piege = carteDuNiveau.createLayer(
            "murdevant",
            tileset
        );
        

        
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
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
        this.physics.world.setBounds(0 * 32, -1 * 32, 15 * 32, 10 * 32);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(-8 * 32, -8 * 32, 8 * 32, 5 * 32);
        this.cameras.main.startFollow(player);
    }

    update() {
        this.input.gamepad.once('connected', function (mypad) {
            // 'pad' is a reference to the gamepad that was just connected
            pad = mypad;
            console.log(pad);
        });

        if (this.cursors.left.isDown || this.pad.leftStick.x <= -0.5 || this.pad.left == true && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            player.setVelocityX(-160); //alors vitesse négative en X
            player.anims.play('left', true); //et animation => gauche
            player.setVelocityY(0)
        }
        else if (this.cursors.right.isDown || this.pad.leftStick.x >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
            player.setVelocityX(160); //alors vitesse positive en X
            player.anims.play('right', true); //et animation => gauche
            player.setVelocityY(0)
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            player.setVelocityX(0);
            turn = true;
        }

        if (this.cursors.up.isDown || this.pad.leftStick.y <= -0.5 && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            player.setVelocityY(-160); //alors vitesse négative en X
            player.anims.play('up', true); //et animation => gauche
            player.setVelocityX(0);
        }
        else if (this.cursors.down.isDown || this.pad.leftStick.y >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
            player.setVelocityY(160); //alors vitesse positive en X
            player.anims.play('down', true); //et animation => gauche
            player.setVelocityX(0);
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            player.setVelocityY(0);
            if (turn == true && bomb == false && telecommande == false) {
                player.anims.play('turn', true); //et animation => gauche
            }
        }
        turn = false;

        if (this.clavier.A.isDown && bomb == false && telecommande == false) {
            console.log('patate')
            turn = false;
            bomb = true;
            player.anims.play('bomb', true); //et animation => gauche
            setTimeout(() => {
                bomb = false;
            }, 1000)

        }

        if (this.clavier.Z.isDown && telecommande == false && bomb == false) {
            console.log('patate')
            turn = false;
            telecommande = true;
            player.anims.play('switch', true); //et animation => gauche
            setTimeout(() => {
                telecommande = false;
            }, 1000)

        }

    }
}