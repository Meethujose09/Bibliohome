import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { baseURL } from '../../baseURL'
import './Wishlist.css'; // (Optional) For custom CSS
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, Navbar, NavbarBrand, Nav, NavItem, NavLink, Input, InputGroup, Tooltip, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Logo from '../../asset/images/logo.png';
import bookicon from '../../asset/images/bookicon.png';
import logout from '../../asset/images/turn-off.png';

const Wishlist = () => {
  const [items, setItems] = useState([]); // Use empty array initially
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const tooltoggle = () => setTooltipOpen(!tooltipOpen);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    if (event) {
      setSearchText(event.target.value);
      setItems(
        items.filter((item) =>
          item && ( // Check if item is defined
            item.Title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.Author.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }

  };

  useEffect(() => {
    handleSearch();
  }, [items])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get(`${baseURL}wishlist`); // Replace with your API endpoint
        setItems(response.data);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchData();
  }, []);


  // function for editing the status of the book
  const editData = (data) => {
    // code to edit data
    console.log(data)
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "Finished": "Finished",
          "Unread": "Unread",
          "In Progress": "In Progress"
        });
      }, 10);
    });
    Swal.fire({
      title: "Select status",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to select status!";
        }
        axios.put(`${baseURL}wishlist/${data._id}`, { status: value }).then((response) => {
          console.log('edit', response.data)
          const updatedItems = items.map((item) =>
            item._id === data._id ? { ...item, status: value } : item
          );
          setItems(updatedItems);

          Swal.fire(
            'Modified!',
            'Status has been changed.',
            'success'
          )
        })
          .catch((error) => {
          });
      }
    });
  }

  //  function for deleting the data from the table
  const deleteData = (id) => {
    // code to delete
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseURL}wishlist/${id}`).then((response) => {
          setItems(items.filter(item => item._id !== id));
          Swal.fire(
            'Deleted!',
            'Item has been deleted.',
            'success'
          )
        })
          .catch((error) => {
          });
      }
    })
  }


  return (
    <div style={{
      backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=996&t=st=1714730478~exp=1714731078~hmac=70bbd85e7e7c96f4c835d4ffbde27a1e0470b6a927bb1fa0d0ca19305c6cd70f")`,
      backgroundSize: 'cover', /* Or background-size: contain; */
      backgroundRepeat: 'no-repeat', /* Optional */
      backgroundPosition: 'center', /* Optional */
      minHeight: '100vh', /* Set minimum viewport height */

    }}>
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
          <span className="ml-2 text-white">My Readinglist</span>
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          <InputGroup className="search-bar" style={{ border: 'none', display: 'flex', alignItems: 'center' }}>

            <Input
              placeholder="Search..."
              onChange={handleSearch}
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
        <Nav navbar style={{ display: 'flex', alignItems: 'center' }}>
          <NavItem>
            <a href="/booklist" >
              <img

                src={bookicon}
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '20px'
                }}
                alt="View Readlist"
                id="smiley-icon"
                onMouseLeave={tooltoggle}
                onMouseEnter={tooltoggle}
              />
              <Tooltip placement="bottom" isOpen={tooltipOpen} target="smiley-icon">
                View Booklist
              </Tooltip>
            </a>


          </NavItem>
          <NavItem>
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

          </NavItem>
        </Nav>
      </Navbar>
      <div>

        {isLoading ?
          <p>Loading wishlist...</p>
          :
          <div>
            <div className="table-container">
              <Table striped bordered hover style={{ marginTop: '10%' }} responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        className:
                          item.status === 'Unread' ? "table-secondary" : item.status === "table-secondary" ? 'table-secondary' : 'table-secondary',
                      }}
                    >
                      <th scope="row">{index + 1}</th>
                      <td>{item && item.bookid.Title}</td>
                      <td>{item && item.bookid.Author}</td>
                      <td>{item && item.status}</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: '20px' }} onClick={() => { editData(item) }} />
                        <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '30px' }} onClick={() => { deleteData(item._id) }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination-container">
                <Pagination>
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={() => paginate(currentPage - 1)}>
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  {[...Array(Math.ceil(items.length / itemsPerPage))].keys().map((pageNumber) => (
                    <PaginationItem active={currentPage === pageNumber + 1} key={pageNumber}>
                      <PaginationLink onClick={() => paginate(pageNumber + 1)}>
                        {pageNumber + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>
                    <PaginationLink next onClick={() => paginate(currentPage + 1)}>
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            </div>

          </div>
        }
      </div></div>
  );
};

export default Wishlist;
