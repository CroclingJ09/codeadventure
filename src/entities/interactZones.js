import {makePlayer} from "./player.js";

export function makeInteractZone(k, pos) {
    const interactZone = k.make([
        k.sprite("player", {anim: "wall"}),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 32)
        }),
        k.pos(pos),
        {
            setPosition(x, y) {
                this.pos.x = x
                this.pos.y = y
            },
        }
    ])

    interactZone.onCollideUpdate("player", (player) => {
        // player.interactHandler()
        console.log("Interaction Zone")
    })

    return interactZone
}