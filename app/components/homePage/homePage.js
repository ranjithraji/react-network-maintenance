import React, { useState } from 'react'
import Axios from 'axios';
import $ from 'jquery';
function homePage() {
    const [user, setUser] = useState({ usertype: '', adminCode: '' });
    const ok = () => {
        console.log(user);
        //user validations
        if (user) {
            if (user.usertype == '') {
                alert('please select your user type');
            }
            else {
                if (user.usertype == 'User') {
                    window.location = "http://localhost:3000/Login";
                }
                else {
                    //admin validations
                    if (user.usertype == 'Admin') {
                        //hide and show for admin code
                        $('.checkButton').hide(1000);
                        $('.adminCode').show(1000);
                        if (user.adminCode) {
                            Axios.post('http://localhost:5000/api/admin/verify', { ...user })
                                .then(res => {
                                    console.log(res.data.message)
                                    if (res.data.message == 'your admin code was correct so your are allow to login') {
                                        alert(res.data.message)
                                        window.location = `http://localhost:3000/${res.data.status}/Login`;
                                    }
                                    else {
                                        alert(res.data.message)
                                    }
                                })
                        }
                    }
                    else {
                        alert("please enter your admin code")
                    }
                }
            }
        }
    }

    return (
        <div className='bg'>
            <div className="container row title">
                <div className="col-lg-5 col-md-8 col-sm-12"></div>
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <h1 style={{ fontSize: '55px' }}>NETWORK <br /> &amp; <br /> MAINTENANCE</h1>
                </div>
                <div className="col-lg-1 col-md-8 col-sm-12"></div>
            </div>
            <div className="row container User-Container">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6 user-login">
                            <p>Please Select <br /><br /><span style={{ fontSize: '50px', color: "#23BB9F" }}>LOGIN TYPE</span></p>
                        </div>
                        <div className="col-lg-6 checkButton" style={{ display: 'block' }}>
                            <div className="row user-login-button" style={{ float: 'right' }}>
                                <button type="button" id='User' name="user" className="User user-button col-lg-6 col-md-12 col-sm-12" onClick={() => { setUser({ ...user, usertype: 'User' }) }} style={{ position: 'relative', right: "90px" }}>USER</button>
                                <button type="button" id='Admin' name="admin" className="Admin user-button col-lg-6 col-md-12 col-sm-12" onClick={() => { setUser({ ...user, usertype: 'Admin' }) }}>ADMIN</button>
                            </div>
                        </div>
                    </div>
                    <div className="row adminCode" style={{ display: 'none' }}>
                        <div className="col-lg-12" ><span>AdminCode: &nbsp;</span><input type="text" name="adminCode" className="admininput" value={user.adminCode} onChange={(e) => setUser({ ...user, adminCode: e.target.value })} placeholder="    Enter admin code"></input></div>
                    </div>
                    <div className="row con-confirmButton">
                        <div className="col-lg-9 col-sm-12 col-md-12"></div>
                        <div className="col-lg-3 col-sm-12 col-md-12">{(user.usertype!='')?(<button type="button" name="ok" onClick={ok} className="confirmButtom">CONFIRM</button>):(<p style={{ fontSize: '16px', color: "#23BB9F" }}>Which type of user you are?</p>)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homePage
