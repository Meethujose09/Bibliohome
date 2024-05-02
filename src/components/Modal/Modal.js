import React, { useState } from "react";
import {

    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import './Modal.css'
import { BsX } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function BiblioModal(props) {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '100px' }}>

            <Modal
                size='sm'
                centered
                isOpen={props.isOpen}
                toggle={props.toggle}
                style={{ padding:'10px'}} >
                <ModalHeader style={{ border: 'none' }} toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>{props.children}</ModalBody>
                <ModalFooter style={{ border: 'none', justifyContent: 'space-between' }}>  <a href="/wishlist" > 
                    <Button
                        type='button'
                       
                        className='w-xs waves-effect waves-light me-1'
                        onClick={props.toggle}>
                            <BsHeart style={{marginRight:'10px'}}/>
                       
                       View WishList
                    </Button></a>
                    <Button
                        outline
                        className='w-xs waves-effect waves-light me-1'
                        onClick={props.toggle}>
                    <BsX  style={{marginRight:'5px'}}/>


                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
