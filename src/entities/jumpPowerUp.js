import {state, statePropsEnum} from "../state/globalStateManager.js";
import {createPowerUpPopup} from "../utils.js";

export function makeJumpPowerUp(k, pos) {
    const jumpPowerUp = k.make([
        k.sprite("power-ups", {anim: "doubleJump"}),
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

    jumpPowerUp.onCollide("player", (player) => {
        k.destroy(jumpPowerUp)
        state.set(statePropsEnum.DoubleJump, true)
        createPowerUpPopup(k,player,"You've unlocked the double jump", "Press a second time the jump button while in the air to gain even more height <br> Press the jump button to continue")
        player.enableDoubleJump()
    })

    return jumpPowerUp
}