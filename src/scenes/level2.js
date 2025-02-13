import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {createPowerUpPopup, focusOnCanvas, pauseGame, setCameraBorders} from "../utils.js";
import {state, statePropsEnum} from "../state/globalStateManager.js";
import {makeDashPowerUp} from "../entities/dashPowerUp.js";
import {makeCheckpoints} from "../entities/checkpoints.js";
import {inventory, resetInventory} from "../entities/inventory.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {makeHrefKey} from "../entities/hrefKeys.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {makeHealthBar} from "../entities/healthbar.js";
import {makeLevelName} from "../entities/levelName.js";
import {makeTeleporters} from "../entities/teleporters.js";

export function level2(k, roomData) {
    let addedColliders = []
    //Background image
    k.add([
        k.sprite("testBackground"),
        k.scale(2.5),
        k.fixed()
    ])

    k.camScale(2.5)
    k.camPos(290,800)
    k.setGravity(1000)
    k.paused = false

    //json file info
    const roomLayers = roomData.layers

    //Dividing into layers and pushed into differents arrays
    const map = k.add([k.pos(0,0), k.sprite("level2-back")])
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

    //Place every entities by searching them by name
    for (const position of positions){
        if (position.name === "PlayerSpawn"){
            if (state.current().RespawnPositionX === null && state.current().RespawnPositionY === null){
                player.setPosition(position.x, position.y)
            }
            else{
                player.setPosition(state.current().RespawnPositionX, state.current().RespawnPositionY)
            }
            player.setControls()
            player.setEvents("level2")
            player.enablePassthrough()
            player.respawnIfOutOfBounds(1630, "level2")
            player.dashHandler()
        }

        if (position.name === "DashPowerUp"){
            if (state.current().AirDash === false){
                const dashPowerUp = map.add(makeDashPowerUp(k))
                dashPowerUp.setPosition(position.x, position.y)
            }
        }

        if (position.type === "Checkpoint"){
            const checkpoint = map.add(makeCheckpoints(k))
            checkpoint.setPosition(position.x, position.y)
        }

        if (position.type === "DivBlock"){
            let inventoryCheck = inventory.includes(position.name)
            if (inventoryCheck === false){
                const divBlock = map.add(makeDivZone(k,position.name))
                divBlock.setPosition(position.x, position.y)
            }
        }

        if (position.type === "HrefKey"){
            let inventoryCheck = inventory.includes(position.name)
            if (inventoryCheck === false){
                const hrefKey = map.add(makeHrefKey(k,position.name))
                hrefKey.setPosition(position.x, position.y)
            }
        }

        if (position.type === "Teleporter"){
            let destinationX = null
            let destinationY = null
            switch (position.name){
                case "Teleporter1-1":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter1-2"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
                case "Teleporter1-2":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter1-1"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
                case "Teleporter2-1":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter2-2"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
                case "Teleporter2-2":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter2-1"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
                case "Teleporter3-1":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter3-2"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
                case "Teleporter3-2":
                    for (const telepos of positions){
                        if (telepos.name === "Teleporter3-1"){
                            destinationX = telepos.x
                            destinationY = telepos.y
                        }

                    }
                    break;
            }
            const teleporter = map.add(makeTeleporters(k, position.name, destinationX, destinationY))
            teleporter.setPosition(position.x, position.y)
        }

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name, map, addedColliders))
            interactZone.setPosition(position.x, position.y)
        }
    }

    map.add([k.pos(0,0), k.sprite("level2-front")])

    const healthbar = map.add(makeHealthBar(k))

    const levelName = map.add(makeLevelName(k, "HT MainLand ver.2.0"))

    //Added after the other player's functions because it needs the healthbar that is created at the end
    player.spikeHandler(healthbar)

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

    //Plays when reaching the end of the level
    player.onCollide("NextZone", () => {
        resetInventory(inventory)
        state.set(statePropsEnum.playerHp, 3)
        state.set(statePropsEnum.RespawnPositionX, null)
        state.set(statePropsEnum.RespawnPositionY, null)
        state.set(statePropsEnum.DoubleJump, false)
        state.set(statePropsEnum.AirDash, false)
        k.go("intro")
    })

    //Forces the focus on the canvas when a clock is done anywhere
    document.addEventListener("click", focusOnCanvas)
}