export function makeLevelName(k, name) {
    const levelName = k.make([
        k.pos(0, 670),
        k.rect(400, 50),
        k.color(k.Color.BLACK),
        k.fixed()
    ])

    levelName.add([
        k.text(name, {
            size: 25
        }),
        k.pos(20, 25),
        k.anchor("left")
    ])

    return levelName
}