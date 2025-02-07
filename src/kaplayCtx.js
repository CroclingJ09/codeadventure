import kaboom from "kaplay"

export const scale = 2
export const k = kaboom({
    width: 720 * scale,
    height: 360 * scale,
    scale,
    maxFPS: 120,
    global: false,
    debugKey: "d",
/*    touchToMouse: true,*/
    letterbox: true,
    canvas: document.getElementById("game")
})

k.loadSprite("player", "./sprites/Player.png", {
    sliceX: 10,
    sliceY: 8,
    anims: {
        idle: { from: 0, to: 9, loop: true},
        walk: { from: 10, to: 17, loop: true},
        run: { from: 20, to: 27, loop: true},
        jump: { from: 30, to: 35},
        doubleJump: { from: 40, to: 45},
        fall: { from: 33, to: 35},
        wall: {from: 60, to: 62, loop:true},
        damage: { from: 45, to: 40, speed: 10},
        dead: {from: 70, to: 79, speed: 5}
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

k.loadSprite("checkpoints", "./sprites/Checkpoints.png", {
    sliceX: 12,
    sliceY: 3,
    anims: {
        unactivated: {from: 0, to: 11, loop: true},
        activating: {from: 12, to: 23},
        activated: {from: 24, to: 35, loop: true}
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

k.loadSprite("interact-zone", "./sprites/Interact_Zone.png", {
    sliceX: 4,
    anims: {
        interact: { from: 0, to: 3, loop: true}
    }
})

k.loadSprite("teleporters", "./sprites/Teleporters.png", {
    sliceX: 9,
    sliceY: 6,
    anims: {
        unactivated1: 0,
        unactivated2: 9,
        activating1: {from: 18, to: 26},
        activating2: {from: 27, to: 35},
        activated1: {from: 36, to: 43, loop: true},
        activated2: {from: 45, to: 52, loop: true}
    }
})

k.loadSprite("divBlock", "./sprites/div-block.png")

k.loadSprite("testRoom", "./maps/test.png")
k.loadSprite("testBackground", "./sprites/HT_Background.png")
k.loadSprite("wallJump", "./maps/wallJump.png")
