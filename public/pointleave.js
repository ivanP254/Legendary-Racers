
const socket = io(`http://${myip}:3003`);
//socket.on('join reply', JoinReplyProc);
//socket.on('join reply', JoinReplyProc);

function setup() {
	console.log('was set up');
	socket.emit('set location', loc);
}


//socket.on('join reply', JoinReplyProc);
socket.on('PlayerLobbyStateSet', UpdateStatusPL);
socket.on('start', JoinGame);
socket.on('lobby kick', OnLobbyKick);

function JoinGame() {
	window.location.href = `http://${myip}:3003/Game.html`;
}

function OnLobbyKick() {
    window.location.href = `http://${myip}:3003`;
}

const textureButton1 = PIXI.Texture.from('../assets/LEAVE.png');
const textureButtonDown1 = PIXI.Texture.from('../assets/LEAVE2.png');


var ready = false;

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

    // add it to the stage
    app.stage.addChild(button1);

// set some silly values...
// buttons1[0].scale.set(1.2);

function LeaveHitHandler() {
	console.log('hit leave');
	socket.emit('leave', 1);
	ready = false;
	window.location.href = `http://${myip}:3003`;
}

function onButtonDown1() {
	LeaveHitHandler();
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

const textureButton = PIXI.Texture.from('../assets/Ready.png');
const textureButtonDown = PIXI.Texture.from('../assets/Ready2.png');

	const button = new PIXI.Sprite(textureButton);
	button.cursor = 'hover';

	button.anchor.set(0.5);
	button.x = window.innerWidth / 2.6;
	button.y = window.innerHeight / 1.3;

	button.width = window.innerWidth / 5;
	button.height = window.innerHeight / 5;

	// make the button interactive...
	button.interactive = true;

	button
		.on('pointerdown', onButtonDown)
		
	// add it to the stage
	app.stage.addChild(button);

// set some silly values...
// buttons[0].scale.set(1.2);


function ReadyHitHandler() {
	ready = !ready;
	console.log('hit ready');
	socket.emit('ready', ready);
}

let isready = false;

function onButtonDown() {
	
    if (!isready){
        this.texture = textureButtonDown;
        ReadyHitHandler();
    }
    else if (isready) {
        this.texture = textureButton;
		ReadyHitHandler();
    }
     isready = !isready;
         // отправить новое состояние на сервер
         //обновить все картинки
}


function UpdateStatusPL(reply){
	console.log(reply);

switch(reply.slice(1)) {//СТАТУС ИГРОКА
    case 'ready':
        switch (reply[0]){//НОМЕР ИГРОКА
            case '1':
            updateState1(2);
            console.log(reply[0]);
        	break;

            case '2' : // if (x === 'value2')
			updateState2(2);
            console.log(reply[0]);
        	break;

			case '3' : // if (x === 'value2')
			updateState3(2);
            console.log(reply[0]);
    		break;

			case '4' : // if (x === 'value2')
			updateState4(2);
            console.log(reply[0]);
        	break;}
		break; 

	case 'not ready':
		switch (reply[0]){//НОМЕР ИГРОКА
			case '1':
			updateState1(1);
            console.log(reply[0]);
        	break;

			case '2':
				updateState2(1);
				console.log(reply[0]);
        	break;

			case '3':
				updateState3(1);
				console.log(reply[0]);
       		break;

			case '4':
				updateState4(1);
				console.log(reply[0]);
        	break;
		    }
		break;

	case 'empty':
		switch (reply[0]){//НОМЕР ИГРОКА
			case '1':
			updateState1(0);
            console.log(reply[0]);
        	break;

			case '2':
				updateState2(0);
				console.log(reply[0]);
        	break;

			case '3':
				updateState3(0);
				console.log(reply[0]);
       		break;

			case '4':
				updateState4(0);
				console.log(reply[0]);
        	break;
		    }
		}
}
