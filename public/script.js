

const socket = io(`http://${myip}:3003`);
socket.on('join reply', JoinReplyProc);

function setup() {
    console.log('was set up');
    socket.emit('set location', loc);
}

//function HostHitHandler() {
//    socket.emit('HostHit', 1);
//    console.log('HostHit');
//}

function JoinHitHandler() {
    socket.emit('JoinHit', 1);
    console.log('JoinHit');
}

function JoinReplyProc(reply) {
    console.log(reply);
    if (reply == 'may join')
        window.location.href = `http://${myip}:3003/lobby.html`;

    else if (reply == 'Room is full'){

        const Nig =  PIXI.Sprite.from('../assets/gg.jpg');

        app.stage.addChild(Nig);
        
        Nig.anchor.set(0.5);
        Nig.x=window.innerWidth/2;
        Nig.y=window.innerHeight/2;
        
        Nig.width = window.innerWidth/5;
        Nig.height = window.innerHeight/5;
    }
}

//var ready = false;
//
//function ReadyHitHandler() {
//    ready = !ready;
//    console.log('hit ready');
//    socket.emit('ready', ready);
//}

//function LeaveHitHandler() {
//    console.log('hit leave');
//    window.location.href = `http://${myip}:3000`;
//    socket.emit('leave', 1);
//    ready = false;}

