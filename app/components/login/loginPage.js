import React, { useState } from 'react';
import Axios from 'axios';
import jwt from 'jwt-decode';

const LoginPage = () => {
    const [user, setUser] = useState({ phoneNumber: '', email: '', password: '' })
    let path = window.location.pathname
    const register = () => {
        if (path == '/true/Login') {
            window.location = "http://localhost:3000/registerAdmin";
        }
        else {
            window.location = "http://localhost:3000/register";
        }
    }
    const gotoLogin = () => {
        if (user.password != '') {
            Axios.post('http://localhost:5000/api/login', { ...user })
                .then(res => {
                    console.log(res.data.message)
                    if (res.data.message == 'your are welcome') {
                        alert('your are welcome ' + res.data.data.name);
                        localStorage.setItem('usertoken', res.data.token);
                        var decode = jwt(localStorage.usertoken);
                        console.log(decode);
                        if (path == '/true/Login') {
                            window.location = 'http://localhost:3000/userHome';
                        }
                        else {
                            window.location = 'http://localhost:3000/profile';
                        }
                    }
                    else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }
        else {
            alert('please enter your email or phone and password')
        }
    }
    return (
        <div className='bg'>
            <div className="container row titleContent">
                <div className="col-lg-5 col-md-8 col-sm-12"></div>
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <h1 style={{ fontSize: '35px' }}>LOGIN</h1>
                </div>
                <div className="col-lg-1 col-md-8 col-sm-12"></div>
            </div>
            <div className="row container Login-Container">
                <div className="col-lg-12">
                    <div className="row Container-block">
                        <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                            PHONE/E-MAIL
                        </div>
                        <div className="col-lg-6 col-sm-12 col-sd-12">
                            <input type="text" onChange={(e) => { setUser({ ...user, phoneNumber: e.target.value, email: e.target.value }) }} className="logininput"></input>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row Container-block">
                        <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                            PASSWORD
                        </div>
                        <div className="col-lg-6 col-sm-12 col-sd-12">
                            <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className="logininput"></input>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row Container-block">
                        <div className="Container-block-left col-lg-6 col-sm-12 col-sd-12">
                        </div>
                        <div className="col-lg-6 col-sm-12 col-sd-12">
                            <div className="row">
                                <div className="col-lg-5 col-sm-12 col-sd-12"><button type="button" onClick={register} name="register" className="InputButtom">REGISTER</button></div>
                                <div className="col-lg-5 col-sm-12 col-sd-12"><button type="button" name="login" onClick={gotoLogin} className="InputButtom">LOGIN</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage