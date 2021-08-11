import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { transferTo } from '../store/actions/userActions'


export const TransferFund = ({ user }) => {

    const [amount, setAmount] = useState('')
    const dispatch = useDispatch()

    const inputHandler = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value

        setAmount(value)
    }

    const transfer = async (ev) => {
        if (amount <= 0) {
            setAmount('')
            return
        }
        ev.preventDefault()

        await dispatch(transferTo(user._id, amount))
        setAmount('')
    }

    if (!user) return <section className="transfer-fund"></section>

    return (
        <section className="transfer-fund">
            <h4>Transfer coins to {user.name}</h4>

            <form onSubmit={transfer}>
                <label>
                    Amount:
                    <input name="amount" type="number" value={amount} onChange={inputHandler} />
                </label>

                <button className="btn">Transfer</button>
            </form>
        </section>
    )
}
