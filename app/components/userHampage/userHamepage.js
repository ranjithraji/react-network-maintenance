import React from 'react'
import image from '../../images/image9.png'
import image1 from '../../images/image 6.png'
import CurrentPage from '../homePage/correntPage/corrent'
import CreateInquiry from '../homePage/createInquiry/createInquiry'
import Profile from '../login/profile/profile'
import jwt from 'jwt-decode'
import Modal from '../homePage/modal/modal'
import MyIn from '../homePage/getAllinquiry/MyInquiry'
import Daily from '../homePage/dailyUpdate/dailyUpdate'
import DailyCreate from '../homePage/dailyUpdate/dailyCreate'
import $ from 'jquery'

var path = window.location.pathname;
function userHamepage() {
    var token = localStorage.usertoken
    var decode = jwt(token)
    $('document').ready(() => {
        if (path == '/userHome') {
            $(`.userHome`).css({ 'color': '#23BB9F' });
        }
        if (path == '/profile') {
            $(`.profile`).css({ 'color': '#23BB9F' });
        }
        if (path == '/myInquiry' || path == '/createInquiry') {
            $(`.myInquiry`).css({ 'color': '#23BB9F' });
        }
        if (path == '/dailyUpdate' || path == '/createdaily') {
            $(`.dailyUpdate`).css({ 'color': '#23BB9F' });
        }
    })
    return (
        <div>
            <div className="row userConatiner">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8 col-sm-10">
                            <i className="fa fa-globe fa-3x netIcon" aria-hidden="true"></i>
                            <p className="netIconTitle">Network and Maintenance</p>
                        </div>
                        <div className="col-lg-2  col-sm-10" >
                            <div className="row">
                                <div className="col-lg-12" style={{position:'relative',left:"100px"}}>
                                    <i className="fa fa-bell fa-2x netBellIcon" aria-hidden="true"></i>
                                    <i className="fa fa-user-circle-o fa-2x netUserIcon" aria-hidden="true"></i>
                                    <p className="netUserName">Welcome , <span>{decode.name}</span><Modal /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row userCont">
                <div className="col-lg-2 col-md-3 col-sm-4 userLeftCon">
                    <div className="row" onClick={() => window.location = 'http://localhost:3000/userHome'}>
                        <div className="col-lg-3">
                            <i className="fa fa-home fa-2x left-icon" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-8 left-icon-name userHome">
                            <p>HOME</p>
                        </div>
                    </div>
                    <div className="row profile" onClick={() => window.location = 'http://localhost:3000/profile'}>
                        <div className="col-lg-3">
                            <img className="left-icon " src={`${image}`} aria-hidden="true" />
                        </div>
                        <div className="col-lg-8 left-icon-name profile">
                            <p>PROFILE</p>
                        </div>
                    </div>
                    <div className="row  myInquiry" onClick={() => window.location = 'http://localhost:3000/myInquiry'}>
                        <div className="col-lg-3">
                            <img className=" left-icon" src={`${image1}`} aria-hidden="true" />
                        </div>
                        <div className="col-lg-8 left-icon-name myInquiry">
                            <p>MY INQUIRES</p>
                        </div>
                    </div>
                    <div className="dailyUpdate row" onClick={() => window.location = 'http://localhost:3000/dailyUpdate'}>
                        <div className="col-lg-3">
                            <i className="fa fa-link fa-2x left-icon" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-9 left-icon-name dailyUpdate">
                            <p>DAILY UPDATE</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 col-md-8 col-sm-7 userLeftCon" style={{ left: '23px'}}>
                    {(path == '/userHome') ? (<CurrentPage />) : ((path == '/profile') ? (<Profile />) : ((path == "/myInquiry") ? (<MyIn />) : ((path == '/dailyUpdate') ? (<Daily />) : ((path == '/createdaily') ? (<DailyCreate />) : (<CreateInquiry />)))))}
                </div>
            </div>
        </div>
    )
}

export default userHamepage
