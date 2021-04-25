/**
 * Author: Michael Hadley, mikewesthad.com
 * Tutorial: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */

const config = {
    type: Phaser.AUTO,
          width: 800,
          height: 600,
          parent: "game-container",
          pixelArt: true,
          physics: {
                default: "arcade",
                arcade: {
                            gravity: { y: 0 }
                        }
          },
    scene: {
                preload: preload,
                         create: create,
                         update: update
           }
};

const game = new Phaser.Game(config);
let cursors;
let player;
let showDebug = false;

function preload() {
    this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");

    this.load.spritesheet('player', '../assets/spritesheet/player.png', { frameWidth: 48, frameHeight: 64 });

}

function create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "player")
        .setSize(30, 25)
        .setOffset(10, 40);

    this.physics.add.collider(player, worldLayer);

    const anims = this.anims;
    anims.create({
        key: "player-left-walk",
        frames: anims.generateFrameNumbers('player', { frames: [ 9, 10, 11 ] }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "player-right-walk",
        frames: anims.generateFrameNumbers('player', { frames: [ 3, 4, 5 ] }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "player-front-walk",
        frames: anims.generateFrameNumbers('player', { frames: [ 6, 7, 8 ] }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "player-back-walk",
        frames: anims.generateFrameNumbers('player', { frames: [ 0, 1, 2 ] }),
        frameRate: 10,
        repeat: -1
    });

const camera = this.cameras.main;
camera.startFollow(player);
camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

cursors = this.input.keyboard.createCursorKeys();

this.add
.text(16, 16, 'Move: Arrow keys\nShow hitboxes: D key', {
font: "18px monospace",
fill: "#000000",
padding: { x: 20, y: 10 },
backgroundColor: "#ffffff"
})
.setScrollFactor(0)
    .setDepth(30);

    this.input.keyboard.once("keydown_D", event => {
            this.physics.world.createDebugGraphic();

            const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
            worldLayer.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
                });
            });
}

function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
        player.anims.play("player-left-walk", true);
    } else if (cursors.right.isDown) {
        player.anims.play("player-right-walk", true);
    } else if (cursors.up.isDown) {
        player.anims.play("player-back-walk", true);
    } else if (cursors.down.isDown) {
        player.anims.play("player-front-walk", true);
    } else {
        player.anims.stop();

        // If we were moving, pick and idle frame to use

        if (prevVelocity.x < 0) {
            player.setTexture("player", 9);
        } else if (prevVelocity.x > 0) { 
            player.setTexture("player", 5);
        } else if (prevVelocity.y < 0) { 
            player.setTexture("player", 0);
        } else if (prevVelocity.y > 0) {
            player.setTexture("player", 6);
        }
    }
}