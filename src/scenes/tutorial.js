import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {state, statePropsEnum} from "../state/globalStateManager.js";
import {makeCheckpoints} from "../entities/checkpoints.js";
import {inventory, resetInventory} from "../entities/inventory.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {focusOnCanvas, pauseGame, setCameraBorders} from "../utils.js";
import {makeHealthBar} from "../entities/healthbar.js";
import {makeLevelName} from "../entities/levelName.js";
export function tutorial(k, roomData) {
    let addedColliders = []
    k.add([
        k.sprite("tutorial-background", {anim: "play"}),
        k.scale(2.5),
        k.fixed()
    ])

    k.camScale(2.5)
    k.camPos(290, 320)
    k.setGravity(1000)
    k.paused = false

    const roomLayers = roomData.layers

    const map = k.add([k.pos(0,0), k.sprite("tutorial-back")])
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

    setMapColliders(k, map, colliders)

    const player = map.add(makePlayer(k))

    setCameraBorders(290, 1820, 0, 320, player, k)

    for (const position of positions){
        if (position.type === "Text"){
            map.add([
                k.anchor("center"),
                k.text(position.properties[0].value, {
                    size: 20,
                }),
                k.pos(position.x, position.y)
            ])
        }

        if (position.name === "PlayerSpawn"){
            if (state.current().RespawnPositionX === null && state.current().RespawnPositionY === null){
                player.setPosition(position.x, position.y)
            }
            else{
                player.setPosition(state.current().RespawnPositionX, state.current().RespawnPositionY)
            }
            // player.enableDoubleJump()
            // player.wallJumpHandler()
        }

        if (position.type === "Checkpoint"){
            const checkpoint = map.add(makeCheckpoints(k))
            checkpoint.setPosition(position.x, position.y)
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

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name, map, addedColliders))
            interactZone.setPosition(position.x, position.y)
        }
    }

    map.add([k.pos(0,0), k.sprite("tutorial-front")])

    const healthbar = map.add(makeHealthBar(k))

    const levelName = map.add(makeLevelName(k, "Tutorial"))

    player.setControls()
    player.setEvents("tutorial")
    player.enablePassthrough()
    player.respawnIfOutOfBounds(600, "tutorial")
    player.dashHandler()
    player.spikeHandler(healthbar)

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")){
            pauseGame(k, player)
        }
        else if (player.airDashUnlocked === true){
            player.enableAirDash()
        }
    })

    player.onCollide("NextZone", () => {
        k.debug.log("next zone")
        resetInventory(inventory)
        state.set(statePropsEnum.playerHp, 3)
        state.set(statePropsEnum.RespawnPositionX, null)
        state.set(statePropsEnum.RespawnPositionY, null)
        k.go("level1")
    })

    document.addEventListener("click", focusOnCanvas)
}