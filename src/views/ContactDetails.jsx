import { Component } from 'react'
import contactService from '../services/contact.service'

export class ContactDetails extends Component {
    state = {
        contact: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const contact = await contactService.getContactById(id)
        this.setState({ contact })
    }


    render() {
        const { contact } = this.state
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
