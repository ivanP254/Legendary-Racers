
const app = new PIXI.Application({
    width: 500,
    height: 500,
    transparent: false,
    antialis: true
});
app.renderer.backgroundColor = 0x233395D;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.querySelector('.container').appendChild(app.view);

//ICONS
const defaultIcon = "url('../assets/disk2.png') 2 2, auto";
const hoverIcon = "url('../assets/disk1.png') 2 2, auto";
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

const background = PIXI.Sprite.from('../assets/LOBBY.jpg');
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
    background.phase = 0;

const background1 = PIXI.Sprite.from('../assets/Ton.png');
    background1.width = app.screen.width;
    background1.height = app.screen.height;
    app.stage.addChild(background1);
    background1.phase = 0;

//Left up backgr window
const backgroundMiniLeft =  PIXI.Sprite.from('../assets/LU.png');
    app.stage.addChild(backgroundMiniLeft);
    backgroundMiniLeft.anchor.set(0.5);
    backgroundMiniLeft.x=window.innerWidth/2.6;
    backgroundMiniLeft.y=window.innerHeight/5;
    backgroundMiniLeft.width = window.innerWidth/4.1;
    backgroundMiniLeft.height = window.innerHeight/3.2;

//Left down backgr window
const backgroundMiniLeft2 =  PIXI.Sprite.from('../assets/LD.png');
    app.stage.addChild(backgroundMiniLeft2);
    backgroundMiniLeft2.anchor.set(0.5);
    backgroundMiniLeft2.x=window.innerWidth/2.61;
    backgroundMiniLeft2.y=window.innerHeight/2;
    backgroundMiniLeft2.width = window.innerWidth/4;
    backgroundMiniLeft2.height = window.innerHeight/3;

//Right down backgr window
const backgroundMiniRight1 =  PIXI.Sprite.from('../assets/RD.png');
    app.stage.addChild(backgroundMiniRight1);
    backgroundMiniRight1.anchor.set(0.5);
    backgroundMiniRight1.x=window.innerWidth/1.6;
    backgroundMiniRight1.y=window.innerHeight/2;
    backgroundMiniRight1.width = window.innerWidth/4;
    backgroundMiniRight1.height = window.innerHeight/3;

//Right up backgr window
const backgroundMiniRight2 =  PIXI.Sprite.from('../assets/RU.png');
    
    backgroundMiniRight2.anchor.set(0.5);
    backgroundMiniRight2.x=window.innerWidth/1.6;
    backgroundMiniRight2.y=window.innerHeight/5;
    backgroundMiniRight2.width = window.innerWidth/4;
    backgroundMiniRight2.height = window.innerHeight/3;
    app.stage.addChild(backgroundMiniRight2);


//PLAYER 1 - Ready!


// let alienImages = [];
// for (let index = 1; index <=83; index++) {
//     alienImages.push(`../assets/gifs/${index}.png`);
// }

// let textureArray = [];
// for (let i=0; i < alienImages.length; i++)
// {
//      let texture = PIXI.Texture.from(alienImages[i]);
//      textureArray.push(texture);
// };

// //BYKE PL1
// let FAST1 = new PIXI.AnimatedSprite(textureArray);
    
//     FAST1.anchor.set(0.5);
//     FAST1.width = window.innerWidth/5.5;
//     FAST1.height = window.innerHeight/10;
//     FAST1.x = window.innerWidth/2.65;
//     FAST1.y = window.innerHeight/4.1;
//     FAST1.autoUpdate = true;
//     // FAST1.scale.set(1, 1);
//     FAST1.animationSpeed = 1;
//     app.stage.addChild(FAST1);
//     FAST1.loop = true;
//     FAST1.play();
    
const FAST1 =  PIXI.Sprite.from('../assets/FAST1.png');
    app.stage.addChild(FAST1);
    FAST1.anchor.set(0.5);
    FAST1.x=window.innerWidth/2.65;
    FAST1.y=window.innerHeight/4;
    FAST1.width = window.innerWidth/5.5;
    FAST1.height = window.innerHeight/10;


