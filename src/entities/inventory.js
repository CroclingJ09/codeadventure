let inventory = new Array()
export function createInventory(){
    const inventoryBlock = document.getElementById("inventaire")
    console.log(inventory, inventoryBlock)
    return inventory
}

export function updateInventory(inventory, object){
    inventory.push(object)
    const inventoryBlock = document.getElementById("inventaire")
    inventoryBlock.innerHTML += `<div class="inventory-object" id="` + inventory[inventory.length - 1] +`">` + inventory[inventory.length - 1] +`</div>`
}

export {inventory}