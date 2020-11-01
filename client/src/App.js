import React, {useEffect} from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import NavBar from 'components/layout/Navbar';
import Alerts from 'components/layout/Alerts';
import Landing from 'components/layout/Landing';
import BookCourier from 'components/layout/BookCourier';
import store from "src/store";
import {setUser} from "src/actions/auth";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  useEffect(() => {
    store.dispatch(setUser({}, 'get_user'));
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Alerts />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/book-courier" component={BookCourier} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
