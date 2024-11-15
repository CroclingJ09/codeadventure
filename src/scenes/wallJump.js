import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";

export function wallJump(k, roomData){
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex("#324df8")),
        k.fixed()
    ])

    k.camScale(2.5)
    k.camPos(200, 400)
    k.setGravity(1000)

    const roomLayers = roomData.layers

    const map = k.add([k.pos(0,0), k.sprite("wallJump")])
    const colliders = []
    const positions = []
    for (const layer of roomLayers){
        if (layer.name === "Positions"){
            positions.push(...layer.objects)
            continue
        }

        if (layer.name === "Collisions"){
            colliders.push(...layer.objects)
        }
    }

    setMapColliders(k, map, colliders)

    const player = map.add(makePlayer(k))

    player.onUpdate(() => {
        if (player.pos.y >= 480 ){
            if (player.pos.x <= 200){
                k.camPos(200,480)
            }
            else if (player.pos.x >= 1400){
                k.camPos(1400,480)
            }
            else{
                k.camPos(player.pos.x, 480)
            }

        }
        else if (player.pos.x <= 200){
            k.camPos(200, player.pos.y)
        }
        else if (player.pos.x >= 1400){
            k.camPos(1400, player.pos.y)
        }
        else{
            k.camPos(player.pos)
        }

    })

    for (const position of positions){
        if (position.name === "PlayerSpawn"){
            player.setPosition(position.x, position.y)
            player.setControls()
            player.setEvents()
            player.enablePassthrough()
            player.respawnIfOutOfBounds(700, "wallJump")
            player.dashHandler()
            player.enableDoubleJump()
            player.wallJumpHandler()
        }
    }
}