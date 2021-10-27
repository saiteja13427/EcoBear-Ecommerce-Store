import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, Number(quantity)));
    history.push(`/cart`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                  color="#4bbf73"
                />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>

              <Card className="m-3">
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>Price:</Col>
                    <Col md={6}>₹{product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={6}>Status:</Col>
                    <Col md={6}>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Quantity:</Col>
                      <Col md={6}>
                        <Form.Select
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </Card>
              <ListGroup.Item className="d-grid gap-2">
                <Row>
                  <Col className="d-grid gap-2">
                    <Button
                      onClick={addToCartHandler}
                      variant="dark"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
                <Button variant="success" disabled={product.countInStock === 0}>
                  Buy Now
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
