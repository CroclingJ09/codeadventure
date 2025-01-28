import {makePlayer} from "./player.js";
import {createInteractPopup} from "../utils.js";
import {addDragAndDrop} from "../state/dragAndDropManager.js";
// import {createDropZone} from "../state/dragAndDropManager.js";
export let currInteractZone = null
export function makeInteractZone(k, name) {
    const interactZone = k.make([
        k.sprite("player", {anim: "wall"}),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 32)
        }),
        k.pos(),
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
                // const dropZone = document.getElementById("drop-zone")
                // dropZone.classList.add(name)
                currInteractZone = name
                console.log(name)
                k.paused = true
                player.paused = true
                createInteractPopup(k, player)
                // createDropZone(name)
                addDragAndDrop(k, player)
            }
        }
    })

    return interactZone

}