//PL1 - YELLOW
const Player1 =  PIXI.Sprite.from('../assets/Player.png');
    app.stage.addChild(Player1);
    Player1.anchor.set(0.5);
    Player1.x=window.innerWidth/3;
    Player1.y=window.innerHeight/5;
    Player1.width = window.innerWidth/20;
    Player1.height = window.innerHeight/4.25;

function addCar1(){
    app.stage.addChild(FAST1);
}

function removeCar1(){
    app.stage.removeChild(FAST1);
}

function addPlayer1(){
    app.stage.addChild(Player1);
}

function removePlayer1(){
    app.stage.removeChild(Player1);
}

function updateState1(state){
    switch(state) {
        case 1 : // if (x === 'value1')
            addPlayer1();
            removeCar1();
        break;
        
        case 2 : // if (x === 'value2')
            addCar1();
            addPlayer1();
        break;
        
        default:
            removeCar1();
            removePlayer1();
        break;
    }
}


//PLAYER 2 - Do...
// let alienImages2 = [];
// for (let index = 1; index <= 83; index++) 
// {
//     alienImages2.push(`../assets/gifs/${index}.png`);
// }

// let textureArray2 = [];
// for (let i=0; i < alienImages2.length; i++)
// {
//      let texture = PIXI.Texture.from(alienImages2[i]);
//      textureArray2.push(texture);
// };

// //BYKE PL2 
// let FAST2 = new PIXI.AnimatedSprite(textureArray2);
//     FAST2.anchor.set(0.5);
//     FAST2.x=window.innerWidth/1.585;
//     FAST2.y=window.innerHeight/4;
//     FAST2.width = window.innerWidth/5.5;
//     FAST2.height = window.innerHeight/10;
//     FAST2.play();
//     FAST2.animationSpeed = 1;
//     app.stage.addChild(FAST2);
const FAST2 =  PIXI.Sprite.from('../assets/FAST2.png');
    app.stage.addChild(FAST2);
    FAST2.anchor.set(0.5);
    FAST2.x=window.innerWidth/1.585;
    FAST2.y=window.innerHeight/4;
    FAST2.width = window.innerWidth/5.5;
    FAST2.height = window.innerHeight/10;

//PL2 - GREEN
const Player2 =  PIXI.Sprite.from('../assets/Player2.png');
    app.stage.addChild(Player2);
    Player2.anchor.set(0.5);
    Player2.x=window.innerWidth/1.48;
    Player2.y=window.innerHeight/5;
    Player2.width = window.innerWidth/20;
    Player2.height = window.innerHeight/4.25;

function addCar2(){
    app.stage.addChild(FAST2);
}

function removeCar2(){
    app.stage.removeChild(FAST2);
}

function addPlayer2(){
    app.stage.addChild(Player2);
}

function removePlayer2(){
    app.stage.removeChild(Player2);
}

function updateState2(state){
    switch(state) {
        case 1 : // if (x === 'value1')
            addPlayer2();
            removeCar2();
        break;
        
        case 2 : // if (x === 'value2')
            addCar2();
            addPlayer2();
        break;
        
        default:
            removeCar2();
            removePlayer2();
        break;
        }
}


//After add code...
//BYKE PL3
const FAST3 =  PIXI.Sprite.from('../assets/FAST3.png');
    app.stage.addChild(FAST3);
    FAST3.anchor.set(0.5);
    FAST3.x=window.innerWidth/2.65;
    FAST3.y=window.innerHeight/1.82;
    FAST3.width = window.innerWidth/5.5;
    FAST3.height = window.innerHeight/10;

//PL3 - BLUE
const Player3 =  PIXI.Sprite.from('../assets/Player3.png');
    app.stage.addChild(Player3);
    Player3.anchor.set(0.5);
    Player3.x=window.innerWidth/3;
    Player3.y=window.innerHeight/2;
    Player3.width = window.innerWidth/20;
    Player3.height = window.innerHeight/4.25;

