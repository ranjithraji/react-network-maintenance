import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import $ from 'jquery';

function RegisterAdmin() {
    const [user, setuser] = useState({ usertype: 'Admin', adminCode: '', name: '', email: '', phoneNumber: '', password: '', position: '' })
    const gotologin = () => {
        window.location = `http://localhost:3000/${true}/Login`
    }
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }
    console.log(user);
    const gotoReg = () => {
        Axios.post('http://localhost:5000/api/register', { ...user })
            .then(res => {
                console.log(res.data.message)
                if (res.data.message == 'successfully create admin') {
                    alert(res.data.message)
                    window.location = `http://localhost:3000/${true}/Login`;
                }
                else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err);

            })
    }
    const ok = () => {
        //admin validations
        if (user.usertype == 'Admin') {
            //hide and show for admin code
            if (user.adminCode) {
                Axios.post('http://localhost:5000/api/admin/verify', {
                    usertype: user.usertype,
                    adminCode: user.adminCode
                })
                    .then(res => {
                        console.log(res.data.message)
                        if (res.data.message == 'your admin code was correct so your are allow to login') {
                            alert('welcome our page')
                            $('.adminCode').hide(1000);
                            $('.adminrerf').show(1000);
                            $('.con-confirmButton').hide(1000);
                        }
                        else {
                            alert(res.data.message)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
            else {
                alert("please enter your admin code")
            }
        }
    }
    return (
        <div className='bg'>
            <div className="container row titleContent">
                <div className="col-lg-5 col-md-8 col-sm-12"></div>
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <h1 style={{ fontSize: '35px' }}>REGISTER</h1>
                </div>
                <div className="col-lg-1 col-md-8 col-sm-12"></div>
            </div>
            <div className="row container Register-Container" >
                <div className="col-lg-12" >
                    <div className="row adminCode" style={{ display: 'block', top: '100px', left: '25%' }}>
                        <div className="col-lg-12" ><span>AdminCode: &nbsp;</span><input type="text" name="adminCode" className="admininput" value={user.adminCode} onChange={(e) => setuser({ ...user, adminCode: e.target.value })} placeholder="    Enter admin code"></input></div>
                    </div>
                    <div className="row con-confirmButton" style={{ display: 'block', top: '150px', left: '300px' }}>
                        <div className="col-lg-6 col-sm-12 col-md-12"></div>
                        <div className="col-lg-6 col-sm-12 col-md-12"><button type="button" name="ok" onClick={ok} className="confirmButtom">CONFIRM</button></div>
                    </div>
                    <div className="adminrerf" style={{ display: 'none' }}>
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                                NAME
                        </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <input type="text" name='name' className="logininput" onChange={onChange} value={user.name} placeholder="Enter your Name"></input>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                                EMAIL
                        </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <input type="email" name='email' className="logininput" onChange={onChange} value={user.email} placeholder="Enter your Email"></input>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                                POSITION
                         </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <select name="position" value={user.position} className="logininput" onChange={onChange}  >
                                    <option value="">Choose anything</option>
                                    <option value="Network engineer">Network engineer</option>
                                    <option value="Network maintentance">Network maintenance</option>
                                    <option value="System Maintentance">System Maintenance</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                                PHONE NO
                        </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <input type="text" name='phoneNumber' className="logininput" onChange={onChange} value={user.phoneNumber} placeholder="Enter your number"></input>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                                PASSWORD
                        </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <input type="password" name='password' className="logininput" onChange={onChange} value={user.password} placeholder="Enter your phone"></input>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row Container-block">
                            <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                            </div>
                            <div className="col-lg-6 col-sm-12 col-sd-12">
                                <div className="row">
                                    <div className="col-lg-5 col-sm-12 col-sd-12"><button type="button" name="login" onClick={gotologin} className="InputButtom">LOGIN</button></div>
                                    <div className="col-lg-5 col-sm-12 col-sd-12"><button type="button" name="register" onClick={gotoReg} className="InputButtom">REGISTER</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterAdmin
