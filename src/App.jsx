import { HashRouter as Router, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'


import { HomePage } from "./views/HomePage.jsx"
import { ContactsPage } from './views/ContactsPage.jsx'
import { ContactDetails } from './views/ContactDetails.jsx'
import { ChartsPage } from './views/ChartsPage.jsx'
import { ContactEdit } from './views/ContactEdit.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { connect } from 'react-redux'
import { SignupPage } from './views/SignupPage.jsx'

export function _App({ loggedInUser }) {
    return (
        <Router>
            <main className="app">
                <AppHeader />
                <Switch>
                    <Route path="/contact/edit/:id?" component={ContactEdit} />
                    <Route path="/contact/details/:id?" component={ContactDetails} />
                    <Route path="/contact" component={ContactsPage} />
                    <Route path="/charts" component={ChartsPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </Router >
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}

export const App = connect(mapStateToProps)(_App)


