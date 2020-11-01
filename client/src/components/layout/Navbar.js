import React from "react";
import {connect} from "react-redux";
import { Button, Navbar } from "react-bootstrap";
import {Link} from "react-router-dom";

import {removeUser} from "src/actions/auth";



const NavbarComponent = (props) => {
  const onClickLogout = () => {
    props.removeUser();
  };

  let component;
  if(!props.currentUser){
    component = <Navbar className="bg-dark d-flex flex-row-reverse">
      <Link to='/register'>Register</Link>
      <Link  className='mr-3' to='/login'>Login</Link>
    </Navbar>
  } else {
    component = <Navbar className="bg-dark d-flex flex-row-reverse">
      <Button onClick={onClickLogout} variant="link">Logout</Button>
      <span style={{color: '#fff'}}>Hi {props.currentUser.name}</span>
    </Navbar>
  }
  return component
};
const mapStateToProps = state => ({currentUser: state.auth && state.auth.currentUser });

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => {dispatch(removeUser())} ,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);