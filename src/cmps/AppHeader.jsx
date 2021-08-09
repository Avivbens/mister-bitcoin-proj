import { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class AppHeader extends Component {
    render() {
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
                </nav>
            </section>
        )
    }
}
