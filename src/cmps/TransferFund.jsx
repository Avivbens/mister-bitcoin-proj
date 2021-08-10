import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { transferTo } from '../store/actions/userActions'


export class _TransferFund extends Component {

    state = {
        amount: ''
    }

    inputHandler = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        this.setState({ [field]: value })
    }

    transfer = async (ev) => {
        ev.preventDefault()
        const { user } = this.props
        const { amount } = this.state

        await this.props.transferTo(user._id, amount)
        // this.props.history.push('/contact')
    }

    render() {
        const { user } = this.props
        const { amount } = this.state

        if (!user) return <section className="transfer-fund"></section>

        return (
            <section className="transfer-fund">
                <h4>Transfer coins to {user.name}</h4>

                <form onSubmit={this.transfer}>
                    <label>
                        Amount:
                        <input name="amount" type="number" value={amount} onChange={this.inputHandler} />
                    </label>

                    <button className="btn">Transfer</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    transferTo,
}
export const TransferFund = withRouter(connect(mapStateToProps, mapDispatchToProps)(_TransferFund))


