export function addDragAndDrop(id){
    const dropObject = document.getElementById(id)
    console.log(dropObject)
    const dropZone = document.getElementById("drop-zone")
    console.log(dropZone)

    dropObject.addEventListener('dragstart', function(event) {
        console.log(event)
    })

    // dropObject.addEventListener('drag', function (event){
    //     console.log(event)
    // })

    dropZone.addEventListener('click', function() {
        console.log(dropZone)
    })

    dropZone.addEventListener('dragover', function (event) {
        event.preventDefault()
        console.log("au-dessus")
    })

    dropZone.addEventListener('drop', function (event) {
        dropZone.append(dropObject)
    })
}

export function createDropZone(){
    const dropZone = document.getElementById("drop-zone")
    console.log(dropZone)

    dropZone.addEventListener('click', function() {
        console.log(dropZone)
    })

}