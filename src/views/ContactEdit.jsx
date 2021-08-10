import { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactEdit extends Component {

    state = {
        contact: null
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const contact = id ? await contactService.getContactById(id) : contactService.getEmptyContact()
        this.setState({ contact })
    }

    saveContact = async (ev) => {
        ev.preventDefault()

        if (!this.state.contact) return
        await contactService.saveContact(this.state.contact)
        this.props.history.push('/contact')
    }

    removeContact = async () => {
        if (!this.state.contact?._id) return

        try {
            await contactService.deleteContact(this.state.contact._id)
            this.props.history.push('/contact')

        } catch (error) {
            console.log('Failed to delete contact!')
        }
    }

    inputHandler = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        const contact = JSON.parse(JSON.stringify(this.state.contact))
        contact[field] = value

        this.setState({ contact })
    }


    render() {
        const { contact } = this.state
        if (!contact) return (<section className="contact-edit"></section>)
        return (
            <section className="contact-edit">
                <div className="btns">
                    <button onClick={() => this.props.history.push('/contact')}>
                        <img src={require('../assets/imgs/icons/back.png').default} alt="person" />
                    </button>
                    <button onClick={this.removeContact} >
                        <img src={require('../assets/imgs/icons/delete.png').default} alt="person" />
                    </button>
                </div>

                <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
                <form onSubmit={this.saveContact} className="edit-contact">
                    <label>
                        <span>Name</span>
                        <input className="name" name="name" onChange={this.inputHandler} value={contact.name} />
                    </label>
                    <label>
                        <span>Phone</span>
                        <input className="phone" name="phone" onChange={this.inputHandler} value={contact.phone} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input className="email" name="email" onChange={this.inputHandler} value={contact.email} />
                    </label>


                    <button className="btn">Save</button>
                </form >

            </section >
        )
    }
}
