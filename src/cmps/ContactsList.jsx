import { ContactPreview } from './ContactPreview'

export const ContactsList = ({ contacts }) => {
    return (
        <ul className="contact-list">
            {contacts.map(user =>
                <ContactPreview user={user} key={user._id} />
            )}
        </ul>
    )
}
