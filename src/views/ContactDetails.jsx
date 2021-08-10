import { Component } from 'react'
import { connect } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { getContactById, removeContact, loadContacts } from '../store/actions/contactActions'

// import contactService from '../services/contact.service'

export class _ContactDetails extends Component {

    componentDidMount = async () => {
        await this.props.loadContacts()
        this.loadContact()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
        // else if (prevProps.contact !== this.props.contact) {
        //     this.loadContact()
        // }
    }

    loadContact = async () => {
        const { id } = this.props.match.params
        this.props.getContactById(id)
    }

    render() {
        const { contact } = this.props
        if (!contact) return (<section className="contact-details"></section>)
        return (
            <section className="contact-details">
                <div className="btns">
                    <button onClick={() => this.props.history.push('/contact')}>
                        <img src={require('../assets/imgs/icons/back.png').default} alt="person" />
                    </button>
                    <button onClick={() => this.props.history.push('/contact/edit/' + contact._id)} >
                        <img src={require('../assets/imgs/icons/edit.png').default} alt="person" />
                    </button>
                </div>

                <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
                <p>Name: {contact.name}</p>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>
                <p>Coins: {contact.coins || 0}</p>

                <TransferFund user={contact} />
                <MovesList user={contact} />
            </section>
        )
    }
}



const mapStateToProps = state => {
    return {
        contacts: state.contactModule.contacts,
        contact: state.contactModule.currContact,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    getContactById,
    removeContact,
    loadContacts,
}
export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
