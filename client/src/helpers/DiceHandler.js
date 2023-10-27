export default class DiceHandler {
    constructor(scene) {
        this.createDice = (x, y, duration = 1000) => {
            let diceIsRolling = false;
        
            const dice = scene.add.mesh(x, y, "dice-albedo").setScale(.5);
            const shadowFX = dice.postFX.addShadow(0, 0, 0.006, 2, 0x111111, 10, .8);
            dice.addVerticesFromObj("dice-obj", 0.25);
            dice.panZ(6);
            dice.modelRotation.x = Phaser.Math.DegToRad(0);
            dice.modelRotation.y = Phaser.Math.DegToRad(-90);
        
            return (diceRoll = Phaser.Math.Between(1, 6)) => new Promise(resolve => {
                if (!diceIsRolling) {
                    diceIsRolling = true;
                    
                    // Shadow
                    scene.add.tween({
                        targets: shadowFX,
                        x: -8,
                        y: 10,
                        duration: duration -250,
                        ease: "Sine.easeInOut",
                        yoyo: true,
                    });
                    scene.children.bringToTop(dice)
                    scene.add.tween({
                        targets: dice,
                        from: 0,
                        to: 1,
                        duration: duration,
                        onUpdate: () => {
                            dice.modelRotation.x -= .02;
                            dice.modelRotation.y -= .08;
                        },
                        onComplete: () => {
                            switch (diceRoll) {
                                case 1:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(0);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(-90);
                                    break;
                                case 2:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(90);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(0);
                                    break;
                                case 3:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(180);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(0);
                                    break;
                                case 4:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(180);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(180);
                                    break;
                                case 5:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(-90);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(0);
                                    break;
                                case 6:
                                    dice.modelRotation.x = Phaser.Math.DegToRad(0);
                                    dice.modelRotation.y = Phaser.Math.DegToRad(90);
                                    break;
                            }
                        },
                        ease: "Sine.easeInOut",
                    });
        
                    // Intro dice
                    scene.add.tween({
                        targets: [dice],
                        scale: .7,
                        duration: duration - 200,
                        yoyo: true,
                        ease: Phaser.Math.Easing.Quadratic.InOut,
                        onComplete: () => {
                            dice.scale = .5;
                            diceIsRolling = false;
                            resolve(diceRoll)
                            // if (callback !== undefined) {
                            //     diceIsRolling = false;
                            //     callback(diceRoll);
                            // }
                        }
                    });
                } else {
                    console.log("Is rolling");
                }
            })
        }
        
    }
}