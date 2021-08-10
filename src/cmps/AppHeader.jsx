import { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../store/actions/userActions'


export class _AppHeader extends Component {

    logout = () => {
        this.props.logout()
    }

    render() {
        const { loggedinUser } = this.props
        return (
            <section className="app-header">
                <nav>
                    <NavLink to="/">
                        <img src={require('../assets/imgs/icons/home.png').default} alt="person" />
                    </NavLink>
                    <NavLink to="/contact">
                        <img src={require('../assets/imgs/icons/contact.png').default} alt="person" />
                    </NavLink>
                    <NavLink to="/charts">
                        <img src={require('../assets/imgs/icons/increase.png').default} alt="person" />
                    </NavLink>
                    {!loggedinUser ? <>
                        <NavLink to="/signup">
                            Signup
                            {/* <img src={require('../assets/imgs/icons/increase.png').default} alt="person" /> */}
                        </NavLink>
                        <NavLink to="/login">
                            Login
                            {/* <img src={require('../assets/imgs/icons/increase.png').default} alt="person" /> */}
                        </NavLink>
                    </> :
                        <button className="btn" onClick={this.logout}>
                            Logout
                        </button>
                    }
                </nav>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedinUser: state.userModule.loggedinUser
    }
}
const mapDispatchToProps = {
    logout,
}

// Connects the store with the component, injects it to the props
export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)



