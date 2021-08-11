import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions/userActions'

export const AppHeader = () => {

    const { loggedinUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <section className="app-header">
            <nav>
                <NavLink to="/">
                    <img src={require('../assets/imgs/icons/home.png').default} alt="person" />
                </NavLink>
                <NavLink to="/contact">
                    <img src={require('../assets/imgs/icons/users.png').default} alt="person" />
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
                    <button className="btn" onClick={onLogout}>
                        Logout
                    </button>
                }
            </nav>
        </section>
    )
}



