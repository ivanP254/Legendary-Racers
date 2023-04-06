


const socket = io(`http://${myip}:3003`);

socket.on('game kick', OnPlayerKick);
socket.on('position update', RecievePlayerPosition);

socket.on("NewPosition", AddPositionData);

function setup() {
	console.log('Sent to server new location');
	socket.emit('set location', loc);
}

function AddPositionData(data)
{
	console.log("player "+ data.player + " moved to (" + data['x'] + ", " + data['y'] + ")");
}

function OnPlayerKick() {
	window.location.href = `http://${myip}:3003`;
}

function SendMouseData(e) {
	//socket.emit("mouse pos change", { x: e.pageX/window.screen.width, y: e.pageY/window.screen.height });
	socket.emit("mouse pos change", { x: e.pageX/appEl.getBoundingClientRect().width, y: e.pageY/appEl.getBoundingClientRect().height });
}

const appEl = document.getElementById('root');
console.log(appEl.getBoundingClientRect())

function RecievePlayerPosition(posData) {
	console.log("player " + posData["player"] + " moved to (" + posData.x + ", " + posData.y + ")");
}

//function doStuff() {
//	console.log("hello!");
//}
//setInterval(doStuff, 5000);
//async function ExecuteDelayed() {
//		
//	setTimeout(() => {			
//			console.log("hype");
//		}, 500);
//}
//

//