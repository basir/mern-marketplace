import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Row, Col, NavDropdown } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signout());
    document.location.href = '/';
  };
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <LinkContainer to="/">
              <Navbar.Brand>MERN Marketplace</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbar-menu"></Navbar.Toggle>
            <Navbar.Collapse
              id="navbar-menu"
              className="justify-content-between"
            >
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="usermenu">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleSignout}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isSeller && (
                  <NavDropdown title="Seller" id="adminmenu">
                    <LinkContainer to="/productlist/seller">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderlist/seller">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main>
          <Container fluid className="py-3">
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
            ></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/userlist" component={UserListScreen}></Route>
            <Route path="/user/:id/edit" component={UserEditScreen}></Route>
            <Route
              path="/productlist/seller"
              component={ProductListScreen}
            ></Route>
            <Route path="/orderlist/seller" component={OrderListScreen}></Route>
            <Route
              path="/productlist/:pageNumber?"
              exact
              component={ProductListScreen}
            ></Route>
            <Route path="/orderlist" exact component={OrderListScreen}></Route>
            <Route path="/seller/:id" exact component={SellerScreen}></Route>
            <Route path="/search/:keyword" component={HomeScreen} exact></Route>
            <Route
              path="/page/:pageNumber"
              component={HomeScreen}
              exact
            ></Route>
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            ></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </Container>
        </main>
        <footer>
          <Container>
            <Row>
              <Col className="text-center py-3">@2020 All right reserved.</Col>
            </Row>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
