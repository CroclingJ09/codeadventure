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
            maxVelocity: 800
        }),
        k.doubleJump(state.current().DoubleJump ? 2 : 1),
        k.opacity(),
        k.health(state.current().playerHp),
        k.state("normal", ["normal", "dash", "onWall", "damaged"]),
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
            //Functions to set every controls
            setControls() {
                this.controlHandler = []

                //Controls for when a key is pushed
                this.controlHandler.push(
                    k.onKeyPress((key) => {
                        if (this.hp() !== 0){
                            if (key === "x" && this.paused===false && this.curAnim() !== "damage" && this.state !== "onWall" ){
                                //évite de redémarrer l'animation de saut si cette dernière est en cours
                                this.onDoubleJump(() => {
                                    this.play("doubleJump")
                                })
                                if (this.curAnim() !== "jump" && this.curAnim() !== "doubleJump") this.play("jump")
                                this.doubleJump()
                            }

                            //Test/debug
                            if (key === "a"){

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

                //Contro,s for when a key is hold down
                this.controlHandler.push(
                    k.onKeyDown((key) => {
                        if (this.hp() !== 0 && this.curAnim() !== "damage"){
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
                                if (this.isGrounded()){
                                    this.flipX = true
                                }
                                if (k.isKeyDown("y")){
                                    this.move(-this.runSpeed,0)
                                    if (this.runSpeed <250 && this.isGrounded()){
                                        this.runSpeed += 2
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
                                if (this.isGrounded()){
                                    this.flipX = false
                                }
                                if (k.isKeyDown("y") && this.curAnim() !== "damage"){
                                    this.move(this.runSpeed,0)
                                    if (this.runSpeed <250 && this.isGrounded()){
                                        this.runSpeed += 2
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

                //Controls for when a key is released
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
            //Function that handles the air dash mechanics
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
                this.onAnimEnd((anim) => {
                    if (anim === "doubleJump" && this.state === "dash"){
                        this.enterState("normal")
                        this.isDashing=false
                        k.setGravity(1000)
                        this.jumpForce=400
                        this.dashTime = 0
                    }
                })
            },
            //Function that handles the wall jump mechanics
            wallJumpHandler(){
                this.onCollide("Wall", () => {
                    k.setGravity(200)
                    this.play("wall")
                    this.vel.y = 0
                    this.vel.x = 0
                    this.enterState("onWall")
                })
                this.onCollideEnd("Wall", () => {
                    k.setGravity(1000)
                    this.play("fall")
                    this.enterState("normal")
                })
                this.onStateUpdate("onWall", () => {
                        this.onKeyPress("x", () => {
                            if (this.state === "onWall"){
                                if (this.flipX === false && this.curAnim() === "wall"){
                                    this.applyImpulse(k.vec2(-500, -500))
                                    this.flipX = true
                                    // k.setGravity(1000)
                                }
                                else if (this.flipX === true && this.curAnim() === "wall"){
                                    this.applyImpulse(k.vec2(500, -500))
                                    this.flipX = false
                                }
                                this.enterState("normal")
                            }
                        })
                })

                this.onStateEnter("normal", () => {
                    if (this.curAnim() !== "doubleJump"){
                        this.play("fall")
                    }

                })
            },
            //Function that handles interaction with spikes
            spikeHandler(healthbar){
              this.onCollide("Spikes", ()=>{
                  if (this.hp() > 0){
                      // this.vel.x = 0
                      this.vel.y = 0
                      this.runSpeed = 120
                      this.play("damage")
                      // this.jump()
                      if (k.isKeyDown("right")){
                          this.applyImpulse(k.vec2(-100,-400))
                      }
                      else if (k.isKeyDown("left")){
                          this.applyImpulse(k.vec2(100, -400))
                      }
                      else {
                          this.applyImpulse(k.vec2(0, -400))
                      }
                      switch (this.hp()){
                          case 3:
                              healthbar.play("fullhealthdamage")
                              healthbar.onAnimEnd((anim) => {
                                  if (anim === "fullhealthdamage"){
                                      healthbar.play("midhealth")
                                  }
                              })
                              break;
                          case 2:
                              healthbar.play("midhealthdamage")
                              healthbar.onAnimEnd((anim) => {
                                  if (anim === "midhealthdamage"){
                                      healthbar.play("lowhealth")
                                  }
                              })
                              break;
                          case 1:
                              healthbar.play("lowhealthdamage")
                              healthbar.onAnimEnd((anim) => {
                                  if (anim === "lowhealthdamage"){
                                      healthbar.play("nolife")
                                  }
                              })
                      }
                      this.hurt(1)
                      k.wait(0.5, () => {
                          this.vel.x = 0
                          this.vel.y = 0
                      })
                  }
              })
            },
            //Function that respawn the player if he falls off the map
            respawnIfOutOfBounds(
                boundValue,
                actRoom
            ){
                k.onUpdate(() => {
                    if (this.pos.y > boundValue){
                        k.go(actRoom)
                        state.set(statePropsEnum.playerHp, 3)
                    }
                })
            },
            //Set various events for general states (falling, landing)
            setEvents(roomName) {
                this.onFall(() => {
                    this.play("fall")
                })

                this.onFallOff(() => {
                    if (this.state !== "damaged")
                    this.play("fall")
                })

                this.onGround(() => {
                    this.dashLefts = 1
                    this.vel.x = 0
                    if (this.hp() === 0 && this.curAnim() !== "dead"){
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
                    }
                })
            },
            //Function to unlock the double jump without reloading the page
            enableDoubleJump() {
                this.numJumps = 2
            },
            //Function to unlock the air dash without reloading the page
            enableAirDash() {
                this.airDashUnlocked = true
            }
        },
    ])
}