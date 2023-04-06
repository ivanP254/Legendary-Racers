var express = require('express');
var app = express();
var server = app.listen(3003);
app.use(express.static('public'));
var curPlayerNumber = 1;

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

var state = "Waiting";		//possible setver states "Waiting", "InGame", "InGameLocked"

const players = new Map();	//possible states 'not ready', 

console.log("server running");
var RoundWaitingTime = 2000;

var RoundWaitingTime = 2000;
var PlayerScores;
var WinningScore = 5;
function ResetPlayerScores() {
	PlayerScores = { "1": 0, "2": 0, "3": 0, "4": 0 };
}


// game definitions
const FIELD_SIZE = 10000;
const SIDE_A_BIAS = FIELD_SIZE / 2;
const SIDE_B_BIAS = FIELD_SIZE / 20;
const SPEED = 55;
//const MAX_ANGLE = (Math.PI / 180);	// Math.PI / 180 = 1 degree
//const MAX_ANGLE = Math.PI / 20;
const MAX_ANGLE = 0.3;
var Victor = require('victor');

var expectedPlayersInGame;
var currentPlayersInGame = 0;

class Player {
	constructor(id) {
		this.id = id;
		this.isFailed = false;
		switch (this.id) {
			case 1: {
				this.pos = new Victor(SIDE_A_BIAS, SIDE_B_BIAS);
				this.dir = new Victor(0, SPEED);
				break;
			}
			case 2: {
				this.pos = new Victor(SIDE_A_BIAS, FIELD_SIZE - SIDE_B_BIAS);
				this.dir = new Victor(0, -SPEED);
				break;
			}
			case 3: {
				this.pos = new Victor(FIELD_SIZE - SIDE_B_BIAS, SIDE_A_BIAS);
				this.dir = new Victor(-SPEED, 0);
				break;
			}
			case 4: {
				this.pos = new Victor(SIDE_B_BIAS, SIDE_A_BIAS);
				this.dir = new Victor(SPEED, 0);
				break;
			}
			default: {
				this.pos = new Victor(0, 0);
				this.dir = new Victor(0, 0);
				break;
			}
		}
		this.mouse = new Victor(FIELD_SIZE / 2, FIELD_SIZE / 2);
		this.oldPos = Victor.fromObject(this.pos);
	}
	updateMouse(x, y) {
		this.mouse = new Victor(x, y);
	}
	updateNormalizedMouse(x, y) {
		this.updateMouse(x * SPEED, y * SPEED);
	}
	updatePos() {
		if (!(this.isFailed)) {
			this.oldPos.copy(this.pos);
			this.pos.add(this.dir);
		}
	}
	updateDir() {
		const lerp = (x, y, a) => x * (1 - a) + y * a;
		const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
		const invlerp = (x, y, a) => clamp((a - x) / (y - x));
		const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
		if (!(this.isFailed)) {

			let newDir = Victor.fromObject(this.mouse);
			newDir.subtract(this.pos);
			//
			//
			//let newAng = newDir.angle() - this.dir.angle();
			//if (Math.abs(newAng) > Math.PI) {
			//	newAng -= Math.PI * 2;
			//}
			//let sign = 1;
			//if (newAng < 0) {
			//	sign = -1;
			//}
			//newAng = Math.abs(newAng);
			//if (newAng > MAX_ANGLE) {
			//	newAng = MAX_ANGLE;
			//};
			//if (this.dir.x < 0 && this.dir.y < 0 && newDir.y > 0) { sign *= -1; };
			//this.dir.rotate(sign * newAng);
			let turnDir = newDir.clone();
			newDir = newDir.normalize();
			this.dir = this.dir.normalize();


			let turnDirX = lerp(this.dir.x, newDir.x, MAX_ANGLE);
			let turnDirY = lerp(this.dir.y, newDir.y, MAX_ANGLE);
			turnDir.x = turnDirX;
			turnDir.y = turnDirY;
			this.dir.copy(turnDir.normalize().multiplyScalar(SPEED));

		}
	}

	getNormalizedPosX() {
		return this.pos.x / FIELD_SIZE;
	}

	getNormalizedPosY() {
		return this.pos.y / FIELD_SIZE;
	}

