import { Component } from 'react'
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines'
import { bitcoinService } from '../services/bitcoin.service'


export class ChartsPage extends Component {

    state = {
        marketPrice: [],
        confirmedTransactions: []
    }

    async componentDidMount() {
        const marketPrice = await bitcoinService.getMarketPrice()
        const confirmedTransactions = await bitcoinService.getConfirmedTransactions()

        this.setState({ marketPrice, confirmedTransactions })
    }


    render() {
        const { marketPrice, confirmedTransactions } = this.state
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
}
