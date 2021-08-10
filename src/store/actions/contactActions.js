import { contactService } from '../../services/contact.service.js'

export function loadContacts() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().contactModule
        try {
            const contacts = await contactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getContactById(contactId) {
    return async dispatch => {
        const contact = await contactService.getContactById(contactId)
        dispatch({ type: 'SET_CONTACT', contact })
    }
}

export function removeContact(contactId) {
    return async dispatch => {
        await contactService.remove(contactId)
        dispatch({ type: 'REMOVE_CONTACT', contactId })
    }
}

// ! for transactions only!! no save to local here for now!
export function updateContact(contact) {
    return async dispatch => {
        dispatch({ type: 'UPDATE_CONTACT', contact })
    }
}

export function setFilterBy(filterBy) {
    return dispatch => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}