import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {createPowerUpPopup, pauseGame} from "../utils.js";
import {makeJumpPowerUp} from "../entities/jumpPowerUp.js";
import {state, statePropsEnum} from "../state/globalStateManager.js";
import {makeDashPowerUp} from "../entities/dashPowerUp.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {inventory} from "../entities/inventory.js";
import {makeHrefKey} from "../entities/hrefKeys.js";

export const addedColliders = []
export function testRoom(k, roomData) {
    k.add([
        // k.rect(k.width(), k.height()),
        k.sprite("testBackground"),
        k.scale(2.5),
        // k.color(k.Color.fromHex("#324df8")),
        k.fixed()
    ])

    k.camScale(2.5)
    k.camPos(290,800)
    k.setGravity(1000)
    k.paused = false
    // k.add([
    //     k.text("Hello, ça va?"),
    //     k.pos(100,100)
    // ])

    const roomLayers = roomData.layers

    const map = k.add([k.pos(0,0), k.sprite("testRoom")])
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

        if (layer.name === "AddedCollisions"){
            addedColliders.push(...layer.objects)
        }
    }

    // const colliders = roomLayers[3].objects

    console.log(map)

    setMapColliders(k, map, colliders)

    const player = map.add(makePlayer(k))

    player.onUpdate(() => {
        if (player.pos.y >= 800 ){
            if (player.pos.x <= 290){
                k.camPos(290,800)
            }
            else if (player.pos.x >= 1310){
                k.camPos(1310,800)
            }
            else{
                k.camPos(player.pos.x, 800)
            }

        }
        else if (player.pos.x <= 290){
            k.camPos(290, player.pos.y)
        }
        else if (player.pos.x >= 1310){
            k.camPos(1310, player.pos.y)
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
            player.respawnIfOutOfBounds(1000, "testRoom")
            player.dashHandler()
            // player.enableDoubleJump()
            // player.wallJumpHandler()
        }

        if (position.name === "JumpPowerUp"){
            if (state.current().DoubleJump === false){
                const jumpPowerUp = map.add(makeJumpPowerUp(k))
                jumpPowerUp.setPosition(position.x, position.y)
            }
        }

        if (position.name === "DashPowerUp"){
            if (state.current().AirDash === false){
                const dashPowerUp = map.add(makeDashPowerUp(k))
                dashPowerUp.setPosition(position.x, position.y)
            }
        }

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name))
            interactZone.setPosition(position.x, position.y)
        }

        if (position.type === "DivBlock"){
            let inventoryCheck = inventory.includes(position.name)
            console.log(position.name)
            console.log(inventoryCheck)
            if (inventoryCheck === false){
                const divBlock = map.add(makeDivZone(k,position.name))
                divBlock.setPosition(position.x, position.y)
            }
        }

        if (position.type === "HrefKey"){
            let inventoryCheck = inventory.includes(position.name)
            console.log(position.name)
            console.log(inventoryCheck)
            if (inventoryCheck === false){
                const hrefKey = map.add(makeHrefKey(k,position.name))
                hrefKey.setPosition(position.x, position.y)
            }
        }
    }

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")){
            pauseGame(k, player)
        }
        else if (k.isKeyPressed("x") && k.paused === true){
            createPowerUpPopup(k, player)
        }
        else if (player.airDashUnlocked === true){
            player.enableAirDash()
        }
    })
}