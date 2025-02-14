import {focusOnCanvas, playAfterRightDrop} from "../utils.js";
import {currInteractZone} from "../entities/interactZones.js";
import {inventory, removeItem} from "../entities/inventory.js";
import {addDivBlock} from "../scenes/roomUtils.js";

//Function to create the drag and drop on each objet from the inventory
export function addDragAndDrop(k, player, interactZone, map, addedCollisions){
    const dropObjectsHTML = document.getElementsByClassName("inventory-object")
    let dropObjects = Array.from(dropObjectsHTML)
    const dropZone = document.getElementById("drop-zone")
    let draggedObject = null

    dropObjects.forEach((dropObject) => {
        dropObject.addEventListener('dragstart', function(event) {
            draggedObject = this
        })

        dropObject.addEventListener('drag', function (event){

        })
    })

    dropZone.addEventListener('click', function() {
    })

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault()
    })

    dropZone.addEventListener('drop', function (event) {
        //Checks which interaction zone is used and uses the correct method
        switch (currInteractZone){
            case "InteractZoneTuto":
                //Checks if it's the right object with classes
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    //Removes the item from the inventory array
                    removeItem(inventory, draggedObject.id)
                    //Moves the object frommthe inventory into the drop zone
                    dropZone.append(draggedObject)
                    //Creates the block on the map
                    addDivBlock(k, addedCollisions, "SpawnedBlockTuto")
                    //empties the drop zone
                    dropZone.innerHTML= ""
                    //Closes the window and unpause the game and the player
                    playAfterRightDrop(k, player)
                    //Put the focus on the canvas
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone1-1":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock1-1")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone1-2":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock1-2")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone1-3":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock1-3")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone1-4":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock1-4")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone2-1":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock2-1")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone2-2":
                if (draggedObject.className.includes("href-key-1")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    const teleporter = map.get("Teleporter1-1")
                    teleporter[0].play("activating1")
                    teleporter[0].onAnimEnd((anim) => {
                        if (anim === "activating1"){
                            teleporter[0].play("activated1")
                        }
                    })
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return;
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone2-3":
                if (draggedObject.className.includes("href-key-2")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    const teleporter = map.get("Teleporter2-1")
                    teleporter[0].play("activating2")
                    teleporter[0].onAnimEnd((anim) => {
                        if (anim === "activating2"){
                            teleporter[0].play("activated2")
                        }
                    })
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return;
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone2-4":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock2-4")
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
            case "InteractZone2-5":
                if (draggedObject.className.includes("href-key-3")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    const teleporter = map.get("Teleporter3-1")
                    teleporter[0].play("activating3")
                    teleporter[0].onAnimEnd((anim) => {
                        if (anim === "activating3"){
                            teleporter[0].play("activated3")
                        }
                    })
                    dropZone.innerHTML= ""
                    playAfterRightDrop(k, player)
                    focusOnCanvas()
                    return;
                }
                else{
                    focusOnCanvas()
                    return;
                }
                break;
        }

    })
}