import {state} from "./src/state/globalStateManager"

export function makePlayer(k, initialPos) {
    return k.make([
        k.pos(initialPos),
        k.sprite("player"),
        k.area({
            shape: new k.Rect(k.vec2(0,18), 12, 12)
        }),
        k.anchor("bot"),
        k.body({
            mass: 100,
            jumpForce: 320,
        }),
        k.doubleJump(state.current().DoubleJump ? 2 : 1),
        k.opacity(),
        k.health(state.current().playerHp),
        "player",
        {
            speed: 150,
            isAttacking: false,
            setControls() {
                this.controlHandler = []

                this.controlHandler.push(
                    k.onKeyPress((key) => {
                        if (key === "x"){
                            //évite de redémarrer l'animation de saut si cette dernière est en cours
                            if (this.curAnim() !== "jump") this.play("jump")
                            this.doubleJump()
                        }

                        if (key === "y" && this.curAnim() !== "attack" && this.isGrounded()) {
                            this.isAttacking = true
                            this.add([
                                k.pos(this.flipX ? -25 : 0, 10),
                                k.area({
                                    shape: new k.Rect(k.vec2(0), 25, 10),
                                }),
                                "sword-hitbox"
                            ])
                            this.play("attack")

                            this.onAnimEnd((anim) => {
                                if (anim === "attack") {
                                    const swordHitbox = k.get("sword-hitbox", {recursive: true})[0]
                                    if (swordHitbox) k.destroy(swordHitbox)
                                    this.isAttacking = false
                                    this.play("idle")
                                }
                            })
                        }
                    })
                )

                this.controlHandler.push(
                    k.onKeyDown((key) => {
                        if (key === "left" && !this.isAttacking){
                            if (this.curAnim() !== "walk" && this.isGrounded()) {
                                this.play("walk")
                            }
                            this.flipX = true
                            this.move(-this.speed, 0)
                            return
                        }

                        if (key === "right" && !this.isAttacking){
                            if (this.curAnim() !== "walk" && this.isGrounded()) {
                                this.play("walk")
                            }
                            this.flipX = false
                            this.move(this.speed, 0)
                            return
                        }
                    })
                )

                this.controlHandler.push(
                    k.onKeyRelease(() => {
                        if (
                            this.curAnim() !== "idle" &&
                            this.curAnim() !== "jump" &&
                            this.curAnim() !== "walk"
                        )
                    })
                )
            }
        },
    ])
}