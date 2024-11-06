import {state} from "../state/globalStateManager";

export function makePlayer(k) {
    return k.make([
        k.pos(),
        k.sprite("player"),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 12, 24)
        }),
        k.anchor("bot"),
        k.body({
            mass: 70,
            jumpForce: 400,
        }),
        k.doubleJump(state.current().DoubleJump ? 2 : 1),
        k.opacity(),
        k.health(state.current().playerHp),
        "player",
        {
            walkSpeed: 100,
            runSpeed: 200,
            isAttacking: false,
            setPosition(x, y) {
              this.pos.x = x,
              this.pos.y = y
            },
            setControls() {
                this.controlHandler = []

                this.controlHandler.push(
                    k.onKeyPress((key) => {
                        if (key === "x"){
                            //évite de redémarrer l'animation de saut si cette dernière est en cours
                            if (this.curAnim() !== "jump") this.play("jump")
                            this.doubleJump()
                        }

                        //Attack animation (unused)

                        // if (key === "y" && this.curAnim() !== "attack" && this.isGrounded()) {
                        //     this.isAttacking = true
                        //     this.add([
                        //         k.pos(this.flipX ? -25 : 0, 10),
                        //         k.area({
                        //             shape: new k.Rect(k.vec2(0), 25, 10),
                        //         }),
                        //         "sword-hitbox"
                        //     ])
                        //     this.play("attack")
                        //
                        //     this.onAnimEnd((anim) => {
                        //         if (anim === "attack") {
                        //             const swordHitbox = k.get("sword-hitbox", {recursive: true})[0]
                        //             if (swordHitbox) k.destroy(swordHitbox)
                        //             this.isAttacking = false
                        //             this.play("idle")
                        //         }
                        //     })
                        // }
                    })
                )

                this.controlHandler.push(
                    k.onKeyDown((key) => {
                        if (key === "left" && !this.isAttacking){
                            if(this.curAnim() !== "run" && this.isGrounded() && k.isKeyDown("y")){
                                this.play("run")
                            }
                            else if (this.curAnim() !== "walk" && this.isGrounded() && !k.isKeyDown("y")){
                                this.play("walk")
                            }
                            this.flipX = true
                            if (k.isKeyDown("y")){
                                this.move(-this.runSpeed,0)
                            }
                            else{
                                this.move(-this.walkSpeed, 0)
                            }
                            return
                        }

                        if (key === "right" && !this.isAttacking){
                            if(this.curAnim() !== "run" && this.isGrounded() && k.isKeyDown("y")){
                                this.play("run")
                            }
                            else if (this.curAnim() !== "walk" && this.isGrounded() && !k.isKeyDown("y")){
                                this.play("walk")
                            }
                            this.flipX = false
                            if (k.isKeyDown("y")){
                                this.move(this.runSpeed,0)
                            }
                            else{
                                this.move(this.walkSpeed, 0)
                            }
                            return
                        }
                    })
                )

                this.controlHandler.push(
                    k.onKeyRelease(() => {
                        if (
                            this.curAnim() !== "idle" &&
                            this.curAnim() !== "jump"
                        )
                            this.play("idle")
                    })
                )
            }
        },
    ])
}