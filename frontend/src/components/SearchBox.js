import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Form onSubmit={submitHandler} inline className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="Search Products.."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button variant="outline-success" className="p-2">
          Search
        </Button>
      </Form>
    </>
  );
};

//Exposting the searchbbox withRouter in order to have access to history prop.
//Have to pass history as a prop wherever we are using this component
export default withRouter(SearchBox);
