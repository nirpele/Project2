import React, { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import axios from "axios";

const mainUrl = "http://localhost:3000/";

const App = () => {
  const dispatch = useDispatch();
  const accessToken = sessionStorage['accessToken'];

  useEffect(() => {
    const loadCustomerStorage = async () => {
      try {
        const [customersResponse, productsResponse, purchasesResponse] = await Promise.all([
          axios.get(`${mainUrl}customers`, {
            headers: {
              "x-access-token": accessToken,
            },
          }),
          axios.get(`${mainUrl}products`, {
            headers: {
              "x-access-token": accessToken,
            },
          }),
          axios.get(`${mainUrl}purchases`, {
            headers: {
              "x-access-token": accessToken,
            },
          }),
        ]);

        const customersData = customersResponse.data;
        const productsData = productsResponse.data;
        const purchasesData = purchasesResponse.data;

        console.log(customersData);
        console.log(productsData);
        console.log(purchasesData);

        dispatch({
          type: "LOAD",
          payload: {
            products: productsData,
            customers: customersData,
            purchases: purchasesData,
          },
        });
      } catch (error) {
        console.error("Error loading customer data:", error);
      }
    };

    loadCustomerStorage();
  }, [accessToken, dispatch]);

  return (
    <Container className="mt-5">
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <LinkContainer to="/customers">
              <Nav.Link>Customers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/purchases">
              <Nav.Link>Purchases</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default App;
