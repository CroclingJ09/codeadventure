
let inventory = new Array()
export function createInventory(){
    const inventoryBlock = document.getElementById("inventaire")
    return inventory
}

export function updateInventory(inventory, object, objectID, k, player){
    let imgLink = ""
    let objectType = ""
    switch (object){
        case "divBlock":
            imgLink = "sprites/objects/divBloc.png"
            objectType = "div-block"
            break;
        case "HrefKey1":
            imgLink = "sprites/objects/hrefKey1.png"
            objectType = "href-key-1"
            break;
        case "HrefKey2":
            imgLink = "sprites/objects/hrefKey2.png"
            objectType = "href-key-2"
            break;
        case "HrefKey3":
            imgLink = "sprites/objects/hrefKey3.png"
            objectType = "href-key-3"
            break;
    }
    inventory.push(objectID)
    const inventoryBlock = document.getElementById("inventaire")
    inventoryBlock.innerHTML += `
        <div class="inventory-object ` + objectType + `" id="` + objectID +`" draggable="true">
           <img class="object-image" src="`+ imgLink +`" alt="object" draggable="false">
        </div>`
}

export function removeItem (inventory, item){
    const index = inventory.indexOf(item)

    if (index !==-1){
        inventory.splice(index, 1)
    }

}

export function resetInventory(inventory){
    inventory = new Array()
}

export {inventory}