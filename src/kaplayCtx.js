import kaboom from "kaplay"

export const scale = 2
export const k = kaboom({
    width: 480 * scale,
    height: 360 * scale,
    scale,
    maxFPS: 60,
    global: false,
/*    touchToMouse: true,*/
    letterbox: true,
    canvas: document.getElementById("game")
})

k.loadSprite("player", "./sprites/Player.png", {
    sliceX: 10,
    sliceY: 7,
    anims: {
        idle: { from: 0, to: 9, loop: true},
        walk: { from: 10, to: 17, loop: true},
        run: { from: 20, to: 27, loop: true},
        jump: { from: 30, to: 35},
        doubleJump: { from: 40, to: 45},
        fall: { from: 33, to: 35},
        wall: {from: 60, to: 62, loop:true}
    }
})

k.loadSprite("testRoom", "./maps/test.png")
k.loadSprite("wallJump", "./maps/wallJump.png")
