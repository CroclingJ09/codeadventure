import platform from "platform";

//Checks if the browser used is Chrome
export function browserChecker(){
    if (platform.name === "Chrome"){
        alert("Attention. Google Chrome est un navigateur gourmant en performance. Nous vous recommandons d'utiliser un autre navigateur")
    }
}