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
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (errorProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
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
        <>
          <Meta title={product.name} />

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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              <ListGroup>
                {product.reviews.length === 0 ? (
                  <Message variant="info">No Reviews</Message>
                ) : (
                  product.reviews.map((review) => {
                    return (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    );
                  })
                )}
                {errorProductReview && (
                  <Message variant="info">{errorProductReview}</Message>
                )}
              </ListGroup>
            </Col>
            <Col md={6}>
              {" "}
              <h2>Write A Customer Review</h2>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    >
                      <option value="">Select..</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>{" "}
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>{" "}
                  <Button type="submit" variant="success" className="my-2">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message variant="info">
                  Please <Link to="/login">Log in</Link> to leave a review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
