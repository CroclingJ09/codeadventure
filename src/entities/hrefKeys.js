import {inventory, updateInventory} from "./inventory.js";

export function makeHrefKey(k, hrefKeyID) {
    const hrefKey = k.make([
        k.sprite("HT_Objects"),
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
        hrefKeyID
    ])

    //Define the animation used based on the key number
    switch (hrefKeyID){
        case "HrefKey1":
            hrefKey.play("hrefKey1")
            break;
        case "HrefKey2":
            hrefKey.play("hrefKey2")
            break;
        case "HrefKey3":
            hrefKey.play("hrefKey3")
            break;
    }

    hrefKey.onCollide("player", (player) => {
        k.destroy(hrefKey)
        updateInventory(inventory, hrefKeyID, hrefKeyID, k, player)
    })

    return hrefKey
}