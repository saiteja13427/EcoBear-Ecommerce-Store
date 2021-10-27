import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <Card.Title as="div">
          <b>{product.name}</b>
        </Card.Title>
      </Link>

      <Card.Text as="div">
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color="#4bbf73"
        >
          {product.rating} from {product.numReviews} reviews
        </Rating>
      </Card.Text>

      <Card.Text as="h4">₹{product.price}</Card.Text>
    </Card>
  );
};

export default Product;
