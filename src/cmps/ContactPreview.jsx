import React from 'react'
import { withRouter } from 'react-router-dom'

function _ContactPreview({ user, history }) {
    return (
        <li
            className="contact-preview"
            onClick={() => {
                history.push('/contact/details/' + user._id)
            }}
        >
            <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
            <p>{user.name}</p>
        </li>
    )
}

export const ContactPreview = withRouter(_ContactPreview)
