import {state, statePropsEnum} from "../state/globalStateManager.js";
import {createPowerUpPopup} from "../utils.js";

export function makeDashPowerUp(k, pos) {
    const dashPowerUp = k.make([
        k.sprite("power-ups", {anim: "airDash"}),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 32)
        }),
        k.pos(pos),
        {
            setPosition(x, y) {
                this.pos.x = x
                this.pos.y = y
            },
        }
    ])

    dashPowerUp.onCollide("player", (player) => {
        k.destroy(dashPowerUp)
        state.set(statePropsEnum.AirDash, true)
        createPowerUpPopup(k,player,"You've unlocked the air dash", "Press the action button while in the air to gain some horizontal distance<br> Press the jump button to continue")
        player.enableAirDash()
    })

    return dashPowerUp
}