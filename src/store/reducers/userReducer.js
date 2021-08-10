const INITIAL_STATE = {
    loggedinUser: JSON.parse(localStorage.loggedinUser || null)
    // || {
    //     username: 'Muki123',
    //     name: 'Muki Balaboa',
    //     coins: 100,
    //     moves: []
    // }
}
export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_BALANCE':
            const updatedBalanceUser = {
                ...state.loggedinUser,
                coins: action.balance
            }
            localStorage.loggedinUser = JSON.stringify(updatedBalanceUser)

            return {
                ...state,
                loggedinUser: updatedBalanceUser
            }
        case 'UPDATE_LOGGEDIN_USER':
            const updatedUser = JSON.parse(JSON.stringify(action.user))
            localStorage.loggedinUser = JSON.stringify(updatedUser)

            return {
                ...state,
                loggedinUser: updatedUser
            }
        case 'LOGIN':
            const { user } = action
            const loggedinUser = {
                ...JSON.parse(JSON.stringify(user)),
                coins: 100,
                name: user.username,
                moves: []
            }
            delete loggedinUser.password

            localStorage.loggedinUser = JSON.stringify(loggedinUser)
            // TODO no backend yet
            // loggedinUser.coins ??= 100
            // loggedinUser.name ??= loggedinUser.username
            // loggedinUser.moves ??= []

            return {
                ...state,
                loggedinUser
            }
        case 'LOGOUT':
            localStorage.loggedinUser = null
            return {
                ...state,
                loggedinUser: null
            }
        default:
            return state
    }
}