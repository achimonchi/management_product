import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';

class Home extends React.Component {
    render() {
        return (
            <Router>
                <div id="home">
                    <Switch>
                        <Route exact component={Signup} path="/signup" />
                        <Route exact component={Signin} path="/signin" />
                        <Route exact component={Signin} path="/" />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Home;