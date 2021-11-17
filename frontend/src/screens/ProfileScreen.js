import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { myListOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error: getError, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: updateError } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: orderLoading, error: orderError, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        setMessage("");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserProfile("profile"));
        dispatch(myListOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match");
    } else {
      //Add current password field and verify it on backend before changing the password
      //UPDATE PROFILE ACTION
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          currentPassword,
          newPassword,
        })
      );
    }
  };
  return (
    <Row>
      <Col md={4} className="my-2">
        <h1>User Profile</h1>
        {getError && <Message variant="danger">{getError}</Message>}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {/* Calling state setters like this lead to too many re-renders, very dangerous{success && setMessage("")} */}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8} className="my-2">
        <h2>My Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : orderError ? (
          <Message variant="danger">{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVER</th>
              <th>DETAILS</th>
            </tr>
            <tbody>
              {orders &&
                orders.map((order, i) => {
                  return (
                    <tr key={order._id}>
                      <td>{i + 1}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="success">
                            DETAILS
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
