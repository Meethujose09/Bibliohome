import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booklist.css';
import { Container, Row, Col, Card ,NavbarBrand,Navbar} from 'reactstrap';
import { baseURL } from '../../baseURL';
import BiblioCard from '../../components/Card/Card'; // Update import path
import BiblioModal from '../../components/Modal/Modal'; // Import BiblioModal component
import { Button } from 'reactstrap'; // Import Button from Reactstrap
import BookImg from '../../asset/images/book.jpg';
import { BsJustify } from 'react-icons/bs';

import Cart from'../../asset/images/wishlist.png';
const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${baseURL}books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Run this effect only once when the component mounts

  const toggleWishlistModal = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div>
    <Navbar
    className="my-2"
    color="dark"
    dark
    style={{ marginTop: 0 }}
  >
    <NavbarBrand href="/">
      <img
        alt="logo"
        src="/logo-white.svg"
        style={{
          height: 40,
          width: 40
        }}
      />
    </NavbarBrand>
  </Navbar>
    <Container>
    
      <Row className="card-row">
        {books.map((book, index) => (
          <Col key={index}>
            <Card style={{
              width: '18rem',
              border: '1px solid rgba(106, 111, 119, 0.15)',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div> <div>
                <img
                  alt="Sample"
                  src={BookImg}
                  style={{
                    maxHeight: '100px',
                    maxWidth: '200px',
                    objectFit: 'contain'
                  }}
                />
              </div>
                <div>
                  <h4>{book.Title}</h4>
                  <p>{book.Author}</p>
                  <Button className="wishlist-button" onClick={toggleWishlistModal}>
                    <span className="heart">&#x2665;</span> Add to Wishlist
                  </Button>
                </div></div>

            </Card>
          </Col>
        ))}
      </Row>
      <BiblioModal isOpen={toggleModal} toggle={toggleWishlistModal} >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column' }}>
          <img src={Cart}style={{height:'50px',marginBottom:'30px'}}/>
          <h5>Book Added to wishlist</h5>

        </div>



      </BiblioModal>
    </Container>
    </div>
  );
};

export default Booklist;
