import {focusOnCanvas} from "../scenes/testRoom.js";
import {pauseGame} from "../utils.js";

export function addDragAndDrop(id, k, player){
    const dropObject = document.getElementById(id)
    console.log(dropObject)
    const dropZone = document.getElementById("drop-zone")
    console.log(dropZone)

    dropObject.addEventListener('dragstart', function(event) {
        console.log(event)
    })

    dropObject.addEventListener('drag', function (event){
        console.log(event)
    })

    dropZone.addEventListener('click', function() {
        console.log(dropZone)
    })

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault()
        console.log("au-dessus")
    })

    dropZone.addEventListener('drop', function (event) {
        dropElement(dropObject, dropZone, k, player)
        // console.log("drop-moi ça")
        // dropZone.append(dropObject)
        // pauseGame(k,player)
        // focusOnCanvas()
    })
}

export function dropElement(dropObject, dropZone, k, player){
    // const dropZone = document.getElementById("drop-zone")
    switch (dropZone.className){
        case "InteractZone1":
            if (dropObject.className === "div-block"){
                console.log("drop-moi ça")
                dropZone.append(dropObject)
                pauseGame(k,player)
                focusOnCanvas()
            }
            else{
                console.log("mauvaise réponse")
                focusOnCanvas()
            }
    }
    console.log(dropZone)



    // dropZone.addEventListener('click', function() {
    //     console.log(dropZone)
    // })

}