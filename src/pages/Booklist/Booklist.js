import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booklist.css';

import { Container, Row, Col, Card, Navbar, NavbarBrand, Nav, NavItem, NavLink, Input, InputGroup, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { baseURL } from '../../baseURL';

import BiblioModal from '../../components/Modal/Modal'; // Import BiblioModal component
import AddModal from '../../components/Modal/Modal';
import BookImg from '../../asset/images/book.jpg';
import { BsJustify } from 'react-icons/bs';
import Logo from '../../asset/images/logo.png';
import Cart from '../../asset/images/wishlist.png';
const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const[addBookModal,setAddBookModal] =useState(false);

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
const toggleAddModal=()=>{
  setAddBookModal(!addBookModal)
}
  const toggleWishlistModal = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div>
      <Navbar color="black" dark expand="md">
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={Logo}
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              marginRight: '20px'
            }}
          />
          <span className="ml-2 text-white">Booklist</span>
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          <InputGroup className="search-bar" style={{ border: 'none', display: 'flex', alignItems: 'center' }}>

            <Input
              placeholder="Search..."
              className="search-input"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                outline: 'none',

                '&::placeholder': {
                  color: 'white'
                }
              }}
            />
            <FaSearch className="search-icon" style={{ color: 'white' }} />
          </InputGroup>
        </Nav>
        <Nav navbar>
          <NavItem>
            <Button onClick={toggleAddModal}>Add Book</Button>
            <NavLink href="#"><FaUser style={{ color: 'white' }} /></NavLink> {/* User icon */}
          </NavItem>
        </Nav>
      </Navbar>
      <Container style={{ border: '1px solid rgba(106, 111, 119, 0.15)' }}>
        <Row className="card-row">
          {books.map((book, index) => (
            <Col key={index}>
              <Card style={{
                width: '18rem',
                border: '1px solid rgba(106, 111, 119, 0.15)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px'
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={Cart} style={{ height: '50px', marginBottom: '30px' }} />
            <h5>Book Added to wishlist</h5>
          </div>
        </BiblioModal>
        <AddModal isOpen={addBookModal} toggle={toggleAddModal} >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
           
          </div>
        </AddModal>
      </Container>
    </div>
  );
};

export default Booklist;
