import {focusOnCanvas, playAfterRightDrop} from "../utils.js";
import {pauseGame} from "../utils.js";
import {currInteractZone} from "../entities/interactZones.js";
import {inventory, removeItem} from "../entities/inventory.js";
import {addedColliders} from "../scenes/testRoom.js";
import {addDivBlock} from "../scenes/roomUtils.js";

export function addDragAndDrop(k, player, interactZone){
    // const dropObject = document.getElementById(id)
    // console.log(dropObject)
    const dropObjectsHTML = document.getElementsByClassName("inventory-object")
    console.log(dropObjectsHTML)
    let dropObjects = Array.from(dropObjectsHTML)
    console.log(dropObjects)
    const dropZone = document.getElementById("drop-zone")
    console.log(dropZone)
    let draggedObject = null
    console.log(currInteractZone)

    dropObjects.forEach((dropObject) => {
        dropObject.addEventListener('dragstart', function(event) {
            console.log(this)
            draggedObject = this
            console.log(draggedObject)
            console.log(draggedObject.className)
        })

        dropObject.addEventListener('drag', function (event){

        })
    })

    dropZone.addEventListener('click', function() {
        console.log(dropZone)
    })

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault()
        console.log("au-dessus")
    })

    dropZone.addEventListener('drop', function (event) {
        // dropElement(dropObject, dropZone, k, player)
        // console.log("drop-moi ça")
        // dropZone.append(dropObject)
        // pauseGame(k,player)
        // focusOnCanvas()
        console.log(currInteractZone)
        switch (currInteractZone){
            case "InteractZone1":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    console.log("drop-moi ça")
                    console.log(addedColliders)
                    console.log(event)
                    // dropZone.append(dropObject)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedColliders, "SpawnedBlock1")
                    dropZone.innerHTML= ""
                    // let objectIndex = inventory.indexOf(dropObject)
                    // console.log(objectIndex)

                    playAfterRightDrop(k, player)
                    console.log("finish")
                    return
                }
                else{
                    console.log("mauvaise réponse")
                    return;
                }
                break;
            case "InteractZone2":
        }
        focusOnCanvas()
    })
}