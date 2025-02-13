import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {state, statePropsEnum} from "../state/globalStateManager.js";
import {makeCheckpoints} from "../entities/checkpoints.js";
import {inventory, resetInventory} from "../entities/inventory.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {createPowerUpPopup, focusOnCanvas, pauseGame, setCameraBorders} from "../utils.js";
import {makeHealthBar} from "../entities/healthbar.js";
import {makeLevelName} from "../entities/levelName.js";
export function tutorial(k, roomData) {
    let addedColliders = []
    //Background image
    k.add([
        k.sprite("tutorial-background", {anim: "play"}),
        k.scale(2.5),
        k.fixed()
    ])

    k.camScale(2.5)
    k.camPos(290, 320)
    k.setGravity(1000)
    k.paused = false

    //json file info
    const roomLayers = roomData.layers

    //Dividing into layers and pushed into differents arrays
    const map = k.add([k.pos(0,0), k.sprite("tutorial-back")])
    const colliders = []
    const positions = []

    //Place every entities by searching them by name
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
            player.setControls()
            player.setEvents("tutorial")
            player.enablePassthrough()
            player.respawnIfOutOfBounds(600, "tutorial")
            player.dashHandler()
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

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name, map, addedColliders))
            interactZone.setPosition(position.x, position.y)
        }
    }

    map.add([k.pos(0,0), k.sprite("tutorial-front")])

    const healthbar = map.add(makeHealthBar(k))

    const levelName = map.add(makeLevelName(k, "Tutorial"))

    //Added after the other player's functions because it needs the healthbar that is created at the end
    player.spikeHandler(healthbar)

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")){
            pauseGame(k, player)
        }
        else if (k.isKeyPressed("x") && k.paused === true){
            createPowerUpPopup(k, player)
        }
    })

    //Plays when reaching the end of the level
    player.onCollide("NextZone", () => {
        resetInventory(inventory)
        state.set(statePropsEnum.playerHp, 3)
        state.set(statePropsEnum.RespawnPositionX, null)
        state.set(statePropsEnum.RespawnPositionY, null)
        k.go("level1")
    })

    //Forces the focus on the canvas when a clock is done anywhere
    document.addEventListener("click", focusOnCanvas)
}