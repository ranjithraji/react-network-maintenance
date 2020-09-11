import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import jwt from 'jwt-decode';
import Axios from 'axios';

function profile() {
    $('document').ready(() => {
        $('#edit-button').click(() => {
            $('.edit-content-edit').removeAttr("disabled");
            $('.edit-content-edit').css({ background: '#FFFFFF', border: ' 5px solid #FFFFFF' })
            $('#edit-button').hide(1000);
            $('#confir-sub').show(1000);
        })
        $('#confir-can').click(() => {
            $('.edit-content-edit').attr("disabled", true);
            $('.edit-content-edit').css({ background: '#c2bebe', border: ' 5px solid #c2bebe' })
            $('#edit-button').show(1000);
            $('#confir-sub').hide(1000);
        })
    })
    var token = localStorage.usertoken
    var decode = jwt(token);
    const [user, setuser] = useState(decode)
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    console.log(user);
    let body = { name: '', position: '' };
    let config;
    const updatePro = () => {
        if (decode.usertype == "Admin") {

            body = {
                name: user.name,
                position: user.position
            }
            config = {
                headers: {
                    Authorization: localStorage.usertoken
                }
            }

        }
        else {

            body = {
                name: user.name,
                department: user.department
            }
            config = {
                headers: {
                    Authorization: localStorage.usertoken
                }
            }
        }
        console.log(body);

        if (body.name != '') {
            Axios.put('http://localhost:5000/api/updateProfile', body, config).then(res => {
                console.log(res.data.message)
                if (res.data.message == 'updated successfully') {
                    alert(res.data.message)
                    window.location = `http://localhost:3000/true/Login`;
                }
                else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err);

            })
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-10">
                    <h1 className="title-recent">My Profile</h1>
                </div>
            </div>
            <div className="row" style={{ height: "600px" }}>
                <div className="col-2"></div>
                <div className="col-8 create-center" style={{ height: "460px" }}>
                    <div className="row" id="edit-button" style={{ display: '' }}>
                        <div className="col-lg-7"></div>
                        <div className="col-lg-4">
                            <button type="button" className="edit-button">Edit</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 edit-content-left">Name </div>
                        <input type="text" name='name' value={user.name} className="col-lg-4  edit-content-right edit-content-edit" onChange={onChange} disabled style={{ background: '#c2bebe', border: ' 5px solid #c2bebe' }} />
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 edit-content-left">Email </div>
                        <input type="email" name="email" value={user.email} className="col-lg-4  edit-content-right" onChange={onChange} disabled style={{ background: '#c2bebe', border: ' 5px solid #c2bebe' }} />
                    </div>
                    <br />
                    {decode.usertype == "User" ?
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 edit-content-left">Department </div>
                            <select value={user.department} name="department" className="col-lg-4  edit-content-right edit-content-edit" onChange={onChange} disabled style={{ background: '#c2bebe', border: ' 5px solid #c2bebe' }} >
                                <option value="">Choose anything</option>
                                <option value="RVSCAS">RVSCAS</option>
                                <option value="MCA">MCA</option>
                                <option value="MSC IT">MSC-IT</option>
                                <option value="MSC CS">MSC-CS</option>
                                <option value="BCA">BCA</option>
                                <option value="BSC CS">BSC-CS</option>
                                <option value="BSC IT">BSC-IT</option>
                            </select>
                        </div>
                        :
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 edit-content-left">Position </div>
                            <select name="position" value={user.position} className="col-lg-4  edit-content-right edit-content-edit" onChange={onChange} disabled style={{ background: '#c2bebe', border: ' 5px solid #c2bebe' }}>
                                <option value="">Choose anything</option>
                                <option value="Network engineer">Network engineer</option>
                                <option value="Network maintentance">Network maintenance</option>
                                <option value="System Maintentance">System Maintenance</option>
                            </select>
                        </div>
                    }
                    <br />
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 edit-content-left">Phone Number</div>
                        <input type="text" className="col-lg-4  edit-content-right" value={user.phoneNumber} onChange={onChange} disabled style={{ background: '#c2bebe', border: ' 5px solid #c2bebe' }} />
                    </div>
                    <br />
                    <div className="row " id="confir-sub" style={{ display: 'none' }}>
                        <div className="col-lg-6 col-sm-0 col-md-4"></div>
                        <div className="col-lg-2 col-sm-6 col-md-4">
                            <button type="button" id='confir-can' className="edit-submit">Cancel</button>
                        </div>
                        <div className="col-lg-2  col-sm-6 col-md-4">
                            <button type="button" className="edit-submit" onClick={updatePro}>Save</button>
                        </div>
                        <div className="col-lg-1 col-sm-0 col-md-0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile
