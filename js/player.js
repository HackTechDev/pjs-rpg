/**
 *
 *
 */

export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
        

      const anims = scene.anims;
      anims.create({
        key: "misa-left-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-left-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "misa-right-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-right-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "misa-front-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-front-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      anims.create({
        key: "misa-back-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-back-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });

     this.sprite = scene.physics.add
        .sprite(x, y, "atlas", "misa-front")
        .setSize(30, 40)
        .setOffset(10, 24);

    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.keys = scene.input.keyboard.createCursorKeys();


    this.keyDOnce = true;

    }


    freeze() {
        this.sprite.body.moves = false;
    }


    update(time, delta) {
        const keys = this.keys;
        const keyD = this.keyD;

        const sprite = this.sprite;
        const speed = 175;
        const prevVelocity = sprite.body.velocity.clone();

        if(keyD.isDown) {
            
            if (!this.keyDOnce) {
                console.log('D key pressed')
                this.keyDOnce = true;
            }
        }

        if(keyD.isUp) {
          this.keyDOnce = false;
        }

        sprite.body.setVelocity(0);

        if (keys.left.isDown) {
            sprite.body.setVelocityX(-speed);
        } else if (keys.right.isDown) {
            sprite.body.setVelocityX(speed);
        }

        if (keys.up.isDown) {
            sprite.body.setVelocityY(-speed);
        } else if (keys.down.isDown) {
            sprite.body.setVelocityY(speed);
        }

        sprite.body.velocity.normalize().scale(speed);

        if (keys.left.isDown) {
            sprite.anims.play("misa-left-walk", true);
        } else if (keys.right.isDown) {
            sprite.anims.play("misa-right-walk", true);
        } else if (keys.up.isDown) {
            sprite.anims.play("misa-back-walk", true);
        } else if (keys.down.isDown) {
            sprite.anims.play("misa-front-walk", true);
        } else {
            sprite.anims.stop();

            if (prevVelocity.x < 0) {
                sprite.setTexture("atlas", "misa-left");
            } else if (prevVelocity.x > 0) { 
                sprite.setTexture("atlas", "misa-right");
            } else if (prevVelocity.y < 0) { 
                sprite.setTexture("atlas", "misa-back");
            } else if (prevVelocity.y > 0) {
                sprite.setTexture("atlas", "misa-front");
            }
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}

