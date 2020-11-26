import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { isAuth, showAlert }  from '../../helpers/actions';
import { axiosPost } from "../../helpers/api";


function Register() {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.user.token);
    const [ form, setForm ] = useState({
        username: '',
        email: '',
        password: ''
    });


    function changeHandler(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function submitHandler(e) {
        e.preventDefault();
        let url = process.env.REACT_APP_ACC + "/register";
        let data = await axiosPost(url, form);
        console.log('data', data);
        if(data) {
          dispatch(showAlert({ variant: "success", message: "Registration Successful!"}));
          dispatch(isAuth(data.token));
        } else {
          dispatch(showAlert({ variant: "danger", message: "Registration Unsuccessful. Please try again."}))
        }
    }

  return (
    <Container>
      <Row>
      <Col md={6} s={12}
        className="cart-item"
        style={{
          height: '60vh',
          backgroundImage: `url(https://media.karousell.com/media/photos/products/2017/08/30/wedding_bridal_bouquet_fresh_flowers_hydrangeas_and_roses_1504082166_c902161b.jpg)`
        }}
          >
      </Col>
      <Col md={6} s={12}>
        <Form onSubmit={submitHandler} className="cart-item">
          <h3 className="formLabel">Register</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="text" value={form.username} minLength={5} placeholder="Username" onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={form.email} placeholder="Email" onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={form.password} minLength={6} placeholder="Password" onChange={changeHandler} />
            
          </Form.Group>
          <Button className="button" type="submit">
              Register
          </Button>
        </Form>
        { authState && <Redirect to="/" /> }
      </Col>
      </Row>
    </Container>
  );
}

export default Register;
