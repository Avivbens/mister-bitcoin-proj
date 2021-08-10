import { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import { contactService } from '../services/contact.service'

export class HomePage extends Component {

    state = {
        user: {},
        currBitValue: 0.01570048
    }

    async componentDidMount() {
        const user = await contactService.getUser()
        const currBitValue = await bitcoinService.getRate(user.coins)
        this.setState({
            user,
            currBitValue: currBitValue.toFixed(4)
        })
    }

    render() {
        const { user, currBitValue } = this.state

        return (
            <section className="home-page">
                <div className="user-interface">
                    <h3 className="title">Hello {user.name} !</h3>
                    <p>💰 Coins: {user.coins}</p>
                    <p>💵 BTC: {currBitValue}</p>
                    {/* <div className="btns">
                        <button className="btn" onClick={() => this.props.history.push('/contact')}>Contacts</button>
                        <button className="btn" onClick={() => this.props.history.push('/charts')}>Charts</button>
                    </div> */}
                </div>
            </section>
        )
    }
}
