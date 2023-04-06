let app = new PIXI.Application({width: window.innerWidth, 
	height: window.innerHeight,
	autoResize: true,
	resolution: devicePixelRatio,
    antialias: true });
document.body.appendChild(app.view);

var field = PIXI.Sprite.from('../assets/grid.png');
app.renderer.resize(window.innerWidth, window.innerHeight);
field.width = app.screen.width;
field.height = app.screen.height;
field.phase = 0;
app.renderer.view.style.position = 'absolute';
// Get the texture for rope.
// const sprite = PIXI.Sprite.from('bb.png');
// const landscapeTexture = PIXI.Sprite.from('back1.jpg');
// landscapeTexture.width = app.screen.width;
// landscapeTexture.height = app.screen.height;




app.stage.addChild(field);
var fieldRef = app.stage.getChildAt (0);

////////////////

var realPath1 = new PIXI.Graphics();
realPath1.lineStyle(20, 0xFFFF00, 1);
realPath1.filters = [new PIXI.filters.BlurFilter()];
app.stage.addChild(realPath1); 

var realPath1S = new PIXI.Graphics();
realPath1S.lineStyle(8, 0xFFFF00, 1);
app.stage.addChild(realPath1S);


////////////////
var realPath2 = new PIXI.Graphics();
realPath2.lineStyle(20, 0x39FF14, 1);
realPath2.filters = [new PIXI.filters.BlurFilter()];
app.stage.addChild(realPath2); 

var realPath2S = new PIXI.Graphics();
realPath2S.lineStyle(8, 0x39FF14, 1);
app.stage.addChild(realPath2S);


////////////////
var realPath3 = new PIXI.Graphics();
realPath3.lineStyle(20, 0x1CDAFF, 1);
realPath3.filters = [new PIXI.filters.BlurFilter()];
app.stage.addChild(realPath3); 

var realPath3S = new PIXI.Graphics();
realPath3S.lineStyle(8, 0x1CDAFF, 1);
app.stage.addChild(realPath3S);


////////////////
var realPath4 = new PIXI.Graphics();
realPath4.lineStyle(20, 0xF71AFF , 1);
realPath4.filters = [new PIXI.filters.BlurFilter()];
app.stage.addChild(realPath4);

var realPath4S = new PIXI.Graphics();
realPath4S.lineStyle(8, 0xF71AFF, 1);
app.stage.addChild(realPath4S);
//app.stage.addChild(testPath1);

// add background to stage...
//app.stage.addChild(landscapeTexture);

const points = [];

// field.x = app.screen.width / 1;
// field.y = app.screen.height / 9;
// field.width = app.screen.width / 1.15;
// field.height = app.screen.height / 1.15;

var point = 0;
var interval;

var lastAdded;

var initialized1 = false;
var initialized2 = false;
var initialized3 = false;
var initialized4 = false;
var initialized1S = false;
var initialized2S = false;
var initialized3S = false;
var initialized4S = false;
var cached_path1;
var cached_path2;
var cached_path3;
var cached_path4;
var cached_path1S;
var cached_path2S;
var cached_path3S;
var cached_path4S;




var i = 1;
function AddPoint(point, player)
{
  let thisInitialized = true;

    var path_to_add;  
    var cache_to_add;
    var path_to_add2;  
    var cache_to_add2;
    if (player == 1)
    {
      if(initialized1==false)
        {
          realPath1.clear();
          cached_path1 = {'x':point.x, 'y':point.y};
          realPath1.x = point.x;
          realPath1.y = point.y;
          cached_path1S = {'x':point.x, 'y':point.y};
          realPath1S.x = point.x;
          realPath1S.y = point.y;
          initialized1 = true;
          thisInitialized = false;
        }

      path_to_add = realPath1;
      cache_to_add = cached_path1;
      path_to_add2 = realPath1S;
      cache_to_add2 = cached_path1S;
    }
    else {

      if (player == 2)
      {
        if(initialized2==false)
          {
            realPath2.clear();
            cached_path2 = {'x':point.x, 'y':point.y};
            realPath2.x = point.x;
            realPath2.y = point.y;
            cached_path2S = {'x':point.x, 'y':point.y};
            realPath2S.x = point.x;
            realPath2S.y = point.y;
            initialized2 = true;
            thisInitialized = false;
          }
        path_to_add = realPath2;
        cache_to_add = cached_path2;
        path_to_add2 = realPath2S;
        cache_to_add2 = cached_path2S;
      }
      else {

        if (player == 3)
        {
          if(initialized3==false)
          {
            realPath3.clear();
            cached_path3 = {'x':point.x, 'y':point.y};   
            realPath3.x = point.x;
            realPath3.y = point.y;
            cached_path3S = {'x':point.x, 'y':point.y};
            realPath3S.x = point.x;
            realPath3S.y = point.y;
            initialized3 = true;
            thisInitialized = false;
          }
          path_to_add = realPath3;
          cache_to_add = cached_path3;
          path_to_add2 = realPath3S;
          cache_to_add2 = cached_path3S;
        }
        else {

          if (player == 4)
          {
            if(initialized4==false)
            {
              realPath4.clear();
              cached_path4 = {'x':point.x, 'y':point.y};       
              realPath4.x = point.x;
              realPath4.y = point.y;
              cached_path4S = {'x':point.x, 'y':point.y};
              realPath4S.x = point.x;
              realPath4S.y = point.y;
              initialized4 = true;
              thisInitialized = false;
            }
            path_to_add = realPath4;
            cache_to_add = cached_path4;
            path_to_add2 = realPath4S;
            cache_to_add2 = cached_path4S;
          }
          else {
            console.log('oshybka');
          }
        }
      }
    }

    //path_to_add.lineStyle(2, 0xFFFFFF, 1);
    //path_to_add.lineTextureStyle({width: 20, texture: sprite.texture});
    
    
    var X = fieldRef.x + (point.x * fieldRef.width);
    var Y = fieldRef.y + (point.y * fieldRef.height);
    
    
    path_to_add.beginFill(0xFF0000, 1);
    
    if(thisInitialized){
      path_to_add.moveTo(cache_to_add.x, cache_to_add.y);
      path_to_add2.moveTo(cache_to_add2.x, cache_to_add2.y);
         
      path_to_add.lineTo(X, Y);
      path_to_add.endFill();

      path_to_add2.lineTo(X, Y);
      path_to_add2.endFill();
    }
 

    //console.log(path_to_add);

    cache_to_add.x = X;
    cache_to_add.y = Y;
    cache_to_add2.x = X;
    cache_to_add2.y = Y;
  }


