import { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../store/actions/userActions'


export class _SignupPage extends Component {

    state = {
        username: '',
        password: ''
    }

    signup = async (ev) => {
        ev.preventDefault()
        const { username, password } = this.state

        await this.props.login({ username, password })
        this.props.history.push('/')
    }

    inputHandler = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        this.setState({ [field]: value })
    }

    render() {
        const { username, password } = this.state
        return (
            <section className="signup-page">
                <img src={require('../assets/imgs/icons/bitcoin.png').default} alt="person" />

                <form onSubmit={this.signup}>
                    <label>
                        Username:
                        <input value={username} name="username"
                            onChange={this.inputHandler} type="text"
                            placeholder="Username" autoComplete="off" />
                    </label>
                    <label>
                        Password:
                        <input value={password} name="password"
                            onChange={this.inputHandler} type="password"
                            placeholder="Password" />
                    </label>

                    <button className="signup-btn">Sign Up!</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = {
    login,
    logout,
}

// Connects the store with the component, injects it to the props
export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)

