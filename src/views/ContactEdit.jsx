import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'

export const ContactEdit = ({ match, history }) => {

    const [contact, setContact] = useState(null)

    useEffect(() => {
        (async () => {
            const { id } = match.params
            const contact = id ? await contactService.getContactById(id) : contactService.getEmptyContact()
            setContact(contact)
        })()
    }, [match.params])

    const saveContact = async (ev) => {
        ev.preventDefault()

        if (!contact) return
        await contactService.saveContact(contact)
        history.push('/contact')
    }

    const removeContact = async () => {
        if (!contact?._id) return

        try {
            await contactService.deleteContact(contact._id)
            history.push('/contact')

        } catch (error) {
            console.log('Failed to delete contact!')
        }
    }

    const inputHandler = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        const contact = JSON.parse(JSON.stringify(contact))
        contact[field] = value

        setContact(contact)
    }


    if (!contact) return (<section className="contact-edit"></section>)
    return (
        <section className="contact-edit">
            <div className="btns">
                <button onClick={() => history.push('/contact')}>
                    <img src={require('../assets/imgs/icons/back.png').default} alt="person" />
                </button>
                <button onClick={removeContact} >
                    <img src={require('../assets/imgs/icons/delete.png').default} alt="person" />
                </button>
            </div>

            <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
            <form onSubmit={saveContact} className="edit-contact">
                <label>
                    <span>Name</span>
                    <input className="name" name="name" onChange={inputHandler}
                        value={contact.name}
                        autoComplete="off"
                    />
                </label>
                <label>
                    <span>Phone</span>
                    <input className="phone" name="phone"
                        onChange={inputHandler} value={contact.phone} />
                </label>
                <label>
                    <span>Email</span>
                    <input className="email" name="email"
                        onChange={inputHandler} value={contact.email} />
                </label>


                <button className="btn">Save</button>
            </form >

        </section >
    )
}
