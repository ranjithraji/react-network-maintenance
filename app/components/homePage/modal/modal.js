import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import JwtDecode from 'jwt-decode';

const ModalExample = (props) => {
    const {
        buttonLabel,
        className
    } = props;
    var token = localStorage.usertoken;
    var decode = JwtDecode(token)
    var name = new String(decode.name[0])
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const logout=()=>{
        localStorage.removeItem('usertoken');
        window.location='http://localhost:3000/true/Login'
    }
    return (
        <span className="innerUserName">
            <i className="fa fa-sort-desc" onClick={toggle} aria-hidden="true"></i>
            <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
                <ModalBody>
                    <div className="user-logo">{name.toUpperCase()}</div>
                    <div className="user-name">{decode.name}</div>
                    <div className="user-email">{decode.email}</div>
                    <div className="user-logout row" onClick={logout}>
                        <div className="col-lg-3 col-sm-12">
                            <i className="fa fa-sign-out fa-2x"></i>
                        </div>
                        <div style={{ top: '8px' }} className="col-lg-6 col-sm-12">
                            Logout
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </span>
    );
}

export default ModalExample;