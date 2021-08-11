import { useHistory } from 'react-router-dom'

export const ContactPreview = ({ user }) => {
    const history = useHistory()

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

