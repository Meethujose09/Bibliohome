import React from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import './Modal.css'
export default function BiblioModal(props) {
    return (
        <div style={{ padding: '100px' }}>

            <Modal
                size='md'
                centered
                isOpen={props.isOpen}
                toggle={props.toggle}
                style={{ padding: '10px' }} >
                <ModalHeader style={{ border: 'none' }} toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>{props.children}</ModalBody>
            </Modal>
        </div>
    );
}

