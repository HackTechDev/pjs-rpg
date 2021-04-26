/**
 *
 *
 */

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;


        const anims = scene.anims;
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


        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add
            .sprite(x, y, "player", 0)
            .setSize(30, 25)
            .setOffset(10, 40);


        this.keys = scene.input.keyboard.createCursorKeys();
    }


    freeze() {
        this.sprite.body.moves = false;
    }


    update(time, delta) {
        const keys = this.keys;
        const sprite = this.sprite;
        const speed = 175;
        const prevVelocity = sprite.body.velocity.clone();

        // Stop any previous movement from the last frame
        sprite.body.setVelocity(0);

        // Horizontal movement
        if (keys.left.isDown) {
            sprite.body.setVelocityX(-speed);
        } else if (keys.right.isDown) {
            sprite.body.setVelocityX(speed);
        }

        // Vertical movement
        if (keys.up.isDown) {
            sprite.body.setVelocityY(-speed);
        } else if (keys.down.isDown) {
            sprite.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        sprite.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (keys.left.isDown) {
            sprite.anims.play("player-left-walk", true);
        } else if (keys.right.isDown) {
            sprite.anims.play("player-right-walk", true);
        } else if (keys.up.isDown) {
            sprite.anims.play("player-back-walk", true);
        } else if (keys.down.isDown) {
            sprite.anims.play("player-front-walk", true);
        } else {
            sprite.anims.stop();

            // If we were moving, pick and idle frame to use

            if (prevVelocity.x < 0) {
                sprite.setTexture("player", 9);
            } else if (prevVelocity.x > 0) { 
                sprite.setTexture("player", 5);
            } else if (prevVelocity.y < 0) { 
                sprite.setTexture("player", 0);
            } else if (prevVelocity.y > 0) {
                sprite.setTexture("player", 6);
            }
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}

