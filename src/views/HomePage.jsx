import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { bitcoinService } from '../services/bitcoin.service'

export function HomePage() {

    const [currBitValue, setCurrBitValue] = useState(0)
    const { loggedinUser } = useSelector(state => state.userModule)


    useEffect(() => {
        async function a() {
            if (!loggedinUser) return setCurrBitValue(0)
            const bitValue = await bitcoinService.getValueCost(loggedinUser.coins)
            setCurrBitValue(bitValue.toFixed(3))
        }
        a()
    }, [loggedinUser])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })



    if (!loggedinUser) return (
        <section className="home-page">
            <h3>Please login!</h3>
        </section>)
    return (
        <section className="home-page">
            <div className="layout">
                <h3 className="title">Hi, {loggedinUser.name} !</h3>
                <p className="bitcoin">BIT: <span>B {loggedinUser.coins.toLocaleString('en-GB')}</span></p>
                <p className="dollar">USD:  <span>{formatter.format(currBitValue)}</span></p>

                <MovesList user={loggedinUser} fullView={true} />
            </div>
        </section>
    )
}

