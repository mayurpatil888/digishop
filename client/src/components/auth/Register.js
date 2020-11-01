import React, {useState} from "react";
import {  Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import store from "src/store";
import {setAlert} from "src/actions/alerts";
import {setUser} from "src/actions/auth";



const Register = () => {

  const [redirect, setRedirect] = useState(false);

  const getFormInputValue = (e, name) => {
    return e.target.querySelector(`input[name="${name}"]`).value
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: getFormInputValue(e, 'name'),
      email: getFormInputValue(e, 'email'),
      password: getFormInputValue(e, 'password'),

    }
    if(formData.password !==  getFormInputValue(e, 'password2')){
      store.dispatch(setAlert('Password should be same', 'danger'));
      return;
    }
    store.dispatch(setUser(formData, 'register', () => {
      setRedirect(true);
    }));
  };

  if(redirect){
    return <Redirect to={'/book-courier'} />
  }


  return <Form className="p-3 mx-auto" style={{maxWidth: '420px'}} onSubmit={onSubmit}>
    <Form.Group controlId="formBasicName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Name" name="name" required/>
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  name="email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password"/>
    </Form.Group>

    <Form.Group controlId="formBasicPassword2">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Confirm Password" name="password2"/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Sign Up
    </Button>
  </Form>
}

export default Register;