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
            debug: false
        }
    },
    scene: [Titlescene,MaisonPP,MaisonPiege,MaisonPNJ,Village,Forest,Etage1,Deathscreen],
    pixelArt: true ,
    input: { gamepad: true },
};
var game = new Phaser.Game(config);