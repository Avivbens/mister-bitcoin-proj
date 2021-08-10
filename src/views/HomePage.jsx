import { Component } from 'react'
import { connect } from 'react-redux'
import { MovesList } from '../cmps/MovesList'
import { bitcoinService } from '../services/bitcoin.service'

class _HomePage extends Component {

    state = {
        currBitValue: null
    }

    async componentDidMount() {
        const { loggedinUser } = this.props
        if (!loggedinUser) return

        const currBitValue = await bitcoinService.getValueCost(loggedinUser.coins)
        this.setState({
            currBitValue: currBitValue.toFixed(4)
        })
    }

    render() {
        const { currBitValue } = this.state
        const { loggedinUser } = this.props

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
}

const mapStateToProps = state => {
    return {
        loggedinUser: state.userModule.loggedinUser
    }
}

// Connects the store with the component, injects it to the props
export const HomePage = connect(mapStateToProps)(_HomePage)


