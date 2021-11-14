import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProducts,
  createProduct,
} from "../actions/productActions";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userInfo.isAdmin) {
        history.push("/login");
      }
    }

    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      //Redirect to edit screen and edit the sample product and update to create a new product
      history.push(`/admin/product,${createdProduct._id}/create`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const createProductHandler = () => {
    //Create Products to create a sample product
    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    //Delete products
    dispatch(deleteProducts(id));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col md={11} xs={9}>
          <h1>Products</h1>
        </Col>
        <Col md={1} xs={3} className="text-right">
          <Button
            className="my-3 btn-md"
            onClick={() => {
              createProductHandler();
            }}
          >
            <i className="fas fa-plus" />
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="fan" className="btn-sm">
                          <i className="far fa-edit fa-lg"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash fa-lg"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
