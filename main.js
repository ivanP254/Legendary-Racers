"use strict";
// game definitions
const FIELD_SIZE = 1000;
const SIDE_A_BIAS = FIELD_SIZE / 2;
const SIDE_B_BIAS = FIELD_SIZE / 20;
const SPEED = 3;
const MAX_ANGLE = Math.PI / 180;	// Math.PI / 180 = 1 degree
var Victor = require('victor');
// one player instance
// touch nothing here
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
        this.mouse = new Victor(SIDE_A_BIAS, SIDE_A_BIAS);
        this.oldPos = Victor.fromObject(this.pos);
    }
    updateMouse(x, y) {
        this.mouse = new Victor(x, y);
    }
    updatePos() {
        if (!(this.isFailed)) {
            this.oldPos.copy(this.pos);
            this.pos.add(this.dir);
        }
    }
    updateDir() {
        if (!(this.isFailed)) {
            let newDir = Victor.fromObject(this.mouse);
            newDir.subtract(this.pos);
            let newAng = newDir.angle() - this.dir.angle();
            if (Math.abs(newAng) > Math.PI) {
                newAng -= Math.PI * 2;
            }
            let sign = 1;
            if (newAng < 0) {
                sign = -1;
            }
            newAng = Math.abs(newAng);
            if (newAng > MAX_ANGLE) {
                newAng = MAX_ANGLE;
            }
            ;
            this.dir.rotate(sign * newAng);
        }
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
	
	// call this function to make one game-step
    update() {
        for (let idx = 0; idx < this.players.length; idx++) {
            if (!(this.players[idx].isFailed)) {
                this.players[idx].updatePos();
                this.players[idx].updateDir();
                // прямую хуйнуть разделенную на speed точек и вот так далее
                let step = this.players[idx].pos.clone().subtract(this.players[idx].oldPos).divide(new Victor(SPEED * 1000, SPEED * 1000));
                let stepPos = this.players[idx].oldPos.clone();
                for (let i = 0; i < SPEED; i++) {
                    if (this.field[Math.floor(stepPos.x)][Math.floor(stepPos.y)] == 0 ||
                        this.field[Math.floor(stepPos.x)][Math.floor(stepPos.y)] == this.players[idx].id) {
                        this.field[Math.floor(stepPos.x)][Math.floor(stepPos.y)] = this.players[idx].id;
                    }
                    else {
                        this.players[idx].setFail();
                        this.failedAmount++;
                        break;
                    }
                    stepPos.add(step);
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
}
