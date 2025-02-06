import {state, statePropsEnum} from "../state/globalStateManager";
import {inventory, createInventory, updateInventory} from "./inventory.js";

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
            vel: 100
        }),
        k.doubleJump(state.current().DoubleJump ? 2 : 1),
        k.opacity(),
        k.health(state.current().playerHp),
        k.state("normal", ["normal", "dash", "onWall"]),
        "player",
        {
            walkSpeed: 100,
            runSpeed: 120,
            dashDistance: 200,
            dashTime:0,
            dashLefts: 1,
            isAttacking: false,
            airDashUnlocked: (state.current().AirDash),
            isDashing: false,
            setPosition(x, y) {
              this.pos.x = x
              this.pos.y = y
            },
            enablePassthrough(){
                this.onBeforePhysicsResolve((collision) => {
                    if (collision.target.is("SemiSolid") && this.isJumping()){
                        collision.preventResolution()
                    }
                })
            },
            setControls() {
                this.controlHandler = []

                this.controlHandler.push(
                    k.onKeyPress((key) => {
                        if (this.hp() !== 0){
                            if (key === "x" && this.paused===false && this.curAnim() !== "damage"){
                                //évite de redémarrer l'animation de saut si cette dernière est en cours
                                this.onDoubleJump(() => {
                                    this.play("doubleJump")
                                })
                                if (this.curAnim() !== "jump" && this.curAnim() !== "doubleJump") this.play("jump")
                                this.doubleJump()
                            }

                            //Test/debug
                            if (key === "a"){
                                createInventory()
                            }

                            if (key==="s"){
                                updateInventory(inventory, "walace")
                            }

                            if (key==="d"){
                                // console.log(inventory)
                                console.log(this.pos)
                            }

                            if (key === "c" && !this.isGrounded() && this.dashLefts === 1 && this.airDashUnlocked === true && this.paused===false){
                                this.isDashing = true
                                this.enterState("dash")
                                this.play("doubleJump")
                                this.dashLefts = 0
                            }
                        }
                    })
                )

                this.controlHandler.push(
                    k.onKeyDown((key) => {
                        if (this.hp() !== 0){
                            if (key === "left" && !this.isAttacking && this.paused===false){
                                if(this.isGrounded() && k.isKeyDown("y")){
                                    if (this.curAnim() !== "walk" && this.runSpeed <=180){
                                        this.play("walk")
                                    }
                                    else if (this.curAnim() !== "run" && this.runSpeed > 180){
                                        this.play("run")
                                    }
                                }
                                else if (this.curAnim() !== "walk" && this.isGrounded() && !k.isKeyDown("y")){
                                    this.play("walk")
                                }
                                this.flipX = true
                                if (k.isKeyDown("y")){
                                    this.move(-this.runSpeed,0)
                                    if (this.runSpeed <250){
                                        this.runSpeed += 2
                                        // console.log(this.runSpeed)
                                    }
                                }
                                else{
                                    this.move(-this.walkSpeed, 0)
                                }
                                return
                            }

                            if (key === "right" && !this.isAttacking && this.paused===false){
                                if(this.isGrounded() && k.isKeyDown("y")){
                                    if (this.curAnim() !== "walk" && this.runSpeed <=180){
                                        this.play("walk")
                                    }
                                    else if (this.curAnim() !== "run" && this.runSpeed > 180){
                                        this.play("run")
                                    }
                                }
                                else if (this.curAnim() !== "walk" && this.isGrounded() && !k.isKeyDown("y")){
                                    this.play("walk")
                                }
                                this.flipX = false
                                if (k.isKeyDown("y") && this.curAnim() !== "damage"){
                                    this.move(this.runSpeed,0)
                                    if (this.runSpeed <250){
                                        this.runSpeed += 2
                                        // console.log(this.runSpeed)
                                    }
                                }
                                else{
                                    this.move(this.walkSpeed, 0)
                                }
                                return
                            }
                        }
                    })
                )

                this.controlHandler.push(
                    k.onKeyRelease(() => {
                        if (this.hp() !== 0){
                            if (
                                this.curAnim() !== "idle" &&
                                this.curAnim() !== "jump" &&
                                this.isGrounded()
                            )
                                this.play("idle")
                        }
                    }),
                    k.onKeyRelease((key) => {
                        if (key === "y" || key === "right" || key === "left"){
                            this.runSpeed = 120
                        }
                    })
                )
            },
            dashHandler(){
                this.onStateEnter("dash", () => {
                    k.setGravity(200)
                    this.jumpForce = 0
                    this.jump()
                    this.dashTime=0
                    if (this.flipX === false){
                        this.applyImpulse(k.vec2(200, 5))
                    }
                    else if (this.flipX === true){
                        this.applyImpulse(k.vec2(-200, 5))
                    }
                })
                this.onStateUpdate("dash", () => {
                    if(this.dashTime >= 20){
                        console.log("STOP")
                        this.enterState("normal")
                        console.log(this.state)
                        this.isDashing=false
                        k.setGravity(1000)
                        this.jumpForce=400
                        this.dashTime = 0
                        return
                    }
                    else{
                        this.dashTime++
                        console.log(this.dashTime)
                    }
                })
            },
            wallJumpHandler(){
                this.onCollide("Wall", () => {
                    this.enterState("onWall")
                })
                this.onCollideEnd("Wall", () => {
                    this.enterState("normal")
                })
                this.onStateEnter("onWall", () => {
                    console.log(this.state)
                    this.jumpForce=0
                    this.jump()
                    this.play("wall")
                    k.setGravity(100)
                })
                this.onStateUpdate("onWall", () => {
                    if (this.flipX === false){
                        this.onKeyPress("x", () => {
                            if (k.isKeyDown("left")){
                                this.jumpForce = 400
                                this.jump()
                                this.play("jump")
                            }
                        })
                    }
                    else if(this.flipX === true){
                        this.onKeyPress("x", () => {
                            if (k.isKeyDown("right")){
                                this.jumpForce = 400
                                this.jump()
                                this.play("jump")
                            }
                        })
                    }
                })
                this.onStateEnter("normal", () => {
                    console.log(this.state)
                    this.jumpForce=400
                    k.setGravity(1000)
                    this.play("fall")
                })
            },
            spikeHandler(){
              this.onCollide("Spikes", ()=>{
                  if (this.hp() > 0){
                      this.jump()

                      this.play("damage")
                      if (this.flipX === false){
                          this.applyImpulse(k.vec2(-200, 50))
                      }
                      else if (this.flipX === true){
                          this.applyImpulse(k.vec2(200, 50))
                      }
                      this.hurt(1)
                      console.log(state.current().playerHp)
                  }
              })
            },
            respawnIfOutOfBounds(
                boundValue,
                actRoom
            ){
                k.onUpdate(() => {
                    if (this.pos.y > boundValue){
                        k.go(actRoom)
                    }
                })
            },
            setEvents(roomName) {
                this.onFall(() => {
                    this.play("fall")
                })

                this.onFallOff(() => {
                    this.play("fall")
                })

                this.onGround(() => {
                    this.dashLefts = 1
                    this.vel.x = 0
                    if (this.hp() === 0 && this.curAnim() !== "dead"){
                        console.log("dead")
                        this.play("dead")
                        this.onAnimEnd((anim) => {
                            if (anim === "dead"){
                                state.set(statePropsEnum.playerHp, 3)
                                k.wait(2, () => {
                                    k.go(roomName)
                                })
                            }
                        })
                    }
                    else{
                        this.play("idle")
                    }
                })

                this.onHeadbutt(() => {

                })

                this.on("hurt", () => {
                    if (this.hp() >= 0){
                        state.set(statePropsEnum.playerHp, state.current().playerHp - 1)
                        console.log(this.hp())
                    }
                })
            },
            enableDoubleJump() {
                this.numJumps = 2
            },
            enableAirDash() {
                this.airDashUnlocked = true
            }
        },
    ])
}