import {makePlayer} from "./player.js";
import {createInteractPopup} from "../utils.js";

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
        // interactHandler(k, player)
        if (k.isKeyPressed("c") && player.isGrounded()) {
            if (player.paused === false){
                k.paused = true
                player.paused = true
                createInteractPopup(k, player)
            }
        }
    })

    return interactZone
}