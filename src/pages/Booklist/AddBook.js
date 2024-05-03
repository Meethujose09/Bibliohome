
import React, { useState } from 'react'

import { ModalFooter, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import BModal from '../../components/Modal/Modal';
function AddBook({ props }) {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (add book to list, API call, etc.)
        setFormData({ title: '', author: '' }); // Clear form data after submission
        props && props.toggle(); // Close the modal
    };

    return (
        <BModal isOpen={props && props.isOpen} toggle={props && props.toggle}>


            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter book title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label for="author">Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="Enter book author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                </div>
            </form>

            <ModalFooter>
                <Button color="primary" className="custom-button me-2" onClick={handleSubmit}>
                    <FaPlus style={{ marginRight: '5px' }} />
                    Add Book
                </Button>
                <Button color="secondary" className="custom-button" onClick={props && props.toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </BModal>
    );
};



export default AddBook