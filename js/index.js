/**
 * Author: Michael Hadley, mikewesthad.com
 * Tutorial: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

import WorldScene from "./world-scene.js";


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    backgroundColor: "#1d212d",
    scene: WorldScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
};

const game = new Phaser.Game(config);
