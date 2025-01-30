import {addDragAndDrop} from "../state/dragAndDropManager.js";

let inventory = new Array()
export function createInventory(){
    const inventoryBlock = document.getElementById("inventaire")
    console.log(inventory, inventoryBlock)
    return inventory
}

export function updateInventory(inventory, object, objectID, k, player){
    let imgLink = ""
    let objectType = ""
    console.log(object)
    switch (object){
        case "walace":
            imgLink = "public/sprites/Bush.png"
            objectType = "bush"
            break;
        case "divBlock":
            imgLink = "public/sprites/objects/divBloc.png"
            objectType = "div-block"
            break;
        case "hrefKey1":
            imgLink = "public/sprites/Bush.png"
            objectType = "href-key-1"
    }
    console.log(imgLink)
    inventory.push(objectID)
    const inventoryBlock = document.getElementById("inventaire")
    inventoryBlock.innerHTML += `
        <div class="inventory-object ` + objectType + `" id="` + objectID +`" draggable="true">
           <img class="object-image" src="`+ imgLink +`" alt="object" draggable="false">
        </div>`
    // addDragAndDrop(objectID, k, player)
}

export function removeItem (inventory, item){
    const index = inventory.indexOf(item)

    if (index !==-1){
        inventory.splice(index, 1)
    }

    console.log(inventory)
}

export {inventory}