
const app = new PIXI.Application({
    width: 500,
    height: 500,
    transparent: false,
    antialis: false,
    // resolution: window.devicePixelRatio|| 1
});


  document.querySelector('.container').appendChild(app.view);
  const videoRef = document.querySelector("video");
  
    const texture = PIXI.Texture.from(videoRef);
    const videoSprite = new PIXI.Sprite(texture);
   
    app.stage.addChild(videoSprite);
    app.renderer.resize(window.innerWidth, window.innerHeight);
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    const background = PIXI.Sprite.from('../assets/Ton.png');
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
    
    background.phase = 0;

  const textureButton = PIXI.Texture.from('../assets/button1n.png');
  const textureButtonDown = PIXI.Texture.from('../assets/button2.png');
 
      const button = new PIXI.Sprite(textureButton);
      button.cursor = 'hover';
      button.anchor.set(0.5);
      button.x=window.innerWidth/2;
      button.y=window.innerHeight/2;
      button.width = window.innerWidth/6;
      button.height = window.innerHeight/6;
  
      // make the button interactive...
      button.interactive = true;
      button.buttonMode = true;
  
      button
          .on('pointerdown', onButtonDown)
         
      // add it to the stage
      app.stage.addChild(button);

  // set some silly values...
  // buttons[0].scale.set(1.2);
  
  function onButtonDown() {
      JoinHitHandler();
      this.isdown = true;
      this.texture = textureButtonDown;
      this.alpha = 1;
  }

  const myText =  PIXI.Sprite.from('../assets/LEGEND3.png');
  app.stage.addChild(myText);
  myText.anchor.set(0.5);
  myText.x=window.innerWidth/2;
  myText.y=window.innerHeight/5.5;
  myText.width = window.innerWidth/3;
  myText.height = window.innerHeight/7;


  const defaultIcon = "url('../assets/disk2.png') 2 2, auto";
  const hoverIcon = "url('../assets/disk1.png') 2 2, auto";
  app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
  app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;


  //Resize WINDOW!!!
function resize() {
  
  app.view.style.width = window.innerWidth + 'px';
    app.view.style.height = window.innerHeight + 'px';
}
  window.onresize = resize;