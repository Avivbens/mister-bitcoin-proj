import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { bitcoinService } from '../services/bitcoin.service'

export const HomePage = () => {

    const [currBitValue, setCurrBitValue] = useState(0)
    const [currBitRate, setCurrBitRate] = useState(1)
    const { loggedinUser } = useSelector(state => state.userModule)

    useEffect(() => {
        (async () => {
            if (!loggedinUser) return setCurrBitValue(0)
            const bitValue = await bitcoinService.getValueCost(loggedinUser.coins)
            const bitRate = await bitcoinService.getRate()
            setCurrBitRate(bitRate)
            setCurrBitValue(bitValue.toFixed(3))
        })()
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
                <div className="data">
                    <span className="left">
                        <span>Current Balance</span>
                        <p className="bitcoin">BIT: <span>B {loggedinUser.coins.toLocaleString('en-GB')}</span></p>
                        <p className="dollar">USD:  <span>{formatter.format(currBitValue)}</span></p>
                    </span>
                    <span className="right">
                        <span>Current BTC USD</span>
                        <span className="currency">
                            {formatter.format(1 / currBitRate)}
                        </span>
                    </span>
                </div>

                <MovesList user={loggedinUser} fullView={true} />
            </div>
        </section>
    )
}