	setFail() {
		this.isFailed = true;
	}
}

// one game instance
// create this instance
class Game {
	constructor() {
		// game id
		this.failedAmount = 0;
		// players
		this.players = [];
		this.playersAmount = 0;
		this.field = [];
		for (let i = 0; i < FIELD_SIZE; i++) {
			this.field[i] = [];
			for (let j = 0; j < FIELD_SIZE; j++) {
				this.field[i][j] = 0;
			}
		}
		// todo delete (# // todel)
		//this.step = 0;
		this.substep = 0;
	}

	// function to add new player, work only if less then 4 already exist
	// id is from 1 to 4
	addPlayer() {
		if (this.players.length >= 4) {
			return false;
		}
		else {
			let newId = this.players.length + 1;
			this.players.push(new Player(newId));
			let coord = this.players[this.playersAmount].pos;
			this.field[Math.floor(coord.x)][Math.floor(coord.y)] = newId;
			this.playersAmount++;
		}
		return true;
	}

	// set new mouse position for player with id
	setMouse(id, x, y) {
		if (id >= 1 && id <= this.playersAmount) {
			this.players[id - 1].updateMouse(x, y);
		}
	}

	setNormalizedMouse(id, x, y) {
		if (id >= 1 && id <= this.playersAmount) {
			this.players[id - 1].updateMouse(x * FIELD_SIZE, y * FIELD_SIZE);
		}
		else {
			console.log("Wrong player at setNormalizedMouse");
		}
	}

	// call this function to make one game-step
	update() {
		//this.step++;
		for (let idx = 0; idx < this.players.length; idx++) {
			//console.log(`Step ${this.step}:\t Player ${idx + 1}:\t Is failed ${this.players[idx].isFailed}\t`)
			if (!(this.players[idx].isFailed)) {
				this.players[idx].updatePos();
				this.players[idx].updateDir();
				//let step = this.players[idx].pos.clone().subtract(this.players[idx].oldPos).divide(new Victor(SPEED * 1000, SPEED * 1000));
				//console.log("OldPos");
				//console.log(this.players[idx].oldPos);
				//console.log("Step");
				//console.log(step);
				const PRECISION = 10;
				let oldPos = this.players[idx].oldPos;
				let newPos = this.players[idx].pos;
				let xStep = (newPos.x - oldPos.x) / SPEED / PRECISION;
				let yStep = (newPos.y - oldPos.y) / SPEED / PRECISION;
				//console.log("x step " + xStep);
				//console.log(stepPos);
				//console.log(`X:${Math.floor(stepPos.x)},\tY ${Math.floor(stepPos.y)}`);
				var firstPass = true;
				var lastX = -1;
				var lastY = -1;
				for (let i = 0; i <= SPEED * PRECISION; i++) {
					let curPosX = Math.floor(oldPos.x + xStep * i);
					let curPosY = Math.floor(oldPos.y + yStep * i);
					//console.log("old y " + oldPos.y)
					//console.log("y step " + yStep)
					//console.log("i " + i)
					//console.log("curPosY " + curPosY)
					if (firstPass == true) {
						lastX = curPosX;
						lastY = curPosY;
						firstPass = false;
					}
					if (curPosX != lastX || curPosY != lastY) {
						if (curPosX < 0 || curPosX >= FIELD_SIZE || curPosY < 0 || curPosY >= FIELD_SIZE) {		//out of bounds
							this.players[idx].setFail();
							this.failedAmount++;
							break;
						}
						if (this.field[curPosX][curPosY] == 0) {
							this.field[curPosX][curPosY] = this.players[idx].id;
							//console.log("Colored " + curPosX + " " + curPosY);
						}
						else {
							//RETURN
							//console.log("failed with: curPos" + curPosX + ", " + curPosY + "and lastPos " + lastX + ", " + lastY);
							this.players[idx].setFail();
							this.failedAmount++;
							break;
						}
						lastX = curPosX;
						lastY = curPosY;
					}
					else {
						//console.log("last and current were ==")
					}
				}
			}
		}
	}

	// check if game ended
	isEnd() {
		if ((this.failedAmount + 1) >= this.playersAmount) {
			return true;
		}
		return false;
	}

