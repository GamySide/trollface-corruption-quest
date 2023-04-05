var config = {
    type: Phaser.AUTO,
    width: 480, height: 480,
    input: {
        gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scene: [MaisonPP,MaisonPiege,MaisonPNJ,village,forest,etage1],
    input: { gamepad: true },
};
var game = new Phaser.Game(config);