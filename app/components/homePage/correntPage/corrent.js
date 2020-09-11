import React, { useEffect, useState } from 'react'
import JwtDecode from 'jwt-decode';
import Axios from 'axios'
import moment from 'moment'
import $ from 'jquery'
function corrent() {
    var token = localStorage.usertoken;
    const [daily, setDaily] = useState({ description: '' });
    const [issues, setIssues] = useState({ description: '' })
    var decode = JwtDecode(token)
    let config = {
        headers: {
            Authorization: localStorage.usertoken
        }
    }
    const [message, setMessage] = useState({ err: '', success: '', status: '' })
    const [id, setId] = useState({ Id: '' });
    const [update, setUpdate] = useState({ issueID: '' });

    $('document').ready(() => {
        $('.1').hide(100)
        $(`#${id.Id}`).show(100)
    })
    let body = {
        issueID: update.issueID,
        InquiryStatus: message.status
    }
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/getDaily`, config)
            .then(res => {
                console.log(res.data.message)
                if (res.data.message == 'this is your update') {
                    return setDaily(res.data.data);
                }
            }).catch(err => {
                console.log(err);
            })
    }, [token])
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/issueGet`, config)
            .then(res => {
                console.log(res.data.message)
                if (res.data.message == 'this is your issues') {
                    return setIssues(res.data.data);
                }
            }).catch(err => {
                console.log(err);

            })
    }, [token])
    const updateIn = () => {
        Axios.put(`http://localhost:5000/api/issueUpdate`, body, config)
            .then(res => {
                if (res.data.message == 'this is your issues') {
                    alert(res.data.message)
                    window.location = "http://localhost:3000/myInquiry"
                }
            }).catch(err => {
                console.log(err);

            })
    }
    // const date=(data)=>{
    //     var cur=curToday.format("L")
    //     var create=moment(data)
    //     var createDate=create.format("L")
    //      if((curToday.format('DD')==create.format('DD'))&&(curToday.format('MM')==create.format('MM'))&&(curToday.format('YYYY')==create.format('YYYY'))){
    //         print=moment(data || moment.now()).locale('en').fromNow()
    //     }
    //      else{
    //          print=createDate
    //      }
    // }
    return (
        <div>
            {(daily.description != '' && issues.description != '') ? (
                <div>
                    {(daily != '') ?
                        (<div>
                            <div className="row">
                                <div className="col-lg-10">
                                    <h1 className="title-recent">Recent Daily Updates</h1>
                                </div>
                                <div className="col-lg-2" >
                                    <h1 className="recent-view-all" onClick={() => window.location = "http://localhost:3000/dailyUpdate"}  >
                                        View All &nbsp;
                                       <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    </h1>
                                </div>
                            </div>
                            <div className="row recent-daily">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <p className="dailyUpdate-content">{daily[0].description}</p>
                                    <div className="row" style={{ position: 'relative', top: '80px' }}>
                                        <div className="col-lg-7  col-sm-12 col-md-12"></div>
                                        <div className="col-lg-3  col-sm-12 col-md-12">
                                            <div className="row" style={{ paddingBottom: '1px', textAlign: 'right', paddingTop: '3px' }}>
                                                <div className="col-lg-6 inquiry-content-left" style={{ fontSize: '14px' }}>created BY: </div>
                                                <div className="col-lg-4 inquiry-content-left " style={{ color: '#23BB9F', textAlign: 'left', fontSize: '16px' }}>{daily[0].user_Ref[0].name}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-12 col-md-12"> {
                                            ((moment().format('DD') == moment(daily[0].createdAt).format('DD')) && (moment().format('MM') == moment(daily[0].createdAt).format('MM')) && (moment().format('YYYY') == moment(daily[0].createdAt).format('YYYY'))) ?
                                                (moment(daily[0].createdAt || moment.now()).locale('en').fromNow()
                                                ) : (
                                                    moment(daily[0].createdAt).format("MMM DD YYYY")
                                                )}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (<div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                            <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>
                                <i className="fa fa-bell-slash-o fa-5x" style={{ position: 'relative', top: '50px' }} aria-hidden="true"></i>
                                <h3 style={{ position: 'relative', top: '50px' }}>{decode.name} Don't have daily update </h3>
                            </div>
                        </div>)}
                    {(issues != '') ? (
                        <div>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-lg-10">
                                    <h1 className="title-inquiry">Your Recent Inquiry</h1>
                                </div>
                                <div className="col-lg-2" style={{ top: '5px' }}>
                                    <h1 className="recent-view-all" style={{ cursor: 'pointer' }} onClick={() => { window.location = "http://localhost:3000/myInquiry" }}>
                                        View All &nbsp;
                                       <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    </h1>
                                </div>
                            </div>
                            <div className="row recent-inquiry">
                                <div className="col-lg-12 col-sm-12 col-md-12">
                                    <div className="row ">
                                        <div className="col-lg-9 recent-inquiry-inner ">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-12 col-md-10">
                                                    <div className="row">
                                                        <div className="col-lg-5 inquiry-content-left">Issue Type: </div>
                                                        <div className="col-lg-6  inquiry-content-right">{issues[0].issueType}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-5 inquiry-content-left">Location: </div>
                                                        <div className="col-lg-6  inquiry-content-right">{issues[0].location}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-5 inquiry-content-left">Assigned to: </div>
                                                        <div className="col-lg-6  inquiry-content-right">{
                                                            (issues[0].InquiryStatus == 'NOTASSIGNED')
                                                                ? (issues[0].InquiryStatus) : (issues[0].taskAssignedTo[0].name)
                                                        }</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-5 inquiry-content-left">Reporting At: </div>
                                                        <div className="col-lg-6  inquiry-content-right">
                                                            {
                                                                ((moment().format('DD') == moment(issues[0].createdAt).format('DD')) && (moment().format('MM') == moment(issues[0].createdAt).format('MM')) && (moment().format('YYYY') == moment(issues[0].createdAt).format('YYYY'))) ?
                                                                    (moment(issues[0].createdAt || moment.now()).locale('en').fromNow()
                                                                    ) : (
                                                                        moment(issues[0].createdAt).format("MMM DD YYYY")
                                                                    )}
                                                        </div>
                                                    </div>
                                                    {
                                                        (issues[0].completedAt != undefined) ? (
                                                            <div className="row">
                                                                <div className="col-lg-5 inquiry-content-left">Completed At: </div>
                                                                <div className="col-lg-6  inquiry-content-right">
                                                                    {
                                                                        ((moment().format('DD') == moment(issues[0].createdAt).format('DD')) && (moment().format('MM') == moment(issues[0].createdAt).format('MM')) && (moment().format('YYYY') == moment(issues[0].createdAt).format('YYYY'))) ?
                                                                            (moment(issues[0].createdAt || moment.now()).locale('en').fromNow()
                                                                            ) : (
                                                                                moment(issues[0].createdAt).format("MMM DD YYYY")
                                                                            )}
                                                                </div>
                                                            </div>) : (<div></div>)}
                                                </div>
                                                <div className="col-lg-6 col-sm-12 col-md-10">
                                                    <div className="row">
                                                        <div className="col-lg-4 inquiry-content-left">Description: </div>
                                                        <div className="col-lg-6  inquiry-content-right" style={{ height: '70px' }}>{issues[0].description}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-4 inquiry-content-left">issueCreateBy: </div>
                                                        <div className="col-lg-6  inquiry-content-right" style={{ height: '50px' }}>
                                                            <div className="row" style={{ paddingBottom: '1px', paddingTop: '1px' }}>
                                                                <div className="col-lg-4 inquiry-content-left" style={{ fontSize: '12px' }}>name: </div>
                                                                <div className="col-lg-8 " style={{ fontSize: '10px' }}>{issues[0].user_Ref[0].name}</div>
                                                            </div>
                                                            <div className="row" style={{ paddingBottom: '1px', paddingTop: '1px' }}>
                                                                <div className="col-lg-4 inquiry-content-left" style={{ fontSize: '12px' }}>email: </div>
                                                                <div className="col-lg-8 " style={{ fontSize: '10px' }}>{issues[0].user_Ref[0].email}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 recent-inquiry-status " style={{ width: '150px', height: '150px' }}>
                                            <button className={`recent-inquiry-button ${issues[0].InquiryStatus}`}
                                                onClick={
                                                    () => {
                                                        if (decode.usertype == 'User') {
                                                            if (issues[0].InquiryStatus == "COMPLETED") {
                                                                setId({ ...id, Id: issues[0]._id })
                                                                setUpdate({ ...update, issueID: issues[0]._id })
                                                                setMessage({ ...message, status: 'CLOSED', success: 'Are your sure to close your inquiry' })
                                                            }
                                                            else {
                                                                if (issues[0].InquiryStatus == 'CLOSED') {
                                                                    setId({ ...id, Id: issues[0]._id })
                                                                    setMessage({ ...message, err: 'This inquiry was already closed' })
                                                                }
                                                                else {
                                                                    setId({ ...id, Id: issues[0]._id })
                                                                    setMessage({ ...message, err: 'sorry is not write time to close your inquiry' })
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (decode.usertype == "Admin") {
                                                                if (issues[0].InquiryStatus == "NOTASSIGNED") {
                                                                    setId({ ...id, Id: issues[0]._id })
                                                                    setUpdate({ ...update, issueID: issues[0]._id })
                                                                    setMessage({ ...message, status: 'ASSIGNED', success: 'Are your sure to  Assign this inquiry for you' })
                                                                }
                                                                else if (decode.id === issues[0].taskAssignedTo[0]._id) {
                                                                    if (issues[0].InquiryStatus == "ASSIGNED") {
                                                                        setId({ ...id, Id: issues[0]._id })
                                                                        setUpdate({ ...update, issueID: issues[0]._id })
                                                                        setMessage({ ...message, status: 'COMPLETED', success: 'Are your Completed this inquiry inquiry' })
                                                                    } else if (issues[0].InquiryStatus == "CLOSED") {
                                                                        setId({ ...id, Id: issues[0]._id })
                                                                        setMessage({ ...message, err: 'This inquiry was already closed' })
                                                                    }
                                                                    else {
                                                                        setId({ ...id, Id: issues[0]._id })
                                                                        setMessage({ ...message, err: 'sorry you cannot  close this inquiry' })
                                                                    }
                                                                }
                                                                else {
                                                                    setId({ ...id, Id: issues[0]._id })
                                                                    setMessage({ ...message, err: 'sorry this inquiry not yours' })
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                name="InquiryStatus" type="button"> {issues[0].InquiryStatus}</button>

                                            {(message.success == '') ? (
                                                <h1 className="1 err" id={issues[0]._id}>{message.err}</h1>
                                            ) : (
                                                    <div className="1 success" style={{ display: 'none' }} id={issues[0]._id}>
                                                        <h1 className="success" >{message.success}</h1>
                                                        <button type="button" name="ok"
                                                            onClick={updateIn}
                                                            className="confirmUpdate">CONFIRM</button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                                <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>
                                    <i className="fa fa-exclamation-triangle fa-5x" style={{ position: 'relative', top: '50px' }} aria-hidden="true"></i>
                                    <h3 style={{ position: 'relative', top: '50px' }}>{decode.name} Don't have daily updates</h3>
                                </div>
                            </div>
                        )}
                    {(decode.usertype == 'User') ? (
                        <div className="row" style={{ with: '90%', height: '150px', position: 'relative', top: '35px' }}>
                            <div className="col-lg-8"></div>
                            <div className="col-lg-4">
                                <button type="button" onClick={() => window.location = "http://localhost:3000/createInquiry"} className="add-inquiry-button"> Add Inquiry</button>
                            </div>
                        </div>) : (<div className="row" style={{ with: '90%', height: '150px', position: 'relative', top: '35px' }}>
                            <div className="col-lg-8"></div>
                            <div className="col-lg-4">
                                <button type="button" onClick={() => window.location = "http://localhost:3000/createdaily"} className="add-inquiry-button"> Add dailyUpdate</button>
                            </div>
                        </div>)}


                </div>
            ) : (
                    <div>
                        <div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                            <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>
                                <i className="fa fa-exclamation fa-5x" style={{ position: 'relative', top: '50px' }} aria-hidden="true"></i>
                                <h3 style={{ position: 'relative', top: '50px' }}>{decode.name} Don't have  updates and issuse</h3>
                            </div>
                        </div>
                        <div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                            <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>

                            </div>
                        </div>
                        {(decode.usertype == 'User') ? (
                            <div className="row" style={{ with: '90%', height: '150px', position: 'relative', top: '35px' }}>
                                <div className="col-lg-8"></div>
                                <div className="col-lg-4">
                                    <button type="button" onClick={() => window.location = "http://localhost:3000/createInquiry"} className="add-inquiry-button"> Add Inquiry</button>
                                </div>
                            </div>) : (<div className="row" style={{ with: '90%', height: '150px', position: 'relative', top: '35px' }}>
                                <div className="col-lg-8"></div>
                                <div className="col-lg-4">
                                    <button type="button" onClick={() => window.location = "http://localhost:3000/createdaily"} className="add-inquiry-button"> Add dailyUpdate</button>
                                </div>
                            </div>)}
                    </div>
                )
            }

        </div >
    )
}

export default corrent
