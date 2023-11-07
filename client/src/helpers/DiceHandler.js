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

        this.buildDice = (x, y) => {
            let valueText = scene.add.text(x, y, '0', { fontFamily: 'Arial Black', fontSize: 98, color: '#c51b7d' })
            valueText.setStroke('#de77ae', 16).setScale(0).setOrigin(0.5).setData('diceValueText', true);
            return {
                x: x,
                y: y,
                valueText: valueText,
                dice1: this.createDice(x - 65, y),
                dice2: this.createDice(x + 65, y)
                }
        }
        
        this.destroyDice = () => {
            let destroyList = []
            scene.children.list.forEach(gameObject => {
                if (gameObject.type === 'Mesh' || gameObject.getData('diceValueText')) {
                    destroyList.push(gameObject)
                }
            })
            destroyList.forEach(dice => dice.destroy())
        }


        this.rollDice = (dice, result1, result2) => new Promise(resolve => {
            dice.dice1(result1)
            .then(() => dice.dice2(result2))
            .then(() => {
                dice.valueText.text = result1+result2
                scene.children.bringToTop(dice.valueText)
                let tween = scene.add.tween({
                    targets: dice.valueText,
                    scale: 1,
                    duration: 1000,
                    ease: Phaser.Math.Easing.Bounce.Out,
                    onComplete: () => {
                        resolve(result1 + result2)
                        tween.destroy()
                    }
                })
            })
        })

        this.changeValue = (dice, value) => new Promise(resolve => {
            let modificationText = scene.add.text(dice.x, dice.y, '', { fontFamily: 'Arial Black', fontSize: 98 }).setScale(0).setOrigin(0.5)
            value < 0 ? modificationText.setText(value).setColor('#ff0000').setStroke('#700101', 16) : modificationText.setText(`+ ${value}`).setColor('#3ee64f').setStroke('#1d7026', 16)

            scene.children.bringToTop(dice.valueText)
            let shrinkTween = scene.add.tween({
                targets: dice.valueText,
                scale: 0,
                duration: 500,

                onComplete: () => {
                    dice.valueText.text = parseInt(dice.valueText.text) + value

                    let modificationInTween = scene.add.tween({
                        targets: modificationText,
                        scale: 1,
                        duration: 1000,
                        ease: Phaser.Math.Easing.Bounce.Out,
                        onComplete: () => {
                            let modificationOutTween = scene.add.tween({
                                targets: modificationText,
                                scale: 0,
                                duration: 500,
                                // ease: Phaser.Math.Easing.Bounce.Out,
                                onComplete: () => {
                                    modificationText.destroy()
                                    
                                    let popTween = scene.add.tween({
                                        targets: dice.valueText,
                                        scale: 1,
                                        duration: 1000,
                                        ease: Phaser.Math.Easing.Bounce.Out,
                                        onComplete: () => {
                                            resolve(dice.valueText.text)
                                            popTween.destroy()
                                        }
                                    })
                                    
                                    modificationOutTween.destroy()
                                }
                            })

                            modificationInTween.destroy()
                        }
                    })

                    shrinkTween.destroy()
                }
            })
        })

        
    }
}