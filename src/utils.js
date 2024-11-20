export function pauseGame(k,player){
    if (k.paused === false){
        console.log("pause")
        k.paused= true
        player.paused = true
    }
    else if (k.paused === true){
        console.log("play")
        k.paused= false
        player.paused = false
    }
}