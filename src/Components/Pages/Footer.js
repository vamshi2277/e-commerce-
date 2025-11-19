import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../../Styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col md={4} sm={6} className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={4} sm={6} className="footer-col">
            <h5>Categories</h5>
            <ul className="footer-links">
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><AiFillFacebook /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><AiFillTwitterSquare /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="footer-text">© 2024 Your E-commerce Website. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
