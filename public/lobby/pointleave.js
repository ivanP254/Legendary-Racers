//DEPECATED


const textureButton1 = PIXI.Texture.from('../assets/LEAVE.png');
const textureButtonDown1 = PIXI.Texture.from('../assets/LEAVE2.png');

const buttons1 = [];

const buttonPositions1 = [
    150, 500,
];

for (let i = 0; i < 1; i++) {
    const button1 = new PIXI.Sprite(textureButton1);
    button1.cursor = 'hover';

    button1.anchor.set(0.5);
    button1.x=window.innerWidth/1.65;
    button1.y=window.innerHeight/1.3;

    button1.width = window.innerWidth/5;
    button1.height = window.innerHeight/5;

    // make the button interactive...
    button1.interactive = true;

    button1
        .on('pointerdown', onButtonDown1)
        .on('pointerup', onButtonUp1)
        .on('pointerupoutside', onButtonUp1)

    // add it to the stage
    app.stage.addChild(button1);

    // add button to array
    buttons1.push(button1);
}

// set some silly values...
buttons1[0].scale.set(1.2);

function onButtonDown1() {
    this.isdown = true;
    this.texture = textureButtonDown1;
    this.alpha = 5;
}

function onButtonUp1() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver1;
    } else {
        this.texture = textureButton1;
    }
}
