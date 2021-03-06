import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Image, Pagination } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { listTopSellers } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';
// import { prodcuts } from '../products';

export default function HomeScreen(props) {
  const keyword = props.match.params.keyword;
  const pageNumber = props.match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, pages, page, loading, error } = productList;

  const userTopSellers = useSelector((state) => state.userTopSellers);
  const {
    sellers,
    loading: loadingSellers,
    error: errorSellers,
  } = userTopSellers;
  useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }));
    dispatch(listTopSellers());
  }, [pageNumber]);
  return (
    <>
      {!keyword &&
        (loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <Carousel className="bg-dark">
            {sellers.map((seller) => (
              <Carousel.Item key={seller._id}>
                <Link className="seller-image" to={`/seller/${seller._id}`}>
                  <Image
                    className="seller-image"
                    fuild
                    src={seller.seller.logo}
                  />
                  <Carousel.Caption>
                    <h2>{seller.seller.name}</h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        ))}

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h1>Featured Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
              >
                <Pagination.Item active={x + 1 === page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
        </>
      )}
    </>
  );
}
