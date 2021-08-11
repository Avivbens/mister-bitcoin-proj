import { Component } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { bitcoinService } from '../services/bitcoin.service'
import { loadContacts } from '../store/actions/contactActions'

export class _MovesList extends Component {

    state = {
        rate: 1
    }

    componentDidMount() {
        this.calcDollars()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.moves !== this.props.user.moves) {
            // ?
            this.props.loadContacts()
        }
    }

    calcDollars = async () => {
        const rate = await bitcoinService.getRate()
        this.setState({ rate })
    }

    render() {
        const { user, fullView } = this.props
        const { rate } = this.state
        const moves = fullView ? user.moves.reverse() : user.moves.reverse().splice(0, 3)
        let className = 'moves-list '
        className += fullView ? 'full' : ''

        if (!moves?.length) return <></>

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
}

const mapStateToProps = state => {
    return {
        contact: state.contactModule.currContact,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadContacts
}
export const MovesList = connect(mapStateToProps, mapDispatchToProps)(_MovesList)
