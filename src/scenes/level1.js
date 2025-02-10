import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {focusOnCanvas, pauseGame, setCameraBorders} from "../utils.js";
import {state} from "../state/globalStateManager.js";
import {makeJumpPowerUp} from "../entities/jumpPowerUp.js";
import {makeDashPowerUp} from "../entities/dashPowerUp.js";
import {makeCheckpoints} from "../entities/checkpoints.js";
import {inventory} from "../entities/inventory.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {makeHrefKey} from "../entities/hrefKeys.js";
import {makeTeleporters} from "../entities/teleporters.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {makeHealthBar} from "../entities/healthbar.js";
import {makeLevelName} from "../entities/levelName.js";

export function level1(k, roomData) {
    let addedColliders = []
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

    const roomLayers = roomData.layers

    const map = k.add([k.pos(0,0), k.sprite("level1-back")])
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

    setCameraBorders(290, 1630, 0, 1440, player, k)

    for (const position of positions){
        if (position.name === "PlayerSpawn"){
            if (state.current().RespawnPositionX === null && state.current().RespawnPositionY === null){
                player.setPosition(position.x, position.y)
            }
            else{
                player.setPosition(state.current().RespawnPositionX, state.current().RespawnPositionY)
            }
            player.setControls()
            player.setEvents("level1")
            player.enablePassthrough()
            player.respawnIfOutOfBounds(1630, "level1")
            player.dashHandler()
        }

        if (position.name === "JumpPowerUp"){
            if (state.current().DoubleJump === false){
                const jumpPowerUp = map.add(makeJumpPowerUp(k))
                jumpPowerUp.setPosition(position.x, position.y)
            }
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

        if (position.type === "HrefKey"){
            let inventoryCheck = inventory.includes(position.name)
            console.log(position.name)
            console.log(inventoryCheck)
            if (inventoryCheck === false){
                const hrefKey = map.add(makeHrefKey(k,position.name))
                hrefKey.setPosition(position.x, position.y)
            }
        }

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name, map, addedColliders))
            interactZone.setPosition(position.x, position.y)
        }
    }

    map.add([k.pos(0,0), k.sprite("level1-front")])

    const healthbar = map.add(makeHealthBar(k))

    const levelName = map.add(makeLevelName(k, "HT MainLand ver.1.0"))

    player.spikeHandler(healthbar)

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")){
            pauseGame(k, player)
        }
            // else if (k.isKeyPressed("x") && k.paused === true){
            //     createPowerUpPopup(k, player)
        // }
        else if (player.airDashUnlocked === true){
            player.enableAirDash()
        }
    })

    document.addEventListener("click", focusOnCanvas)
}