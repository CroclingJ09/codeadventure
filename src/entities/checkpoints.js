import {state, statePropsEnum} from "../state/globalStateManager.js";

export function makeCheckpoints(k){
    const checkpoint = k.make([
        k.sprite("checkpoints"),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 32)
        }),
        k.pos(),
        {
            setPosition(x, y) {
                this.pos.x = x
                this.pos.y = y
            },
        },
        "checkpoints"
    ])

    if(state.current().RespawnPositionX === checkpoint.pos.x && state.current().RespawnPositionY === checkpoint.pos.y){
        checkpoint.play("activated")
    }
    else{
        checkpoint.play("unactivated")
    }

    checkpoint.onCollide("player", (player) => {
        if (checkpoint.curAnim() === "unactivated"){
            checkpoint.play("activating")
            state.set(statePropsEnum.RespawnPositionX, checkpoint.pos.x)
            state.set(statePropsEnum.RespawnPositionY, checkpoint.pos.y)
            checkpoint.onAnimEnd((anim) => {
                if (anim === "activating"){
                    checkpoint.play("activated")
                }
            })
        }

    })

    return checkpoint
}