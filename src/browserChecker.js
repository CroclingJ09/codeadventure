import platform from "platform";

export function browserChecker(){
    if (platform.name === "Chrome"){
        alert("Attention. Google Chrome est un navigateur gourmant en performance. Nous vous recommandons d'utiliser un autre navigateur")
    }
}