function AcceptPosData(data)		///data {"player":2, "x":34, "y":456}
{
  var player = data["player"];
  AddPoint({'x':data["x"],'y':data["y"]*0.72}, player);
}


const socket = io(`http://${myip}:3003`);
socket.on("NewPosition", AcceptPosData);
socket.on('game kick', OnPlayerKick);
socket.on('position update', AcceptPosData);
socket.on("Score", UpdetePlScores);

//socket.on("NewPosition", AddPositionData);

function setup() {
	console.log('Sent to server new location');
	socket.emit('set location', loc);
}

function OnPlayerKick() {
	window.location.href = `http://${myip}:3003`;
}


function SendMouseData(e) {
	socket.emit("mouse pos change", { x: (e.pageX-fieldRef.x)/fieldRef.width, y: (e.pageY-fieldRef.y)/fieldRef.height * 1.36 });

}

app.renderer.resize(window.innerWidth, window.innerHeight);

function resize() {
  
    app.view.style.width = window.innerWidth + 'px';
      app.view.style.height = window.innerHeight + 'px';
  
  }
window.onresize = resize;

function UpdetePlScores(Score) {//Принимаем счет игроков!!!

	const style1 = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 110,
    fill: ['#000000'],
		fontWeight: 'bold',
		stroke: '#ffd700',
    strokeThickness: 10
	});

	const style2 = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 110,
    fill: ['#000000'],
		fontWeight: 'bold',
		stroke: 0x39FF14,
    strokeThickness: 10
	});

	const style3 = new PIXI.TextStyle({
    fontFamily: 'Arial',
		fontSize: 110,
    fill: ['#000000'],
		fontWeight: 'bold',
		stroke: 0x1CDAFF,
    strokeThickness: 10
	});

	const style4 = new PIXI.TextStyle({
    fontFamily: 'Arial',
		fontSize: 110,
    fill: ['#000000'],
		fontWeight: 'bold',
		stroke: 0xF71AFF,
    strokeThickness: 10
	});
  
	const Text1 = new PIXI.Text(Score['1'], style1);
  // Text1.anchor.set(0.5);
	Text1.x=window.innerWidth/14;
  Text1.y=window.innerHeight/1.28;
	app.stage.addChild(Text1);

	const Text2 = new PIXI.Text(Score['2'], style2);
	Text2.x=window.innerWidth/4;
	Text2.y=window.innerHeight/1.28;
	app.stage.addChild(Text2);

	const Text3 = new PIXI.Text(Score['3'], style3);
	Text3.x=window.innerWidth/1.36;
	Text3.y=window.innerHeight/1.28;
	app.stage.addChild(Text3);

	const Text4 = new PIXI.Text(Score['4'], style4);
	Text4.x=window.innerWidth/1.1;
	Text4.y=window.innerHeight/1.28;
	app.stage.addChild(Text4);

  ClerBack();
}


function ClerBack() {
	realPath1.clear();
  realPath1S.clear();
  realPath2.clear();
  realPath2S.clear();
  realPath3.clear();
  realPath3S.clear();
  realPath4.clear();
  realPath4S.clear();

  initialized1 = false;
  initialized2 = false;
  initialized3 = false;
  initialized4 = false;
}
