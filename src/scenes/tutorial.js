import {addedColliders} from "./testRoom.js";
import {setMapColliders} from "./roomUtils.js";
import {makePlayer} from "../entities/player.js";
import {state} from "../state/globalStateManager.js";
import {makeJumpPowerUp} from "../entities/jumpPowerUp.js";
import {makeDashPowerUp} from "../entities/dashPowerUp.js";
import {makeCheckpoints} from "../entities/checkpoints.js";
import {inventory} from "../entities/inventory.js";
import {makeDivZone} from "../entities/DivBlocks.js";
import {makeHrefKey} from "../entities/hrefKeys.js";
import {makeTeleporters} from "../entities/teleporters.js";
import {makeInteractZone} from "../entities/interactZones.js";
import {focusOnCanvas, pauseGame, setCameraBorders} from "../utils.js";

export function tutorial(k, roomData) {
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
    }

    setMapColliders(k, map, colliders)

    const player = map.add(makePlayer(k))

    setCameraBorders(290, 1310, 0, 320, player, k)

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
            player.spikeHandler()
            // player.enableDoubleJump()
            // player.wallJumpHandler()
        }

        if (position.type === "Checkpoint"){
            const checkpoint = map.add(makeCheckpoints(k))
            checkpoint.setPosition(position.x, position.y)
        }

        if(position.type === "InteractZone"){
            const interactZone = map.add(makeInteractZone(k, position.name, map))
            interactZone.setPosition(position.x, position.y)
        }
    }

    map.add([k.pos(0,0), k.sprite("tutorial-front")])

    k.onUpdate(() => {
        if (k.isKeyPressed("escape")){
            pauseGame(k, player)
        }
        else if (player.airDashUnlocked === true){
            player.enableAirDash()
        }
    })

    document.addEventListener("click", focusOnCanvas)
}