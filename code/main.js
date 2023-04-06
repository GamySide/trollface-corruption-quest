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
    scene: [Titlescene,MaisonPP,MaisonPiege,MaisonPNJ,Village,Forest,Etage1,Deathscreen],
    input: { gamepad: true },
};
var game = new Phaser.Game(config);