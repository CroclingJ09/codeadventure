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
        console.log(true)
    }
    else{
        checkpoint.play("unactivated")
        console.log(false)
    }

    checkpoint.onCollide("player", (player) => {
        if (checkpoint.curAnim() === "unactivated"){
            checkpoint.play("activating")
            state.set(statePropsEnum.RespawnPositionX, checkpoint.pos.x)
            state.set(statePropsEnum.RespawnPositionY, checkpoint.pos.y)
            console.log(state.current().RespawnPositionX, state.current().RespawnPositionY)
            checkpoint.onAnimEnd((anim) => {
                if (anim === "activating"){
                    checkpoint.play("activated")
                }
            })
        }

    })

    return checkpoint
}