import {setMapColliders} from "./roomUtils.js";

export function testRoom(k, roomData) {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex("#324df8")),
        k.fixed()
    ])

    k.camScale(3)
    k.camPos(200,480)
    k.setGravity(1000)
    // k.add([
    //     k.text("Hello, ça va?"),
    //     k.pos(100,100)
    // ])

    const roomLayers = roomData.layers

    const map = k.add([k.pos(0,0), k.sprite("testRoom")])
    const colliders = []
    for (const layer of roomLayers){
        if (layer.name === "Collisions"){
            colliders.push(...layer.objects)
            break
        }
    }

    // const colliders = roomLayers[3].objects

    console.log(map)

    setMapColliders(k, map, colliders)
}