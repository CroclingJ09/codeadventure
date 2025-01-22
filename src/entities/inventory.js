let inventory = new Array()
export function createInventory(){
    const inventoryBlock = document.getElementById("inventaire")
    console.log(inventory, inventoryBlock)
    return inventory
}

export function updateInventory(inventory, object, objectID){
    let imgLink = ""
    console.log(object)
    switch (object){
        case "walace":
            imgLink = "public/sprites/Bush.png"
            break;
        case "divBlock":
            imgLink = "public/sprites/objects/divBloc.png"
    }
    console.log(imgLink)
    inventory.push(objectID)
    const inventoryBlock = document.getElementById("inventaire")
    inventoryBlock.innerHTML += `
        <div class="inventory-object" id="` + objectID +`">
           <img class="object-image" src="`+ imgLink +`" alt="object">
        </div>`


}

export {inventory}