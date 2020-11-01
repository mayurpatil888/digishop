import React, {useState} from "react";
import {  Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const style = {
  maxWidth: '600px',
  height: 'auto'
};
const wrapperStyle = {
  color: '#333c4e',
  fontFamily: 'ui-serif'
};
const cardStyle = {
  backgroundColor: '#f3f9fe',
  height: '220px',
  width:'600px',
  boxShadow: '0 14px 20px 0 rgba(164, 182, 206, 0.503085)'
}

export default (props) => {
  const bookTransport = () => {
    setRedirect('/book-courier');
  }

  const [redirect, setRedirect] = useState('');

  if(redirect){
    return <Redirect to={'/book-courier'} />
  }


  return <div class='d-flex flex-row' style={wrapperStyle}>
    <img src='https://digi-service.s3.ap-south-1.amazonaws.com/common/3685741.jpg' class="img-fluid" style={style} />
    <div className='mt-5 ml-5'>
      <h1>Transport anything easily</h1>
      <span style={{fontSize: '22px'}}>Safest service at low price</span>
      <div className='mt-4 p-4' style={cardStyle}>
        <Form>
          <Form.Group controlId="fromAddress">
            <Form.Control type="text" placeholder="From Address" />
          </Form.Group>

          <Form.Group controlId="toAddress">
            <Form.Control type="text" placeholder="To Address" />
          </Form.Group>

          <Button className='mt-3' style={{width: '100%'}} onClick={bookTransport} variant="info">
            Book your Transport
          </Button>
        </Form>

      </div>
    </div>
  </div>
}