import {makePlayer} from "./player.js";
import {createInteractPopup} from "../utils.js";
import {addDragAndDrop} from "../state/dragAndDropManager.js";
export let currInteractZone = null
export function makeInteractZone(k, name, map, addedCollisions) {
    const interactZone = k.make([
        k.sprite("interact-zone", {anim: "interact"}),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 32)
        }),
        k.pos(),
        {
            setPosition(x, y) {
                this.pos.x = x
                this.pos.y = y
            },
        },
        "interactZone"
    ])

    interactZone.onCollideUpdate("player", (player) => {
        // interactHandler(k, player)
        if (k.isKeyPressed("f") && player.isGrounded()) {
            if (player.paused === false){
                currInteractZone = name
                k.paused = true
                player.paused = true
                createInteractPopup(k, player, name)
                addDragAndDrop(k, player, interactZone, map, addedCollisions)
            }
        }
    })

    return interactZone

}