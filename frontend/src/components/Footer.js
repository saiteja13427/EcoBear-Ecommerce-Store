import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; EcoBear</Col>
          {/* Text-center to center the text and py 3 to add a 3 y padding */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
