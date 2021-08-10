import { Component } from 'react'
import { connect } from 'react-redux'
import { getContactById, removeContact } from '../store/actions/contactActions'

// import contactService from '../services/contact.service'

export class _ContactDetails extends Component {

    componentDidMount() {
        this.loadContact()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }

    loadContact = async () => {
        const { id } = this.props.match.params
        this.props.getContactById(id)
        // const contact = await contactService.getContactById(id)
        // this.setState({ contact })
    }


    render() {
        // const { contact } = this.state
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
                <p className="name">Name: {contact.name}</p>
                <p className="phone">Phone: {contact.phone}</p>
                <p className="email">Email: {contact.email}</p>
            </section>
        )
    }
}



const mapStateToProps = state => {
    return {
        contact: state.contactModule.currContact,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    getContactById,
    removeContact,
}
export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
