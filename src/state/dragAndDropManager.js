import {focusOnCanvas, playAfterRightDrop} from "../utils.js";
import {currInteractZone} from "../entities/interactZones.js";
import {inventory, removeItem} from "../entities/inventory.js";
import {addDivBlock} from "../scenes/roomUtils.js";

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
        switch (currInteractZone){
            case "InteractZone1":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlock1")
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
            case "InteractZone2":
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
            case "InteractZoneTuto":
                if (draggedObject.className.includes("div-block")){
                    k.destroy(interactZone)
                    removeItem(inventory, draggedObject.id)
                    dropZone.append(draggedObject)
                    addDivBlock(k, addedCollisions, "SpawnedBlockTuto")
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