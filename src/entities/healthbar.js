export function makeHealthBar(k) {
    const healthbar = k.make([
        k.pos(40, 50),
        k.scale(3),
        k.sprite("healthBar", {anim: "fullhealth"}),
        k.fixed(),
    ])

    return healthbar
}