import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactsList({ contacts }) {
    return (
        <ul className="contact-list">
            {contacts.map(user =>
                <ContactPreview user={user} key={user._id} />
            )}
        </ul>
    )
}
