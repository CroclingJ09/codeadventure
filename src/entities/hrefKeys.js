import {inventory, updateInventory} from "./inventory.js";

export function makeHrefKey(k, hrefKeyID) {
    const hrefKey = k.make([
        k.sprite("HT_Objects", {anim: "hrefKey1"}),
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

    hrefKey.onCollide("player", (player) => {
        k.destroy(hrefKey)
        console.log("Href Key 1add")
        updateInventory(inventory, "hrefKey1", hrefKeyID, k, player)
    })

    return hrefKey
}