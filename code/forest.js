var posX;
var posY;
var touchDoor = false;
var turn = false;
var bomb = false;
var telecommande = false;
var touchDungeonDoor = false;
var touchlimite = false;
class forest extends Phaser.Scene {
    constructor() {
        super('forest');
    }
    init(data){
        this.posX = data.x;
        this.posY = data.y
    }
    preload() {
        this.load.image("placeholderforest", "../assets/map_ville/placeholderforest.png");
        this.load.image("arbreDonjon", "../assets/map_ville/arbreDonjon.png");
        this.load.tilemapTiledJSON("mapForet", "../assets/map_ville/mapForet.json");
        this.load.spritesheet('perso', '../assets/perso.png',
            { frameWidth: 32, frameHeight: 64 });
    }

    create() {
        const carteForest = this.add.tilemap("mapForet");
        const tileset = carteForest.addTilesetImage("placeholderforest", "placeholderforest");
        const giantTree = carteForest.addTilesetImage("arbreDonjon", "arbreDonjon");
        const sol = carteForest.createLayer(
            "sol",
            tileset
        );
        const versVille = carteForest.createLayer(
            "versVille",
            tileset
        );
        const entreeDonjon = carteForest.createLayer(
            "entreeDonjon",
            tileset
        );
        const parterre = carteForest.createLayer(
            "parterre",
            tileset
        );
        const arbre = carteForest.createLayer(
            "arbre",
            tileset
        );
        const arbreDonjon = carteForest.createLayer(
            "arbreDonjon",
            giantTree
        );
        const dungeonDoor = carteForest.createLayer(
            "dungeonDoor",
            giantTree
        );
        this.player = this.physics.add.sprite(this.posX, this.posY, 'perso');

        arbre.setCollisionByExclusion(-1, true);
        entreeDonjon.setCollisionByExclusion(-1, true);
        arbreDonjon.setCollisionByExclusion(-1, true);
        versVille.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, arbre);
        this.physics.add.collider(this.player, arbreDonjon);
        this.physics.add.collider(this.player, entreeDonjon, porteDonjon);
        this.physics.add.collider(this.player, versVille, goville);
        function porteDonjon(){
            touchDungeonDoor = true
        }
        function goville(){
            touchlimite = true
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
        this.physics.world.setBounds(0, -16 * 32, 80 * 32, 80 * 32);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, -16 * 32, 80 * 32, 80 * 32);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.input.gamepad.once('connected', function (mypad) {
            // 'pad' is a reference to the gamepad that was just connected
            pad = mypad;
            console.log(pad);
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
        if (touchDungeonDoor == true){
            this.scene.start('village',{
                x : 352,
                y : 32,
            });
            touchDungeonDoor = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }
        if (touchlimite == true){
            this.scene.start('village',{
                x : 47 * 32,
                y : -16*32,
            });
            touchlimite = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }
    }
}