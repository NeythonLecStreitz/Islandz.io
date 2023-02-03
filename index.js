const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const player = new Player({
    position: {
        x: (Math.floor(canvas.width / 50) / 2) * 50 -25,
        y: (Math.floor(canvas.height / 50) / 2) * 50 -25
    },
    radius: 25,
    color: 'blue'
})

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
    c.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate)
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
        case 'w': return move("w");
        case 'a': return move("a");
        case 's': return move("s");
        case 'd': return move("d");
      }  
    };
  })(true), false);
  
function move(direction) {
    console.log(direction)
    switch(direction) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
}