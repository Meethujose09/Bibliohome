import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booklist.css';
import {
  Container, Row, Col, Card, Navbar, NavbarBrand, Nav, NavItem, NavLink, Input, InputGroup,
  Button,
  ModalFooter,
  Tooltip, FormGroup, Label, Form
} from 'reactstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { baseURL } from '../../baseURL';
import BiblioModal from '../../components/Modal/Modal'; // Import BiblioModal component
import { useNavigate } from "react-router-dom";
import BookImg from '../../asset/images/book.jpg';
import Logo from '../../asset/images/logo.png';
import Add from '../../asset/images/add.png';
import Cart from '../../asset/images/wishlist.png';
import { BsX } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import wishlisticon from '../../asset/images/wishlisticon.png';
import Swal from 'sweetalert2';
import logout from '../../asset/images/turn-off.png';

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [addBookModal, setAddBookModal] = useState(false);
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    ISBN: ''
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false)
  const tooltoggle2 = () => setTooltipOpen2(!tooltipOpen2);
  const tooltoggle = () => setTooltipOpen(!tooltipOpen);
  const [error, setError] = useState(false);

  const [searchText, setSearchText] = useState('');
  let navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the books API
    axios.get(`${baseURL}books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    

  }, []); // Run this effect only once when the component mounts
 // Function to fetch books based on search term using Axios
  const handleSearch = async(event) => {
    if(event.target.value){
      try {
        const response = await axios.get(`${baseURL}books/searchBook/${event.target.value}`);
        setBooks(response.data);
      } catch (error) {
       console.log('error',error)
      } 
    }else{
      axios.get(`${baseURL}books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      setBooks(books)
    }
 

  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the changed field

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.title === undefined || formData.author === undefined || formData.isbn === undefined) {
      setError(true)
    } else {
      // No validation logic (removed)


      // Prepare data for API request
      const data = {
        Title: formData.title,
        Author: formData.author,
        ISBN: formData.isbn,
      };
      console.log(data)
      // Send POST request to API using Axios

      await axios.post(`${baseURL}books`, data)
        .then(response => {
          setError(false)
          toggleAddModal();
          // Handle successful response (e.g., display success message)
          console.log('Book created successfully:', response.data); // Assuming data contains the created book details

          // Reset form data
          setFormData({ title: '', author: '', isbn: '' });
        })
        .catch(error => {
          toggleAddModal();
          console.error('Error fetching data:', error);
        });
    }

  };
  const toggleAddModal = () => {
    setAddBookModal(!addBookModal)
  }
  const toggleWishlistModal = () => {
    setToggleModal(!toggleModal);
  };

  // function to add book to reading list
  const addBookToList = async(book) => {
 
    await axios.post(`${baseURL}wishlist`, {bookid:book._id,status:'Unread'})
        .then(response => {
            // Handle successful response (e.g., display success message)
            console.log('Book Added to list successfully:', response.data); // Assuming data contains the created book details

            Swal.fire({
              icon: "success",
              title: "Your Book has been Added",
            }).then((result) => {
              // navigate('/wishlist', { replace: true });
            
              
            });
             
      
      
           
        
        })
        .catch(error => {
          toggleAddModal();
          console.error('Error fetching data:', error);
        });
  
  };
  

  return (
    <div   
    style={{
      backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=996&t=st=1714730478~exp=1714731078~hmac=70bbd85e7e7c96f4c835d4ffbde27a1e0470b6a927bb1fa0d0ca19305c6cd70f")`,
      backgroundSize: 'cover', /* Or background-size: contain; */
      backgroundRepeat: 'no-repeat', /* Optional */
      backgroundPosition: 'center', /* Optional */
      minHeight: '100vh', /* Set minimum viewport height */
   
    }}
    
    
    
    >
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
              onChange={handleSearch}

            />
            <FaSearch className="search-icon" style={{ color: 'white' }} />
          </InputGroup>
        </Nav>
        <Nav navbar style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center'

        }}>
          <NavItem style={{

            marginRight: '20px'
          }}>   <NavLink href="#"> <img

            src={Add}
            style={{
              height: '30px',
              width: '30px',
              marginRight: '20px'
            }}
            alt=" Add Book"
            id="add-icon"
            onClick={toggleAddModal}
            onMouseLeave={tooltoggle2}
            onMouseEnter={tooltoggle2}
          /> <Tooltip placement="bottom" isOpen={tooltipOpen2} target="add-icon">
                Add Book
              </Tooltip></NavLink>   </NavItem>
          <NavItem>
            <a href="/wishlist" >
              <img

                src={wishlisticon}
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '20px'
                }}
                alt="View wishlist"
                id="smiley-icon"
                onMouseLeave={tooltoggle}
                onMouseEnter={tooltoggle}
              />
              <Tooltip placement="bottom" isOpen={tooltipOpen} target="smiley-icon">
                View Readlist
              </Tooltip>
            </a>


          </NavItem>
          <a href="/" >
              <img

                src={logout}
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '20px'
                }}
                alt="log out"

              />

            </a>
          <NavItem>   
          </NavItem>
        </Nav>
      </Navbar>
      <Container style={{
        border: '1px solid rgba(106, 111, 119, 0.15)', display: 'flex',
        flexWrap: 'wrap',
       
      }}>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          {books.map((book, index) => (
            <Col key={index} md={4} xs={12} className="mb-3">
              <Card style={{
                width: '18rem',
                border: '1px solid rgba(106, 111, 119, 0.15)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                justifyContent: 'center'
              }}>
                <div > <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
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
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <h4 style={{ marginTop: '15px' }}>{book.Title}</h4>
                    <p>{book.Author}</p>

                    <Button className="wishlist-button" onClick={()=>{addBookToList(book)}}>
                      <span className="heart">&#x2665;</span> Add to Readlist
                    </Button>
                  </div></div>
              </Card>
            </Col>
          ))}
        </Row>
        <BiblioModal isOpen={toggleModal} toggle={toggleWishlistModal} >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={Cart} style={{ height: '50px', marginBottom: '30px' }} alt='img'/>
            <h5>Book Added to Readlist</h5>
          </div>
          <ModalFooter style={{ border: 'none', justifyContent: 'space-between' }}>  <a href="/wishlist" >
            <Button
              type='button'

              className='w-xs waves-effect waves-light me-1'
              onClick={toggleWishlistModal}>
              <BsHeart style={{ marginRight: '10px' }} />

              View ReadList
            </Button></a>
            <Button
              outline
              className='w-xs waves-effect waves-light me-1'
              onClick={toggleWishlistModal}>
              <BsX style={{ marginRight: '5px' }} />


              Close
            </Button>
          </ModalFooter>
        </BiblioModal>
        {/* Modal for add new book to the reading list */}
        <BiblioModal isOpen={addBookModal} toggle={toggleAddModal} title={'Add Book'}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="title">Title:</Label>
                    <Input
                      name='title'
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter book title"
                      value={formData.title}
                      onChange={handleChange}
                      required // Mark title as required
                    />

                  </FormGroup>

                  <FormGroup>
                    <Label for="isbn">ISBN:</Label>
                    <Input
                      name='isbn'
                      type="number"
                      className="form-control"
                      id="isbn"
                      placeholder="Enter book ISBN"
                      value={formData.isbn}
                      onChange={handleChange}
                      required // Mark ISBN as required
                    />

                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="author">Author:</Label>
                    <Input
                      name='author'
                      type="text"
                      className="form-control"
                      id="author"
                      placeholder="Enter book author"
                      value={formData.author}
                      onChange={handleChange}
                      required // Mark author as required
                    />


                  </FormGroup>
                </Col>
              </Row>
              {error ? <div className="text-danger">Please fill in all required fields.</div> : null}
              <ModalFooter style={{ border: 'none' }}>
                <Button type='button' className='w-xs waves-effect waves-light me-1' onClick={handleSubmit} >
                  Save
                </Button>
                <Button outline className='w-xs waves-effect waves-light me-1' onClick={toggleAddModal}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </div>
        </BiblioModal>

      </Container>
    </div>
  );
};

export default Booklist;
