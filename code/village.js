var posX;
var posY;
var turn = false;
var bomb = false;
var telecommande = false;
touchDoorPP = false;
touchDoorPNJ = false;
touchDoorPiege = false;
touchDoorforest = false;
damage = false;
invin = false;
var atk = false;
var hpHere;
class Village extends Phaser.Scene {
    constructor() {
        super('village');
    }
    init(data) {
        this.posX = data.x;
        this.posY = data.y;
        this.hp = data.hp;
        this.hpmax = data.hpmax
    }
    preload() {
        this.load.image("placeholder1", "../assets/map_ville/placeholder1.png");
        this.load.tilemapTiledJSON("village", "../assets/map_ville/mapVille.json");
        this.load.spritesheet('village', '../assets/perso.png',
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
        const carteVillage = this.add.tilemap("village");
        const tileset = carteVillage.addTilesetImage("placeholder1", "placeholder1");

        const corruption_lake = carteVillage.createLayer(
            "corruption_lake",
            tileset
        );
        const parterre = carteVillage.createLayer(
            "parterre",
            tileset
        );
        const enterForest = carteVillage.createLayer(
            "enterForest",
            tileset
        );
        const enterDesert = carteVillage.createLayer(
            "enterDesert",
            tileset
        );
        const enterCorruption = carteVillage.createLayer(
            "enterCorruption",
            tileset
        );
        const enterPP = carteVillage.createLayer(
            "enterPP",
            tileset
        );
        const enterPiege = carteVillage.createLayer(
            "enterPiege",
            tileset
        );
        const enterPNJ = carteVillage.createLayer(
            "enterPNJ",
            tileset
        );
        const chemin = carteVillage.createLayer(
            "chemin",
            tileset
        );
        const maison_pp = carteVillage.createLayer(
            "maison_pp",
            tileset
        );
        const maison_piege = carteVillage.createLayer(
            "maison_piege",
            tileset
        );
        const maison_pnj = carteVillage.createLayer(
            "maison_pnj",
            tileset
        );
        const arbre = carteVillage.createLayer(
            "arbre",
            tileset
        );
        //this.scene.events.on('pos', function(data){
        //this.player = this.physics.add.sprite(data.x ,data.y, 'perso');
        //});
        //let player = this.scene.getData('player');
        //init(data);{
        //this.posX = data.x; 
        //this.posY = data.y;
        //}

        this.attakLat = this.physics.add.sprite(5000, 5000, 'atklat');
        this.attakHo = this.physics.add.sprite(5000, 5000, 'atkHo');
        this.player = this.physics.add.sprite(this.posX, this.posY, 'perso');
        this.player.setSize(32,32);
        this.player.setOffset(0,48);
        
        //this.ui1 = this.add.image(135, 75, "ui1").setScrollFactor(0).setScale(1);
        //this.ui2 = this.add.image(135, 75, "ui2").setScrollFactor(0).setScale(1);
        //this.ui3 = this.add.image(135, 75, "ui3").setScrollFactor(0).setScale(1);
        //this.ui4 = this.add.image(135, 75, "ui4").setScrollFactor(0).setScale(1);
        this.ui = this.add.image(90, 50, "uifull").setScrollFactor(0).setScale(0.75);
        

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        //this.physics.add.collider(this.player);
        arbre.setCollisionByExclusion(-1, true);
        maison_pp.setCollisionByExclusion(-1, true);
        maison_piege.setCollisionByExclusion(-1, true);
        maison_pnj.setCollisionByExclusion(-1, true);
        arbre.setCollisionByExclusion(-1, true);
        enterPP.setCollisionByExclusion(-1, true);
        enterPiege.setCollisionByExclusion(-1, true);
        enterPNJ.setCollisionByExclusion(-1, true);
        enterForest.setCollisionByExclusion(-1, true);
        enterDesert.setCollisionByExclusion(-1, true);
        enterCorruption.setCollisionByExclusion(-1, true);
        corruption_lake.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, arbre);
        this.physics.add.collider(this.player, maison_pp);
        this.physics.add.collider(this.player, maison_piege);
        this.physics.add.collider(this.player, maison_pnj);
        this.physics.add.collider(this.player, enterPP, portePP);
        this.physics.add.collider(this.player, enterPiege, portePiege);
        this.physics.add.collider(this.player, enterPNJ, portePNJ);
        this.physics.add.collider(this.player, enterForest, porteForest);
        this.physics.add.collider(this.player, enterDesert, porteDesert);
        this.physics.add.collider(this.player, enterCorruption, porteCorruption);
        this.physics.add.collider(this.player, corruption_lake, corruptionDamage);

        function portePP() {
            touchDoorPP = true;
        }
        function portePiege() {
            touchDoorPiege = true;
        }
        function portePNJ() {
            touchDoorPNJ = true;
        }
        function porteForest() {
            touchDoorforest = true;
        }
        function porteDesert() {
            //touchDoorPNJ = true;
        }
        function porteCorruption() {
            //touchDoorPNJ = true;
        }
        function corruptionDamage() {
            damage = true;
        }
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
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('perso', { frame: 39 }),
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
        this.physics.world.setBounds(-32 * 32, -32 * 32, 64 * 32, 48 * 32);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(-32 * 32, -32 * 32, 64 * 32, 48 * 32);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.input.gamepad.once('connected', function (mypad) {
            // 'pad' is a reference to the gamepad that was just connected
            this.pad = mypad;
            console.log(this.pad);
        });

        if (this.clavier.Q.isDown || this.pad.leftStick.x <= -0.5 || this.pad.left == true && bomb == false && telecommande == false && damage == false) { //si la touche gauche est appuyée
            this.player.setVelocityX(-160); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else if (this.clavier.D.isDown || this.pad.leftStick.x >= 0.5 && bomb == false && telecommande == false && damage == false) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(160); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => gauche
            this.player.setVelocityY(0)
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            this.player.setVelocityX(0);
            turn = true;
        }

        if (this.clavier.Z.isDown || this.pad.leftStick.y <= -0.5 && bomb == false && telecommande == false && damage == false) { //si la touche gauche est appuyée
            this.player.setVelocityY(-160); //alors vitesse négative en X
            this.player.anims.play('up', true); //et animation => gauche
            this.player.setVelocityX(0);
        }
        else if (this.clavier.S.isDown || this.pad.leftStick.y >= 0.5 && bomb == false && telecommande == false && damage == false) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(160); //alors vitesse positive en X
            this.player.anims.play('down', true); //et animation => gauche
            this.player.setVelocityX(0);
        }
        else { //sinon si la touche droite est appuyée
            //player.anims.play('turn', true); //et animation => gauche
            this.player.setVelocityY(0);
            if (turn == true && bomb == false && telecommande == false && damage == false) {
                this.player.anims.play('turn', true); //et animation => gauche
            }
        }
        turn = false;

