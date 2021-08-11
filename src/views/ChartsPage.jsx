import { useEffect, useState } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { bitcoinService } from '../services/bitcoin.service'


export const ChartsPage = () => {

    const [marketPrice, setMarketPrice] = useState([])
    const [confirmedTransactions, setConfirmedTransactions] = useState([])

    useEffect(() => {
        (async () => {
            const marketPrice = await bitcoinService.getMarketPrice()
            const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
            setMarketPrice(marketPrice)
            setConfirmedTransactions(confirmedTransactions)
        })()
    }, [])


    return (
        <section className="charts-page">

            <section className="market-price">
                <h3>Market Prices last 5 Months: </h3>
                <Sparklines className="chart"
                    data={marketPrice}>
                    <SparklinesLine color="blue" />
                </Sparklines>
            </section>

            <section className="confirmed-transactions">
                <h3>Confirm Transactions: </h3>
                <Sparklines className="chart"
                    data={confirmedTransactions}>
                    <SparklinesLine color="blue" />
                </Sparklines>
            </section>
        </section>
    )
}
