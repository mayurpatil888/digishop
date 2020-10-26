import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

function ProductDetails() {
  return <div className={'details-1'} style={{ backgroundColor: 'red', width: '200px', height: '300px' }}>Product Details</div>
}

const Home = (props) => {
  return <div>
    <Link to='/product/123'>product</Link>
  </div>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product/123" component={ProductDetails} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
