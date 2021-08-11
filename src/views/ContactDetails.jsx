import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { getContactById, loadContacts } from '../store/actions/contactActions'

// import contactService from '../services/contact.service'

export const ContactDetails = ({ match, history }) => {

    const { currContact: contact } = useSelector(state => state.contactModule)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadContacts())
    }, [])

    useEffect(() => {
        loadContact()
    }, [match.params.id])


    const loadContact = async () => {
        const { id } = match.params
        dispatch(getContactById(id))
    }


    if (!contact) return (<section className="contact-details"></section>)
    return (
        <section className="contact-details">
            <div className="btns">
                <button onClick={() => history.push('/contact')}>
                    <img src={require('../assets/imgs/icons/back.png').default} alt="person" />
                </button>
                <button onClick={() => history.push('/contact/edit/' + contact._id)} >
                    <img src={require('../assets/imgs/icons/edit.png').default} alt="person" />
                </button>
            </div>

            <img src={require('../assets/imgs/user-icon.png').default} alt="person" />
            <p className="name"> {contact.name}</p>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <p>Coins: {contact.coins || 0}</p>

            <TransferFund user={contact} />
            <MovesList user={contact} />
        </section>
    )
}
