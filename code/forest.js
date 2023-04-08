var posX;
var posY;
var touchDoor = false;
var turn = false;
var bomb = false;
var telecommande = false;
var touchDungeonDoor = false;
var touchlimite = false;
var atk = false;
var hpHere;
class Forest extends Phaser.Scene {
    constructor() {
        super('forest');
    }
    init(data){
        this.posX = data.x;
        this.posY = data.y;
        this.hp = data.hp;
        this.hpmax = data.hpmax
    }
    preload() {
        this.load.image("placeholderforest", "../assets/map_ville/placeholderforest.png");
        this.load.image("arbreDonjon", "../assets/map_ville/arbreDonjon.png");
        this.load.tilemapTiledJSON("mapForet", "../assets/map_ville/mapForet.json");
        this.load.spritesheet('perso', '../assets/perso.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('atk', '../assets/atk.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('atkHo', '../assets/Tatk.png',
            { frameWidth: 64, frameHeight: 32 });
        this.load.image("uiFull", "../assets/uiFull.png");
        this.load.image("ui4", "../assets/ui4.png");
        this.load.image("ui3", "../assets/ui3.png");
        this.load.image("ui2", "../assets/ui2.png");
        this.load.image("ui1", "../assets/ui1.png");
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
        this.attakLat = this.physics.add.sprite(5000, 5000, 'atklat');
        this.attakHo = this.physics.add.sprite(5000, 5000, 'atkHo');
        this.player = this.physics.add.sprite(this.posX, this.posY, 'perso');
        this.player.setSize(32,32);
        this.player.setOffset(0,48);
        this.uiFull = this.physics.add.sprite(5000, 5000, 'uiFull');
        this.ui4 = this.physics.add.sprite(5000, 5000, 'ui4');
        this.ui3 = this.physics.add.sprite(5000, 5000, 'ui3');
        this.ui2 = this.physics.add.sprite(5000, 5000, 'ui2');
        this.ui1 = this.physics.add.sprite(5000, 5000, 'ui1');


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
        this.anims.create({
            key: 'attaqueLat',
            frames: this.anims.generateFrameNumbers('atklat', { start: 0, end: 6 }),
            frameRate: 14,
            repeat: 0
        });
        this.anims.create({
            key: 'attaqueHo',
            frames: this.anims.generateFrameNumbers('atkHo', { start: 0, end: 6 }),
            frameRate: 14,
            repeat: 0
        });
        this.anims.create({
            key: 'uiFull',
            frames: this.anims.generateFrameNumbers('uiFull', {frame : 0}),
            repeat: 0
        });
        this.anims.create({
            key: 'ui4',
            frames: this.anims.generateFrameNumbers('ui4', {frame : 0}),
            repeat: 0
        });
        this.anims.create({
            key: 'ui3',
            frames: this.anims.generateFrameNumbers('ui3', {frame : 0}),
            repeat: 0
        });
        this.anims.create({
            key: 'ui2',
            frames: this.anims.generateFrameNumbers('ui2', {frame : 0}),
            repeat: 0
        });
        this.anims.create({
            key: 'ui1',
            frames: this.anims.generateFrameNumbers('ui1', {frame : 0}),
            repeat: 0
        });
        
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
        this.physics.world.setBounds(0, -16 * 32, 80 * 32, 80 * 32);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, -16 * 32, 80 * 32, 80 * 32);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.input.gamepad.once('connected', function (mypad) {
            // 'pad' is a reference to the gamepad that was just connected
            this.pad = mypad;
            console.log(this.pad);
        });

        if (this.clavier.Q.isDown || this.pad.leftStick.x <= -0.5 || this.pad.left == true && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else if (this.clavier.D.isDown || this.pad.leftStick.x >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            this.player.setVelocityX(0);
            turn = true;
        }

        if (this.clavier.Z.isDown || this.pad.leftStick.y <= -0.5 && bomb == false && telecommande == false) { //si la touche gauche est appuyée
            this.player.setVelocityY(-160); //alors vitesse négative en X
            this.player.anims.play('up', true); //et animation => gauche
            this.player.setVelocityX(0);
        }
        else if (this.clavier.S.isDown || this.pad.leftStick.y >= 0.5 && bomb == false && telecommande == false) { //sinon si la touche droite est appuyée
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

        if (this.clavier.E.isDown && telecommande == false && bomb == false) {
            console.log('patate')
            turn = false;
            telecommande = true;
            this.player.anims.play('switch', true); //et animation => gauche
            setTimeout(() => {
                telecommande = false;
            }, 1000)

        }
        if (touchDungeonDoor == true){
            this.scene.start('etage1',{
                x : 16*16,
                y : 13*32,
                hp: this.hp,
                hpmax: this.hpmax,
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
                hp: this.hp,
                hpmax: this.hpmax,
            });
            touchlimite = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }
        if (damage == true && invin == false) {
            invin = true;

            //this.player.setOffset(5000,5000);
            this.player.alpha = 0.5
            this.serolReset = this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.hp -= 1
                    this.player.alpha = 1;
                    invin = false;
                },
                loop: false
            })
            console.log(this.hp)
            damage = false;
            
        }
        if ( this.hp <=0 ){
            this.hp = 0;
            this.scene.start('deathscreen',{});
        }
        if (this.cursors.left.isDown && atk == false && bomb == false && telecommande == false) {
            atk = true
            this.attakLat.anims.play('attaqueLat', true);
            this.attakLat.x = this.player.x - 32
            this.attakLat.y = this.player.y
            this.attakLat.setAngle(180)
            setTimeout(() => {
                this.attakLat.x = 5000;
                this.attakLat.y = 5000;
                atk = false;
            }, 500)
        }
        if (this.cursors.right.isDown && atk == false && bomb == false && telecommande == false) {
            atk = true
            this.attakLat.anims.play('attaqueLat', true);
            this.attakLat.x = this.player.x + 32
            this.attakLat.y = this.player.y
            this.attakLat.setAngle(0)
            setTimeout(() => {
                this.attakLat.x = 5000;
                this.attakLat.y = 5000;
                atk = false;
            }, 500)
        }
        if (this.cursors.up.isDown && atk == false && bomb == false && telecommande == false) {
            atk = true
            this.attakHo.anims.play('attaqueHo', true);
            this.attakHo.x = this.player.x
            this.attakHo.y = this.player.y - 32
            this.attakHo.setAngle(0)
            setTimeout(() => {
                this.attakHo.x = 5000;
                this.attakHo.y = 5000;
                atk = false;
            }, 500)
        }
        if (this.cursors.down.isDown && atk == false && bomb == false && telecommande == false) {
            atk = true
            this.attakHo.anims.play('attaqueHo', true);
            this.attakHo.x = this.player.x 
            this.attakHo.y = this.player.y + 48
            this.attakHo.setAngle(180)
            setTimeout(() => {
                this.attakHo.x = 5000;
                this.attakHo.y = 5000;
                atk = false;
            }, 500)
        }
        if (damage == true && invin == false) {
            invin = true;
            this.hp -= 1
            //this.player.setOffset(5000,5000);
            this.player.alpha = 0.5
            this.serolReset = this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.player.alpha = 1;
                    invin = false;
                },
                loop: false
            })
            console.log(this.hp)
            damage = false;

        }
        if (this.hp <= 0) {
            this.hp = 0;
            this.scene.start('deathscreen', {});
        }
    }
}