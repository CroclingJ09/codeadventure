import {k} from "./kaplayCtx"
import {testRoom} from "./scenes/testRoom.js";

k.loadSprite("HT_Tileset", "./HT_Tileset.png", {
    sliceX: 14,
    sliceY: 3,
})

k.setBackground(k.Color.fromHex("#000000"))

async function main() {
    const testRoomData = await (await fetch("./maps/test.json")).json()
    k.scene("testRoom", () => {
        testRoom(k,testRoomData)
    })
}

k.scene("intro", () => {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex("#f832e3")),
        k.fixed()
    ])
    k.add([
        k.text("Presse sur ENTER pour démarrer"),
        k.pos(100,100)
    ])
    k.onKeyPress("enter", () => {
        k.go("testRoom")
    })
})

main()

k.go("intro")