const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Player Position
var x = 0;
var y = 0;
var z = 0;
// Server URL + Port
const url='http://147.182.246.194:8008';

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const player = new Player()
console.log(player)

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    if (keys.w.pressed && lastKey === 'w') {
        player.position.y -= 50
        keys.w.pressed = false          
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.position.x -= 50
        keys.a.pressed = false
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.position.y += 50
        keys.s.pressed = false
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.position.x += 50
        keys.d.pressed = false
    }
}
animate()

let lastKey = ''
window.addEventListener("keydown", (function(canMove) {
    return function(e) {
      if (!canMove) return false;
      canMove = false;
      setTimeout(function() { canMove = true; }, 150);
      switch (e.key) {
        case 'w': return move_http("up");
        case 'a': return move_http("left");
        case 's': return move_http("down");
        case 'd': return move_http("right");
      }  
    };
  })(true), false);

function move_http(direction) {
    // Set up the move JSON protocol
    var json = JSON.stringify({action: "move", direction: direction, current_position: {x : x, y: y, z: z}});

    // Immediately move the player, to avoid lag
    move(direction);

    var httpreq = new XMLHttpRequest();
    
    httpreq.open('POST', url);
    httpreq.setRequestHeader("Content-Type", "application/json");
    httpreq.setRequestHeader("Accept", "application/json");
    httpreq.send(json);
    console.log("old:");
    console.log(json);

    

    httpreq.onreadystatechange = function() {
        if (httpreq.readyState == XMLHttpRequest.DONE) {
            console.log("new:");
            console.log(httpreq.responseText);
            response = JSON.parse(httpreq.responseText);
            x = response["current_position"]["x"];
            y = response["current_position"]["y"];
            z = response["current_position"]["z"];
            move(direction);
        }
    }
    return false;
}
  
function move(direction) {
    console.log(direction)
    switch(direction) {
        case 'up':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'left':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'down':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'right':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
}