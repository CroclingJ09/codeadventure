let inventory = new Array()
export function createInventory(){
    const inventoryBlock = document.getElementById("inventaire")
    console.log(inventory, inventoryBlock)
    return inventory
}

export function updateInventory(inventory, object){
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
    inventory.push(object)
    const inventoryBlock = document.getElementById("inventaire")
    inventoryBlock.innerHTML += `
        <div class="inventory-object" id="` + inventory[inventory.length - 1] +`">
           <img class="object-image" src="`+ imgLink +`" alt="object">
        </div>`


}

export {inventory}