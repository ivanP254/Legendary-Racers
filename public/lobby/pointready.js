//DEPRECATED


const textureButton = PIXI.Texture.from('../assets/Ready.png');
const textureButtonDown = PIXI.Texture.from('../assets/Ready2.png');


const buttons = [];

const buttonPositions = [
    150, 500,
];

for (let i = 0; i < 1; i++) {
    const button = new PIXI.Sprite(textureButton);
    button.cursor = 'hover';

    button.anchor.set(0.5);
    button.x=window.innerWidth/2.6;
    button.y=window.innerHeight/1.3;

    button.width = window.innerWidth/5;
    button.height = window.innerHeight/5;

    // make the button interactive...
    button.interactive = true;

    button
        .on('pointerdown', onButtonDown)
        

    // add it to the stage
    app.stage.addChild(button);

    // add button to array
    buttons.push(button);
}

// set some silly values...
buttons[0].scale.set(1.2);

let isready = false;

function onButtonDown() {
    if (!isready){
        this.texture = textureButtonDown;
        
    }
    else if (isready) {
        this.texture = textureButton;
        
    }
     isready = !isready;
         // отправить новое состояние на сервер
         //обновить все картинки
     
}


