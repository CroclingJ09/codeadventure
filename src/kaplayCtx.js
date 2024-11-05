import kaboom from "kaplay"

export const scale = 2
export const k = kaboom({
    width: 480 * scale,
    height: 360 * scale,
    scale,
    global: false,
/*    touchToMouse: true,*/
    letterbox: true,
    canvas: document.getElementById("game")
})

k.loadSprite("player", "./sprites/Player.png", {
    sliceX: 10,
    sliceY: 6,
    anims: {
        idle: { from: 0, to: 9, loop: true},
        walk: { from: 10, to: 17, loop: true},
        run: { from: 20, to: 27, loop: true},
        jump: { from: 30, to: 35},
    }
})

k.loadSprite("testRoom", "./maps/test.png")
