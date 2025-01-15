import {k} from "./kaplayCtx"
import {testRoom} from "./scenes/testRoom.js";
import {wallJump} from "./scenes/wallJump.js";
import platform from "platform"
import {browserChecker} from "./browserChecker.js";

console.log(platform.name)
browserChecker()

// k.loadSprite("HT_Tileset", "./HT_Tileset.png", {
//     sliceX: 14,
//     sliceY: 3,
// })
k.setBackground(k.Color.fromHex("#000000"))

async function main() {
    const testRoomData = await (await fetch("./maps/test.json")).json()
    k.scene("testRoom", () => {
        testRoom(k,testRoomData)
    })

    const wallJumpData = await (await fetch("./maps/walljump.json")).json()
    k.scene("wallJump", () => {
        wallJump(k, wallJumpData)
    })
}

k.scene("intro", () => {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex("#2e4fca")),
        k.fixed()
    ])
    k.add([
        k.text("Presse sur ENTER pour démarrer"),
        k.pos(100,100)
    ])
    k.onKeyPress("enter", () => {
        k.go("testRoom")
    })
    k.onKeyPress("1", () => {
        k.go("wallJump")
    })
})

main()

k.go("intro")