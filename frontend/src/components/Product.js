import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <Card className="my-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="strong">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text>
        <Card.Text as="div">
          <Row>
            <Col>{product.brand}</Col>
            <Col className="text-right">
              <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}
              </Link>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text as="h2">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
