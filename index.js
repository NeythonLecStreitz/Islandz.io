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
        player.position.y -= player.speed
        player.image.rotate(Math.PI)
    }
    else if (keys.a.pressed && lastKey === 'a'){
        player.position.x -= player.speed
    }
    else if (keys.s.pressed && lastKey === 's'){
        player.position.y += player.speed
    }
    else if (keys.d.pressed && lastKey === 'd'){
        player.position.x += player.speed
    }
    update_position_http('none')
}
animate()

let lastKey = ''
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            y -= 1
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            x -= 1
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            y += 1
            lastKey = 's'
            break
        case 'd':
            x += 1
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
function update_position_http(direction) {

    // Immediately move the player, to avoid lag
    // move(direction);

    // Set up the move JSON protocol
    var json = JSON.stringify({action: "move", direction: direction, current_position: {x : player.position.x, y: player.position.y, z: player.position.z}});
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
            // x = response["current_position"]["x"];
            // y = response["current_position"]["y"];
            // z = response["current_position"]["z"];
        }
    }
    return false;
}