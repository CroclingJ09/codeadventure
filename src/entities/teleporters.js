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

    if (teleporterName === "Teleporter1-1"){
        teleporter.play("unactivated1")
    }
    else if(teleporterName === "Teleporter1-2"){
        teleporter.play("activated1")
    }

    teleporter.onCollide("player", (player) => {
        if (teleporter.curAnim() === "activated1" || teleporter.curAnim() === "activated2"){
            if (player.flipX === false){
                player.setPosition(destinationX + 42, destinationY + 64)
            }
            else if (player.flipX === true){
                player.setPosition(destinationX - 10, destinationY + 64)
            }

        }
    })

    return teleporter
}