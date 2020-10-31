import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';


const Home = (props) => {
  return <div>
    <Link to='/regiter'>product</Link>
  </div>
}

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
