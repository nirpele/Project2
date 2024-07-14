import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = { username, password };
      const url = 'http://localhost:3000/auth';

      const resp = await axios.post(url, loginData, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = resp.data;
      if (data.accessToken) {
        sessionStorage['accessToken'] = data.accessToken;
        setIsLoggedIn(true);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  if (isLoggedIn) {
    navigate("/hello");
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2>Login</h2>
            </Card.Header>
            <Card.Body>
              <h6>Admin User Name: e</h6>
              <h6>Admin Password: e</h6>
              <Form onSubmit={handleUserDetailsSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="username">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="mt-3">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
