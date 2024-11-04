export function setMapColliders(k, map, colliders) {
    for (const collider of colliders) {
        if (collider.polygon) {
            const coordinates = []
            for (const point of collider.polygon) {
                coordinates.push((k.vec2(point.x, point.y)))
            }

            map.add([
                k.pos(collider.x, collider.y),
                k.area({
                    shape: new k.Polygon(coordinates),
                    collisionIgnore: ["collider"]
                }),
                "collider",
                collider.type,
            ])
            continue
        }

        if (collider.name === "boss-barrier") {
            // TODO
            continue
        }

        map.add([
            k.pos(collider.x, collider.y),
            k.area({
                shape: new k.Rect(k.vec2(0), collider.width, collider.height),
                collisionIgnore: ["collider"]
            }),
            // évite d'être soumis à la gravité (les objects le sont par défaut
            k.body({isStatic: true}),
            "collider",
            collider.type,
        ])
    }
}