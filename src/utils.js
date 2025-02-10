export function setCameraBorders(minX, maxX, minY, maxY, player, k){
    player.onUpdate(() => {
        if (player.pos.y >= maxY ){
            if (player.pos.x <= minX){
                k.camPos(minX,maxY)
            }
            else if (player.pos.x >= maxX){
                k.camPos(maxX,maxY)
            }
            else{
                k.camPos(player.pos.x, maxY)
            }

        }
        else if (player.pos.x <= minX){
            k.camPos(minX, player.pos.y)
        }
        else if (player.pos.x >= maxX){
            k.camPos(maxX, player.pos.y)
        }
        else{
            k.camPos(player.pos)
        }

    })
}

export function pauseGame(k,player){
    let pausescreen = document.getElementById("pause")
    let powerUpPopup = document.getElementById("unlock-window")
    let interactPopup = document.getElementById("interact-block")
    console.log(pausescreen)
    if (k.paused === false){
        console.log("pause")
        k.paused= true
        player.paused = true
        pausescreen.classList.add("paused")
        pausescreen.classList.remove("unpaused")
    }
    else if (k.paused === true){
        console.log("play")
        k.paused= false
        player.paused = false
        pausescreen.classList.remove("paused")
        pausescreen.classList.add("unpaused")
        powerUpPopup.classList.add("unpaused")
        powerUpPopup.classList.remove("paused")
        interactPopup.classList.add("unpaused")
        interactPopup.classList.remove("paused")
    }
}

export function createPowerUpPopup(k, player, title, text){
    let powerUpPopup = document.getElementById("unlock-window")
    if (k.paused === false){
        k.paused= true
        player.paused = true
        let powerUpTitle = document.getElementById("unlock-title")
        let powerUpText = document.getElementById("unlock-text")
        powerUpPopup.classList.add("paused")
        powerUpPopup.classList.remove("unpaused")
        powerUpTitle.innerText = title
        powerUpText.innerHTML = text
    }
    else if (k.paused === true){
        k.paused= false
        player.paused = false
        powerUpPopup.classList.add("unpaused")
        powerUpPopup.classList.remove("paused")
    }

}

export function createInteractPopup(k, player, name){
    let interactPopup = document.getElementById("interact-block")
    let interactText = document.getElementById("interact-text")
    console.log(interactPopup)
    interactPopup.classList.add("paused")
    interactPopup.classList.remove("unpaused")
    if (name === "InteractZoneTuto"){
        interactText.innerText = "This is an Interaction Zone. Drag objects from your inventory to activate certain events in the level"
    }
    else {
        interactText.innerText = "Drag and drop objects from your inventory to activate different events on the level"
    }
}

export function focusOnCanvas(){
    document.getElementById("game").focus()
}

export function playAfterRightDrop(k, player){
    let interactPopup = document.getElementById("interact-block")

    // if(k.paused === true){
    //     k.paused = false
    //     player.paused = false
    //     interactPopup.classList.add("unpaused")
    //     interactPopup.classList.remove("paused")
    //     console.log(k.paused, player.paused)
    // }

    k.paused = false
    player.paused = false
    interactPopup.classList.add("unpaused")
    interactPopup.classList.remove("paused")
    console.log(k.paused, player.paused)
}