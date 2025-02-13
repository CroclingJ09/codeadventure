//Function to create the teleporters
export function makeTeleporters(k, teleporterName, destinationX, destinationY){
    const teleporter = k.make([
        k.sprite("teleporters"),
        k.area({
            shape: new k.Rect(k.vec2(0,0), 32, 64)
        }),
        k.pos(),
        {
            setPosition(x, y){
                this.pos.x = x
                this.pos.y = y
            }
        },
        "teleporter",
        teleporterName
    ])

    //Determine the animation based on the teleporter's name
    switch (teleporterName){
        case "Teleporter1-1":
            teleporter.play("unactivated1")
            break;
        case "Teleporter1-2":
            teleporter.play("activated1")
            break;
        case "Teleporter2-1":
            teleporter.play("unactivated2")
            break;
        case "Teleporter2-2":
            teleporter.play("activated2")
            break;
        case "Teleporter3-1":
            teleporter.play("unactivated3")
            break;
        case "Teleporter3-2":
            teleporter.play("activated3")
            break;
    }

    //Function that activate when the player collides with the player
    teleporter.onCollide("player", (player) => {
        if (teleporter.curAnim() === "activated1" || teleporter.curAnim() === "activated2" || teleporter.curAnim() === "activated3"){
            if (player.flipX === false){
                //Number values are added to make the player appear at ground level and not on the other teleporter. This would re-teleport him.
                player.setPosition(destinationX + 42, destinationY + 64)
            }
            else if (player.flipX === true){
                player.setPosition(destinationX - 10, destinationY + 64)
            }

        }
    })

    return teleporter
}