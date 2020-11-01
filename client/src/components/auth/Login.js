import React, {useState} from "react";
import {  Form, Button } from "react-bootstrap";


import store from "src/store";
import constants from "src/constants";
import {setUser} from "src/actions/auth";
import { Redirect } from "react-router-dom";

console.log(constants);

export default (props) => {

  const [redirect, setRedirect] = useState(false);

  const getFormInputValue = (e, name) => {
    return e.target.querySelector(`input[name="${name}"]`).value
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: getFormInputValue(e, 'email'),
      password: getFormInputValue(e, 'password')
    };
    store.dispatch(setUser(formData, 'login', () => {
      setRedirect(true);
    }));
  };

  if(redirect){
    return <Redirect to={'/book-courier'} />
  }


  return <Form className="p-3 mx-auto" style={{maxWidth: '420px'}} onSubmit={onSubmit}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  name="email" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password"/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Sign In
    </Button>
  </Form>
}