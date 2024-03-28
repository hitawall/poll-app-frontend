// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/" render={() => <h1>Welcome to our app!</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
