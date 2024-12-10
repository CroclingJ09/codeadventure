export function pauseGame(k,player){
    let pausescreen = document.getElementById("pause")
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
    }
}