function addCar3(){
    app.stage.addChild(FAST3);
}

function removeCar3(){
    app.stage.removeChild(FAST3);
}

function addPlayer3(){
    app.stage.addChild(Player3);
}

function removePlayer3(){
    app.stage.removeChild(Player3);
}

function updateState3(state){
    switch(state) {
        case 1 : // if (x === 'value1')
            addPlayer3();
            removeCar3();
        break;
        
        case 2 : // if (x === 'value2')
            addCar3();
            addPlayer3();
        break;
        
        default:
            removeCar3();
            removePlayer3();
        break;
    }
}


//PLAYER 4 - Do...
// let alienImages4 = [];
// for (let index = 1; index <= 83; index++) 
// {
//     alienImages4.push(`../assets/gifs/${index}.png`);
// }

// let textureArray4 = [];
// for (let i=0; i < alienImages4.length; i++)
// {
//      let texture = PIXI.Texture.from(alienImages4[i]);
//      textureArray4.push(texture);
// };

// //BYKE PL4
// let FAST4 = new PIXI.AnimatedSprite(textureArray4);
//     FAST4.anchor.set(0.5);
//     FAST4.x=window.innerWidth/1.585;
//     FAST4.y=window.innerHeight/1.82;
//     FAST4.width = window.innerWidth/5.5;
//     FAST4.height = window.innerHeight/10;
//     FAST4.play();
//     FAST4.animationSpeed = 1;
//     app.stage.addChild(FAST4);

const FAST4 =  PIXI.Sprite.from('../assets/FAST4.png');
    app.stage.addChild(FAST4);
    FAST4.anchor.set(0.5);
    FAST4.x=window.innerWidth/1.585;
    FAST4.y=window.innerHeight/1.82;
    FAST4.width = window.innerWidth/5.5;
    FAST4.height = window.innerHeight/10;

//PL4 - PURPLE
const Player4 = PIXI.Sprite.from('../assets/Player4.png');
    app.stage.addChild(Player4);
    Player4.anchor.set(0.5);
    Player4.x=window.innerWidth/1.48;
    Player4.y=window.innerHeight/2;
    Player4.width = window.innerWidth/20;
    Player4.height = window.innerHeight/4.25;

function addCar4(){
    app.stage.addChild(FAST4);
}

function removeCar4(){
    app.stage.removeChild(FAST4);
}

function addPlayer4(){
    app.stage.addChild(Player4);
}

function removePlayer4(){
    app.stage.removeChild(Player4);
}

function updateState4(state){
    switch(state) {
        case 1 : // if (x === 'value1')
            addPlayer4();
            removeCar4();
        break;
        
        case 2 : // if (x === 'value2')
            addCar4();
            addPlayer4();
        break;
        
        default:
            removeCar4();
            removePlayer4();
        break;
    }
}

//Resize WINDOW!!!
function resize() {
  
    app.view.style.width = window.innerWidth + 'px';
    app.view.style.height = window.innerHeight + 'px';
  }
    window.onresize = resize;

//     PIXI.loader.add('my-image',"https://i.imgur.com/JaBEvbC.png").load(setup);

//     function setup() {
      
//       image = PIXI.Sprite.fromImage('my-image');
//       image.x = renderer.width / 2;
//       image.y = renderer.height / 2;
//       image.anchor.set(0.5);
      
//       image.height = $(window).height();
//       image.width = $(window).width();
      
//       stage.addChild(image);
//       renderer.render(stage);
  
//      setTimeout(() => animationLoop(), 2500) 
//     }
  
//     function animationLoop() {
//       requestAnimationFrame(animationLoop);
//       scale -= 0.005;
//       scale = scale < 1 ? 1.5 : scale;
//       image.scale.set(scale);
//       renderer.render(stage);
//     }
//   });



//   <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.3/pixi.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

// <div align="center" id="display">
// </div>