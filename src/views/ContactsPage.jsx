import { Component } from 'react'
import contactService from '../services/contact.service'

export class ContactsPage extends Component {
    state = {
        filterTxt: '',
        contacts: []
    }

    async componentDidMount() {
        const contacts = await contactService.getContacts()
        this.setState({ contacts })
    }

    inputHandler = ({ target }) => {
        const field = target.id
        const value = target.type === 'number' ? +target.value : target.value

        this.setState({ [field]: value }, async () => {
            const { filterTxt } = this.state
            const filterBy = { term: filterTxt }
            const filteredContacts = await contactService.getContacts(filterBy)

            this.setState({ contacts: filteredContacts })
        })
    }

    render() {
        const { contacts, filterTxt } = this.state
        return (
            <section className="contacts-page">
                <div className="control-area">
                    <input id="filterTxt" type="text" placeholder="Search" value={filterTxt} onChange={this.inputHandler} />
                    <button onClick={() => this.props.history.push('/contact/edit')}>
                        <img src={require('../assets/imgs/icons/plus.png').default} alt="person" />
                    </button>
                </div>

                <ul className="contact-list">
                    {contacts.map(user => {
                        return (
                            <li key={user._id}
                                className="contact-preview"
                                onClick={() => {
                                    this.props.history.push('/contact/details/' + user._id)
                                }}
                            >
                                <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
                                <p>{user.name}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
    }
}
