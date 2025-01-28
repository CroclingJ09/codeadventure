import kaboom from "kaplay"

export const scale = 2
export const k = kaboom({
    width: 720 * scale,
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

k.loadSprite("power-ups", "./sprites/Power-ups.png", {
    sliceX: 4,
    sliceY: 2,
    anims: {
        doubleJump: { from: 0, to: 3, loop: true},
        airDash: { from: 4, to: 7, loop: true}
    }
})

k.loadSprite("HT_Objects", "./sprites/objects/HT_objects.png", {
    sliceX: 4,
    sliceY: 3,
    anims: {
        divBlock: { from: 0, to: 3, loop: true},
        hrefKey1: { from: 4, to: 7, loop: true}
    }
})

k.loadSprite("testRoom", "./maps/test.png")
k.loadSprite("testBackground", "./sprites/HT_Background.png")
k.loadSprite("wallJump", "./maps/wallJump.png")