	// <--
	getWinner() {
		for (let idx = 0; idx < this.players.length; idx++) {
			if (!(this.players[idx].isFailed)) {
				return idx + 1;
			}
		}
	}
}

var g = new Game();

function newConnection(socket) {

	var id = socket.id;

	var playerNumber = 0;

	socket.on("set location", (data) => {
		//console.log('set location blah blah');
		if (data == 'game') {
			if (state != "InGame") {
				io.to(id).emit('game kick', "");			//now allowed in
			}
			else {
				console.log("a player joined game");
				currentPlayersInGame++;
				//console.log("now " + currentPlayersInGame + " players in game");
				//console.log("expecting " + expectedPlayersInGame + " players in game");
				players.set(id, data);
				//console.log(`${currentPlayersInGame} curr`);
				//console.log(`${expectedPlayersInGame} exp`);
				if (currentPlayersInGame == expectedPlayersInGame) {
					//console.log('shietttt');
					StartGameRounds(players);
					currentPlayersInGame = 0;
					state = "InGameLocked";
				}
			}
		}
		if (data == 'lobby') {
			if (state != "InGame" && state != "InGameLocked") {					//not allowed in 
				console.log('joined lobby with id ' + id)
				players.set(id, 'not ready');
				OnLobbyPlayerChange(players);
			}
			else {
				io.to(id).emit('lobby kick', "");
			}
		}
	})

	socket.on('JoinHit', () => {
		var reply;
		console.log('Join Hit');
		if (state == "Waiting") {
			if (players.size < 4) {
				reply = 'may join';
				console.log(reply);
			}
			else {
				reply = 'Room is full';
				console.log(reply);
			}
		}
		else {
			if (state == "InGame" || state == "InGameLocked") {
				reply = 'Game is in progress';
				console.log(reply);
			}
		}
		io.to(id).emit('join reply', reply);
		console.log("\n");
	});

	socket.on("ready", (state) => {
		//console.log(Object.keys(io.sockets));
		//console.log(io.sockets.adapter.rooms);
		if (state == true)
			players.set(id, 'ready');
		else
			players.set(id, 'not ready');
		OnLobbyPlayerChange(players);
	})

	socket.on("leave", () => {
		console.log('Player left from lobby');
		players.delete(id);
		OnLobbyPlayerChange(players);
	})

	socket.on('disconnect', () => {
		var state = players.get(socket.id);
		players.delete(id);
		switch (state) {
			case 'ready':
				console.log('Player disconnected from lobby');
				OnLobbyPlayerChange(players);
				break;
			case 'not ready':
				console.log('Player disconnected from lobby');
				OnLobbyPlayerChange(players);
				break;
			case 1:
				console.log("Player 1 disconnected from game");
				CheckGameIntegrity();
				break;
			case 2:
				console.log("Player 2 disconnected from game");
				CheckGameIntegrity();
				break;
			case 3:
				console.log("Player 3 disconnected from game");
				CheckGameIntegrity();
				break;
			case 4:
				console.log("Player 4 disconnected from game");
				CheckGameIntegrity();
				break;
		}
	})

	socket.on("mouse pos change", (pos) => {
		//console.log("player " + players.get(id) + " moved mouse to (" + pos.x + ", " + pos.y + ")");
		g.setNormalizedMouse(players.get(id), pos.x, pos.y);

	})

	function OnLobbyPlayerChange(players) {
		if (state != "InGame" && state != "InGameLocked") {
			if (CheckGameReady()) {
				expectedPlayersInGame = players.size;
				BroadcastToPlayers("start", 0);
				//StartGame();
			} else {
				PrintLobbyPlayers();
				BroadcastToLobbyPlayers(players);
			}
		}
	}

	function CheckGameIntegrity() {
		if (state == "InGame" || state == "InGameLocked") {
			if (players.size < 2) {
				AbortGame();
			}
		}
	}
	function AbortGame() {
		clearInterval(sendingPositionIntervalID);
		clearInterval(gameLoopID);
		state = "Waiting";
		console.log("ABORTING GAME");
		players.forEach((valueInner, keyInner) => {
			io.to(keyInner).emit('game kick', "");
		})
	}

	function BroadcastToPlayers(first, second) {
		players.forEach((valueInner, keyInner) => {
			io.to(keyInner).emit(first, second);
		})
	}



	function BroadcastToLobbyPlayers(players) {
		var curPlayer = 1;
		players.forEach((valueOuter, keyOuter) => {
			if (valueOuter == 'ready' || valueOuter == 'not ready') {
				players.forEach((valueInner, keyInner) => {
					io.to(keyInner).emit('PlayerLobbyStateSet', curPlayer + valueOuter);
					//console.log(keyInner + ' recieved' + 'PlayerLobbyStateSet', curPlayer + valueOuter);
				})
			}
			curPlayer++;
		});


		for (; curPlayer < 5; curPlayer++) {
			players.forEach((valueInner, keyInner) => {
				io.to(keyInner).emit('PlayerLobbyStateSet', curPlayer + 'empty');
				//	console.log(keyInner + ' recieved' + 'PlayerLobbyStateSet', curPlayer + 'empty');
			})
		}
	}

	function PrintLobbyPlayers() {
		var ready = 0;
		var notReady = 0;
		players.forEach((value, key) => {
			if (value == 'ready') {
				ready++;
			}
			else {
				notReady++;
			}
		})
		console.log('there are ' + ready + ' ready players in lobby')
	}

	function CheckGameReady() {
		console.log("checking if game is ready...");
		if (players.size < 2) {
			console.log("too few players to start a game")
			return false;
		}
		for (const element of players) {
			console.log(element['0'] + " player is " + element['1']);
			if (element['1'] != 'ready') {
				console.log("Game not ready");
				return false;
			}
		}
		console.log("Game ready");
		state = "InGame";
		return true;
	}

	var sendingPositionIntervalID;
	var gameLoopID;

	function StartGame(players) {
		g = new Game();
		let s = 1;
		for (player of players) {
			players.set(player['0'], s);
			s++;
			g.addPlayer();
			console.log(g.players.length);
		}
		console.log("starting game...");
		for (const player of players) {
			console.log("Player " + player['0'] + " has number " + player['1']);
		}
		sendingPositionIntervalID = setInterval(SendNewPositions, 100);
		//console.log('set loop for upd8');
		gameLoopID = setInterval(upd8, 50);
	}

	function StartGameRounds(players) {
		ResetPlayerScores();

		if (PlayerScores['1'] < WinningScore && PlayerScores['2'] < WinningScore && PlayerScores['3'] < WinningScore && PlayerScores['4'] < WinningScore) {
			BroadcastToPlayers("Score", PlayerScores);
			console.log('start rounds');
			StartGame(players);
			BroadcastToPlayers("Clear", 0);
		}
		else {
			console.log("Game starting error");
		}
	}
	function ContinueGameRounds(players) {
		BroadcastToPlayers("Clear", 0);
		if (PlayerScores['1'] < WinningScore && PlayerScores['2'] < WinningScore && PlayerScores['3'] < WinningScore && PlayerScores['4'] < WinningScore) {
			setTimeout(OnGameContinuation, RoundWaitingTime);
		}
		else {
			setTimeout(OnGameAbortion, RoundWaitingTime);
		}
	}

	function OnGameContinuation() {
		BroadcastToPlayers("Score", PlayerScores);
		console.log('cont rounds');
		StartGame(players);
	}

	function OnGameAbortion() {
		ResetPlayerScores();
		AbortGame();
	}

	function upd8() {
		//console.log('calling upd8 from socket');
		g.update();
		if (g.isEnd()) {
			OnPlayerWin(g.getWinner());
			//OnPlayerWin(1);			//always sending that first player won
		}
	}

	function OnPlayerWin(player) {
		PlayerScores[player]++;
		clearInterval(gameLoopID);
		clearInterval(sendingPositionIntervalID);
		ContinueGameRounds(players);
		BroadcastToPlayers("Player won", player);
	}

	function SendNewPositions() {
		//console.log("sending...");
		players.forEach((valueInner, keyInner) => {
			g.players.forEach((elem) => {
				io.to(keyInner).emit('position update', { "player": elem.id, "x": elem.getNormalizedPosX(), "y": elem.getNormalizedPosY() });
			})
		})
	}
}
