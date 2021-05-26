import Player from "./player.js";

export default class WorldScene extends Phaser.Scene {

    preload() {
        this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");

         this.load.atlas("atlas", "./assets/atlas/atlas.png", "./assets/atlas/atlas.json");

    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });

        aboveLayer.setDepth(10);

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        console.log(spawnPoint.x + " " + spawnPoint.y);

        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        this.physics.add.collider(this.player.sprite, worldLayer);

        const camera = this.cameras.main;
        camera.startFollow(this.player.sprite);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.add
            .text(16, 16, 'Move: Arrow keys', {
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
              tileColor: null, 
              collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), 
              faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
            });
          });


    }


    update(time, delta) {
        this.player.update();
    }
}
