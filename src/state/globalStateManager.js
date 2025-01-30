export const statePropsEnum = {
    playerHp: "playerHp",
    DoubleJump: "DoubleJump",
    AirDash: "AirDash",
    RespawnPositionX: "ResPosX",
    RespawnPositionY: "ResPosY",
}

function initStateManager() {
    const state = {
        playerHp: 3,
        maxPlayerHp: 3,
        DoubleJump: false,
        AirDash: false,
        WallJump: false,
        RespawnPositionX: null,
        RespawnPositionY: null,
    }

    return {
        current() {
            return{...state}
        },
        set(property, value) {
            state[property] = value
        },

    }
}

export const state = initStateManager()
