import React, { useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listOrdersMine } from '../actions/orderActions';
import Axios from 'axios';

export default function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  if (!userSignin.userInfo) {
    props.history.push('/signin');
  }
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMineList;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords are not matched.');
      return;
    }
    dispatch(
      updateUserProfile({
        userId: user._id,
        email,
        name,
        password,
        seller: user.isSeller
          ? {
              logo: sellerLogo,
              name: sellerName,
              description: sellerDescription,
            }
          : {},
      })
    );
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    Axios.post('/api/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setSellerLogo(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setUploading(false);
      });
  };
  useEffect(() => {
    if (!user.name) {
      dispatch(detailsUser('mine'));
      dispatch(listOrdersMine());
    } else {
      setName(user.name);
      setEmail(user.email);
      setSellerName(user.seller ? user.seller.name : '');
      setSellerLogo(user.seller ? user.seller.logo : '');
      setSellerDescription(user.seller ? user.seller.description : '');
    }
  }, [user]);
  const dispatch = useDispatch();
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && <MessageBox variant="success">Profile Updated</MessageBox>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {user.isSeller && (
            <>
              <h2>Seller</h2>

              <Form.Group controlId="sellerName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter seller name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="sellerLogo">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter seller logo url"
                  value={sellerLogo}
                  onChange={(e) => setSellerLogo(e.target.value)}
                ></Form.Control>
                <Form.File
                  id="image-file"
                  label="Choose Logo"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <LoadingBox />}
              </Form.Group>
              <Form.Group controlId="sellerDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter seller description"
                  value={sellerDescription}
                  onChange={(e) => setSellerDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>Order History</h2>
        {loadingOrders ? (
          <LoadingBox></LoadingBox>
        ) : errorOrders ? (
          <MessageBox variant="danger">{errorOrders}</MessageBox>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}
