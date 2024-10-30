import kaboom from "kaplay"

export const scale = 2
export const k = kaboom({
    width: 560 * scale,
    height: 320 * scale,
    scale,
    global: false,
/*    touchToMouse: true,*/
    letterbox: true,
    canvas: document.getElementById("game")
})

k.loadSprite("player", "./sprites/Blue_Slime_Spritelist.png", {
    sliceX: 13,
    sliceY: 10,
    anims: {
        idle: { from: 0, to: 7, loop: true},
        walk: { from: 13, to: 20, loop: true},
        run: { from: 26, to: 32, loop: true},
        jump: { from: 52, to: 64},
    }
})

k.loadSprite("testRoom", "./maps/test.png")
