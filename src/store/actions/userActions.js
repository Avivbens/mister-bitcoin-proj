import { contactService } from "../../services/contact.service"

export function transferTo(contactId, amount) {
    return async (dispatch, getState) => {
        const { loggedinUser } = getState().userModule
        if (!loggedinUser) return
        const { loggedinUser: user, contact } = await contactService.transferTo(contactId, amount)
        dispatch({ type: 'UPDATE_LOGGEDIN_USER', user })
        dispatch({ type: 'UPDATE_CONTACT', contact })
        // dispatch({ type: 'UPDATE_BALANCE', balance: newLoggedinUser.coins })
    }
}

export function login(credentials) {
    return async (dispatch) => {
        try {
            // TODO ask backend for login
            dispatch({ type: 'LOGIN', user: credentials })
        } catch (error) {

        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOGOUT' })
        } catch (error) {

        }
    }
}