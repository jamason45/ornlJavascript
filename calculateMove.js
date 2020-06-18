function startMissle(){
//Draw canvas
var canvas = document.getElementById('canvas');
var test = document.getElementById('test');
var ctx = canvas.getContext('2d');

//Draw the colored rectangles on the screen
function drawDot(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x - 2, y - 2, 8, 8);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
//Draw all 4 colored rectangles 
    drawDot("red", obj.pos.x, obj.pos.y);
    drawDot("white", obj.start.x, obj.start.y);
    drawDot("green", obj.dest.x, obj.dest.y);
    drawDot("yellow", obj.stopLocation.x, obj.stopLocation.y);
   
    var dx = obj.pos.x - obj.start.x,
        dy = obj.pos.y - obj.start.y,
        dist = Math.sqrt(dx * dx + dy *dy),
        v = obj.velocity,
        speed = Math.sqrt(v.x * v.x + v.y * v.y);
   
   //Draw text for Speed and distance 
    ctx.fillText("distance traveled: " + dist.toFixed(5), 20, 400);
    ctx.fillText("speed:             " + speed.toFixed(5), 20, 420);
    //ctx.fillText("time:  "+ 20, 20, 440);
   
}
//Set starting and ending points for the projectile and ending rectangles 
var obj = {
    start: { x: 480, y: 230 },
    stopDist: 350,
    dest: { x: 50, y: 330 },
    lastTime: new Date().getTime(),
    startSpeed: 0.05,
    destSpeed: 0.1,
    pos: null,
    velocity: null,
    destVelocity: null,
    acceleration: null
};

function sign(value) {
    return value > 0 ? 1 : (value < 0 ? -1 : 0);
}
//If projectile has reached, show speed on when the projectile reached the target 
function reached(start, current, dest) {
   
    return current === dest || sign(current - dest) === sign(dest - start);
}
//calculate velocity and call Draw function 
function frame() {
    var t = new Date().getTime(),
        tDelta = t - obj.lastTime,
        v = obj.velocity,
        destv = obj.destVelocity,
        startv = obj.startVelocity;
    obj.lastTime = t;
    obj.pos.x += v.x * tDelta;
    obj.pos.y += v.y * tDelta;
   
    if (!reached(startv.x, v.x, destv.x) ||
        !reached(startv.y, v.y, destv.y)) {
        v.x += obj.acceleration.x * tDelta;
        v.y += obj.acceleration.y * tDelta;
    }
   
    draw();
   
    setTimeout(frame, 1);
}
// velocity 
function calcAcceleration(p0, pf, v0, vf) {
    var vDelta = vf - v0;
   
    return pf ===  p0  ? 0 : (2 * v0 * vDelta + vDelta * vDelta) / (2 * (pf - p0));
}

//Start the projectile launch process 
function start() {
     // positions and deltas
       var start = obj.start,
        dest = obj.dest,
        dx = dest.x - start.x,
        dy = dest.y - start.y,
        totalDistance = Math.sqrt(dx * dx + dy * dy);
   
    // x and y component ratio
    var cx = dx / totalDistance,
        cy = dy / totalDistance;
   
    var stopLocation = { x: cx * obj.stopDist + start.x,
                         y: cy * obj.stopDist + start.y };
   
    // velocities
    var startSpeed = obj.startSpeed,
        destSpeed = obj.destSpeed,
        startVelocity = { x: cx * startSpeed, y: cy * startSpeed },
        endVelocity = { x: cx * destSpeed, y: cy * destSpeed };
    console.log(startVelocity);
    console.log(endVelocity);
   
     //stop the red rectangle
     if(startVelocity == 0.1000){
          ctx.fillText("time End:  "+ 20, 20, 460);
        }

    // acceleration
    var acceleration = {
        x: calcAcceleration(start.x, stopLocation.x, startVelocity.x, endVelocity.x),
        y: calcAcceleration(start.y, stopLocation.y, startVelocity.y, endVelocity.y)
    };

    obj.pos = Object.create(start);
    obj.startVelocity = startVelocity;
    obj.velocity = Object.create(startVelocity);
    obj.stopLocation = stopLocation;
    obj.destVelocity = endVelocity;
    obj.acceleration = acceleration;
   
    frame();
}

start();
}