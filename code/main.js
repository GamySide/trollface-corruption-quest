var config = {
    type: Phaser.AUTO,
    width: 640, height: 360,
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
    scene: [titlescene,MaisonPP,MaisonPiege,MaisonPNJ,village,forest,etage1],
    input: { gamepad: true },
};
var game = new Phaser.Game(config);