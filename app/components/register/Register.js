import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Register() {
    const [user, setuser] = useState({ usertype: 'User', name: '', email: '', phoneNumber: '', password: '', department: 'RVSCAS' })
    const gotologin = () => {
        window.location = `http://localhost:3000/Login`
    }
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }

    const gotoReg = () => {
        Axios.post('http://localhost:5000/api/register', { ...user })
            .then(res => {
                console.log(res.data.message)
                if (res.data.message == 'successfully create user') {
                    alert(res.data.message)
                    window.location = `http://localhost:3000/Login`;
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    console.log(user);

    return (
        <div className='bg'>
            <div className="container row titleContent">
                <div className="col-lg-5 col-md-8 col-sm-12"></div>
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <h1 style={{ fontSize: '35px' }}>REGISTER</h1>
                </div>
                <div className="col-lg-1 col-md-8 col-sm-12"></div>
            </div>
            <div className="row container Register-Container">
                <div className="col-lg-12">
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
                            DEPARTMENT
                        </div>
                        <div className="col-lg-6 col-sm-12 col-sd-12">
                            <select value={user.department} name="department" className="logininput" onChange={onChange} >
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
    )
}

export default Register
