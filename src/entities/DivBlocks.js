import {inventory, updateInventory} from "./inventory.js";

export function makeDivZone(k, divBlockID) {
    const divZone = k.make([
        k.sprite("HT_Objects", {anim: "divBlock"}),
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

    divZone.onCollide("player", (player) => {
        k.destroy(divZone)
        console.log("Div Block")
        updateInventory(inventory, "divBlock", divBlockID)
    })

    return divZone
}