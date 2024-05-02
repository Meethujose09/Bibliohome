import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Table, NavbarBrand, Navbar,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { baseURL } from '../../baseURL'
import './Wishlist.css'; // (Optional) For custom CSS
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsJustify } from 'react-icons/bs';
import Swal from 'sweetalert2'
const Wishlist = () => {
  const [items, setItems] = useState([]); // Use empty array initially
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setItems(
      items.filter((item) =>
        item.Title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Author.toLowerCase().includes(searchText.toLowerCase())
        // item.category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

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
    <div>
      
        <Navbar
          className="my-2"
          color="dark"
          dark
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
      
      <div>
        <h2>My Wishlist</h2>
        {isLoading ?
          <p>Loading wishlist...</p>
          :
          <div>
            {/* <Input
        type="text"
        placeholder="Search wishlist..."
        value={searchText}
        onChange={handleSearch}
        className="mb-3"
      /> */}
            <div className="table-container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item && item.bookid.Title}</td>
                      <td>{item && item.bookid.Author}</td>
                      <td>{item && item.status}</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: '20px' }} />
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
