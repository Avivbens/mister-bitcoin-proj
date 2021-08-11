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
            <img src={require('../assets/imgs/icons/contact.png').default} alt="person" />
            <p className="info">
                <span className="name">{user.name}</span>
                <br />
                <span className="phone">{user.phone}</span>
            </p>
        </li>
    )
}

export const ContactPreview = withRouter(_ContactPreview)
