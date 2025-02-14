import {inventory, updateInventory} from "./inventory.js";
import {createPowerUpPopup} from "../utils.js";

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
        if(divBlockID === "DivBlockTuto"){
            createPowerUpPopup(k, player, "DIV block", "This object can be used on <strong>Interaction Zones</strong> to crerate a block that can ba used as a platform. Press the jump button to continue")
        }
        updateInventory(inventory, "divBlock", divBlockID, k, player)
    })

    return divZone
}