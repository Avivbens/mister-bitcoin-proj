import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { bitcoinService } from '../services/bitcoin.service'
import { loadContacts } from '../store/actions/contactActions'

export const MovesList = ({ user, fullView }) => {

    const [rate, setRate] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        calcDollars()
    }, [])

    useEffect(() => {
        dispatch(loadContacts())
    }, [user.moves])


    const calcDollars = async () => {
        const rate = await bitcoinService.getRate()
        setRate(rate)
    }

    let moves = user.moves?.sort((m1, m2) => m2.at - m1.at)
    moves = fullView ? moves : moves.slice(0, 3)

    let className = 'moves-list '
    className += fullView ? 'full' : ''

    if (!moves?.length) return (
        <section className="moves-list">
            <h3>No Moves Yet!</h3>
        </section>
    )

    return (
        <section className={className}>
            <h4 className="title">Moves History:</h4>
            {
                moves.map(move => (
                    <label className="move-preview" key={move.at}>
                        <p>
                            <span className="currencies">
                                <span className="bitcoin">B {move.amount}</span> |
                                <span className="dollar">$ {(move.amount / rate).toFixed(2)}</span>
                            </span>
                            <br />
                            {fullView && <>To: {move.to}</>}
                        </p>
                        <p>
                            <Moment fromNow>
                                {move.at}
                            </Moment>
                        </p>
                    </label>
                ))
            }

            {/* <Moment format="YYYY/MM/DD">
                    1976-04-19T12:59-0500
                </Moment> */}
        </section>
    )
}

