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
        damage: { from: 55, to: 50, speed: 10},
        dead: {from: 70, to: 79, speed: 5}
    }
})

k.loadSprite("healthBar", "./sprites/healthbar.png", {
    sliceX: 6,
    sliceY: 7,
    anims: {
        fullhealth: { from: 0, to: 5, loop: true},
        midhealth: {from: 6, to: 11, loop: true},
        lowhealth: {from: 12, to: 17, loop: true},
        nolife: 18,
        fullhealthdamage: {from: 24, to: 29},
        midhealthdamage: {from: 30, to: 35},
        lowhealthdamage: {from: 36, to: 41}
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
    sliceY: 4,
    anims: {
        divBlock: { from: 0, to: 3, loop: true},
        hrefKey1: { from: 4, to: 7, loop: true},
        hrefKey2: { from: 8, to: 11, loop: true},
        hrefKey3: { from: 12, to: 15, loop: true}
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
    sliceY: 9,
    anims: {
        unactivated1: 0,
        unactivated2: 9,
        unactivated3: 54,
        activating1: {from: 18, to: 26},
        activating2: {from: 27, to: 35},
        activating3: {from: 63, to: 71},
        activated1: {from: 36, to: 43, loop: true},
        activated2: {from: 45, to: 52, loop: true},
        activated3: {from: 72, to: 79, loop: true}
    }
})

k.loadSprite("divBlock", "./sprites/div-block.png")

k.loadSprite("testRoom", "./maps/test.png")
k.loadSprite("testBackground", "./sprites/HT_Background.png")
k.loadSprite("wallJump", "./maps/wallJump.png")
k.loadSprite("tutorial-back", "./maps/tutorial-back.png")
k.loadSprite("tutorial-front", "./maps/tutorial-front.png")
k.loadSprite("tutorial-background", "./maps/tutorial-background.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {play : {from: 0, to: 1, loop: true, speed: 1}}
})
k.loadSprite("level1-back", "./maps/level1-back.png")
k.loadSprite("level1-front", "./maps/level1-front.png")
k.loadSprite("level2-back", "./maps/level2-back.png")
k.loadSprite("level2-front", "./maps/level2-front.png")

k.loadFont("Jersey15", "./style/Jersey15-Regular.ttf")
