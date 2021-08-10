import { Component } from 'react'
import { connect } from 'react-redux'
import { getContactById, loadContacts, setFilterBy } from '../store/actions/contactActions'


export class _ContactsPage extends Component {
    state = {
        filterBy: {
            term: ''
        }
    }

    componentDidMount() {
        this.props.loadContacts()
    }

    onChangeFilter = async () => {
        await this.props.setFilterBy(this.state.filterBy)
        this.props.loadContacts()
    }


    inputHandler = ({ target }) => {
        const field = target.id
        const value = target.type === 'number' ? +target.value : target.value

        this.setState({ filterBy: { [field]: value } }, () => {
            this.onChangeFilter()
        })
    }

    render() {
        const { term } = this.state.filterBy
        const { contacts } = this.props

        return (
            <section className="contacts-page">
                <div className="control-area">
                    <input id="term" type="text" placeholder="Search" value={term} onChange={this.inputHandler} />
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

const mapStateToProps = state => {
    return {
        contacts: state.contactModule.contacts,
        filterBy: state.contactModule.filterBy
    }
}

const mapDispatchToProps = {
    getContactById,
    loadContacts,
    setFilterBy
}

// Connects the store with the component, injects it to the props
export const ContactsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactsPage)