        if (this.clavier.A.isDown && bomb == false && telecommande == false && damage == false) {
            console.log('patate')
            turn = false;
            bomb = true;
            this.player.anims.play('bomb', true); //et animation => gauche
            setTimeout(() => {
                bomb = false;
            }, 1000)

        }

        if (this.clavier.E.isDown && telecommande == false && bomb == false && damage == false) {
            console.log('patate')
            turn = false;
            telecommande = true;
            this.player.anims.play('switch', true); //et animation => gauche
            setTimeout(() => {
                telecommande = false;
            }, 1000)

        }
        if (touchDoorPP == true) {
            this.scene.start('maisonPP', {
                x: 6 * 32,
                y: 8 * 32,
                hp: this.hp,
                hpmax: this.hpmax,
            });
            touchDoorPP = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});

        }
        if (touchDoorPiege == true) {
            this.scene.start('maisonPiege', {
                x: 6 * 32,
                y: 8 * 32,
                hp: this.hp,
                hpmax: this.hpmax,
            });
            touchDoorPiege = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }
        if (touchDoorPNJ == true) {
            this.scene.start('maisonPNJ', {
                x: 8 * 32,
                y: 8 * 32,
                hp: this.hp,
                hpmax: this.hpmax,
            });
            touchDoorPNJ = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
        }
        if (touchDoorforest == true) {
            this.scene.start('forest', {
                x: 0,
                y: 60 * 32,
                hp: this.hp,
                hpmax: this.hpmax,
            });
            touchDoorforest = false;
            //let player = {x:48, y:32};
            //this.scene.setData('player',player);
            //this.scene.events.emit('pos',{x: 48, y: 32});
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
        if (this.hp <= 0) {
            this.hp = 0;
            this.scene.start('deathscreen', {});
        }
        if (this.hp == 10 || this.hp == 9) {
            this.ui.setTexture('uifull')
        }
        if (this.hp == 8 || this.hp == 7) {
            this.ui.setTexture('ui4')
        }
        if (this.hp == 6 || this.hp == 5) {
            this.ui.setTexture('ui3')
        }
        if (this.hp == 4 || this.hp == 3) {
            this.ui.setTexture('ui2')
        }
        if (this.hp == 2 || this.hp == 1) {
            this.ui.setTexture('ui1')
        }
        
    }
    GetHit(player, corruption_lake){
        console.log("Get damage");
        damage = true;
    }
}
