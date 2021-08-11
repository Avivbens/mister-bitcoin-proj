import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ContactsList } from '../cmps/ContactsList'
import { loadContacts, setFilterBy } from '../store/actions/contactActions'


export const ContactsPage = ({ history }) => {

    const [filterBy, setCurrFilterBy] = useState({ term: '' })
    const dispatch = useDispatch()
    const { contacts } = useSelector(state => state.contactModule)

    useEffect(() => {
        onChangeFilter()
    }, [filterBy])

    const onChangeFilter = async () => {
        await dispatch(setFilterBy(filterBy))
        dispatch(loadContacts())
    }

    const inputHandler = ({ target }) => {
        const field = target.id
        const value = target.type === 'number' ? +target.value : target.value

        setCurrFilterBy({ [field]: value })
    }

    const { term } = filterBy

    return (
        <section className="contacts-page">
            <div className="control-area">
                <input id="term" type="text" placeholder="Search" value={term} onChange={inputHandler} />
                <button onClick={() => history.push('/contact/edit')}>
                    <img src={require('../assets/imgs/icons/plus.png').default} alt="person" />
                </button>
            </div>

            {contacts && <ContactsList contacts={contacts} />}
        </section>
    )
}

