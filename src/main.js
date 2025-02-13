import {k} from "./kaplayCtx"
import {browserChecker} from "./browserChecker.js";
import {tutorial} from "./scenes/tutorial.js";
import {level1} from "./scenes/level1.js";
import {level2} from "./scenes/level2.js";

browserChecker()

async function main() {
    const tutorialData = await (await  fetch("./maps/tutorial.json")).json()
    k.scene("tutorial", () => {
        tutorial(k, tutorialData)
    })

    const level1Data = await (await fetch("./maps/level1.json")).json()
    k.scene("level1", () => {
        level1(k, level1Data)
    })

    const level2Data = await ( await fetch("./maps/level2.json")).json()
    k.scene("level2", () => {
        level2(k, level2Data)
    })
}

k.scene("intro", () => {
    k.add([
        k.sprite("testBackground"),
        k.scale(2.5),
        k.fixed()
    ])
    k.add([
        k.text("Press ENTER to start", {
            size: 50,
            font: "Jersey15",
        }),
        k.color(k.Color.GREEN),
        k.anchor("center"),
        k.pos(720, 360)
    ])
    k.onKeyPress("enter", () => {
        k.go("tutorial")
    })
    k.onKeyPress("2", () => {
        k.go("level2")
    })
})

main()

k.go("intro")