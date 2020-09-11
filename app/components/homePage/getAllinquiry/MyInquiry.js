import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import JwtDecode from 'jwt-decode';
import moment from 'moment'
import $ from 'jquery';

const MyInquiry = () => {
    var token = localStorage.usertoken;
    const [data, setData] = useState([])
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
        Axios.get(`http://localhost:5000/api/issueGet`, config)
            .then(res => {
                if (res.data.message == 'this is your issues') {
                    console.log(res.data.data);
                    return setData(res.data.data);
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
    console.log(data);

    function ok(data) {
        console.log(data);

        return data.map(data => {
            return (
                <div key={data._id}>
                    <div className="row recent-inquiry">
                        <div className="col-lg-12 col-sm-12 col-md-12">
                            <div className="row ">
                                <div className="col-lg-9 recent-inquiry-inner ">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12 col-md-10">
                                            <div className="row">
                                                <div className="col-lg-5 inquiry-content-left">Issue Type: </div>
                                                <div className="col-lg-6  inquiry-content-right">{data.issueType}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 inquiry-content-left">Location: </div>
                                                <div className="col-lg-6  inquiry-content-right">{data.location}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 inquiry-content-left">Assigned to: </div>
                                                <div className="col-lg-6  inquiry-content-right">{
                                                    (data.InquiryStatus == 'NOTASSIGNED')
                                                        ? (data.InquiryStatus) : (data.taskAssignedTo[0].name)
                                                }</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 inquiry-content-left">Reporting At: </div>
                                                <div className="col-lg-6  inquiry-content-right">
                                                    {
                                                        ((moment().format('DD') == moment(data.createdAt).format('DD')) && (moment().format('MM') == moment(data.createdAt).format('MM')) && (moment().format('YYYY') == moment(data.createdAt).format('YYYY'))) ?
                                                            (moment(data.createdAt || moment.now()).locale('en').fromNow()
                                                            ) : (
                                                                moment(data.createdAt).format("MMM DD YYYY")
                                                            )}
                                                </div>
                                            </div>
                                            {
                                                (data.completedAt != undefined) ? (
                                                    <div className="row">
                                                        <div className="col-lg-5 inquiry-content-left">Completed At: </div>
                                                        <div className="col-lg-6  inquiry-content-right">
                                                            {
                                                                ((moment().format('DD') == moment(data.completedAt).format('DD')) && (moment().format('MM') == moment(data.completedAt).format('MM')) && (moment().format('YYYY') == moment(data.completedAt).format('YYYY'))) ?
                                                                    (moment(data.completedAt || moment.now()).locale('en').fromNow()
                                                                    ) : (
                                                                        moment(data.completedAt).format("MMM DD YYYY")
                                                                    )}
                                                        </div>
                                                    </div>) : (<div></div>)}
                                        </div>
                                        <div className="col-lg-6 col-sm-12 col-md-10">
                                            <div className="row">
                                                <div className="col-lg-4 inquiry-content-left">Description: </div>
                                                <div className="col-lg-6  inquiry-content-right" style={{ height: '70px' }}>{data.description}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 inquiry-content-left">issueCreateBy: </div>
                                                <div className="col-lg-6  inquiry-content-right" style={{ height: '50px' }}>
                                                    <div className="row" style={{ paddingBottom: '1px', paddingTop: '1px' }}>
                                                        <div className="col-lg-4 inquiry-content-left" style={{ fontSize: '12px' }}>name: </div>
                                                        <div className="col-lg-8 " style={{ fontSize: '10px' }}>{data.user_Ref[0].name}</div>
                                                    </div>
                                                    <div className="row" style={{ paddingBottom: '1px', paddingTop: '1px' }}>
                                                        <div className="col-lg-4 inquiry-content-left" style={{ fontSize: '12px' }}>email: </div>
                                                        <div className="col-lg-8 " style={{ fontSize: '10px' }}>{data.user_Ref[0].email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 recent-inquiry-status " style={{ width: '150px', height: '150px' }}>
                                    <button className={`recent-inquiry-button ${data.InquiryStatus}`}
                                        onClick={
                                            () => {
                                                if (decode.usertype == 'User') {
                                                    if (data.InquiryStatus == "COMPLETED") {
                                                        setId({ ...id, Id: data._id })
                                                        setUpdate({ ...update, issueID: data._id })
                                                        setMessage({ ...message, status: 'CLOSED', success: 'Are your sure to close your inquiry' })
                                                    }
                                                    else {
                                                        if (data.InquiryStatus == 'CLOSED') {
                                                            setId({ ...id, Id: data._id })
                                                            setMessage({ ...message, err: 'This inquiry was already closed' })
                                                        }
                                                        else {
                                                            setId({ ...id, Id: data._id })
                                                            setMessage({ ...message, err: 'sorry is not write time to close your inquiry' })
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (decode.usertype == "Admin") {
                                                        if (data.InquiryStatus == "NOTASSIGNED") {
                                                            setId({ ...id, Id: data._id })
                                                            setUpdate({ ...update, issueID: data._id })
                                                            setMessage({ ...message, status: 'ASSIGNED', success: 'Are your sure to  Assign this inquiry for you' })
                                                        }
                                                        else if (decode.id === data.taskAssignedTo[0]._id) {
                                                            if (data.InquiryStatus == "ASSIGNED") {
                                                                setId({ ...id, Id: data._id })
                                                                setUpdate({ ...update, issueID: data._id })
                                                                setMessage({ ...message, status: 'COMPLETED', success: 'Are your Completed this inquiry inquiry' })
                                                            } else if (data.InquiryStatus == "CLOSED") {
                                                                setId({ ...id, Id: data._id })
                                                                setMessage({ ...message, err: 'This inquiry was already closed' })
                                                            }
                                                            else {
                                                                setId({ ...id, Id: data._id })
                                                                setMessage({ ...message, err: 'sorry you cannot  close this inquiry' })
                                                            }
                                                        }
                                                        else {
                                                            setId({ ...id, Id: data._id })
                                                            setMessage({ ...message, err: 'sorry this inquiry not yours' })
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        name="InquiryStatus" type="button"> {data.InquiryStatus}</button>

                                    {(message.success == '') ? (
                                        <h1 className="1 err" id={data._id}>{message.err}</h1>
                                    ) : (
                                            <div className="1 success" style={{ display: 'none' }} id={data._id}>
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
                    <br />
                </div>
            )
        })
    }
    return (
        <div>
            {(data != '') ? (
                <div>
                    {(decode.usertype == 'User') ? (
                        <div className="row" style={{ with: '90%', height: '80px', position: 'relative', top: '10px' }}>
                            <div className="col-lg-8">
                                <h1 className="title-inquiry">{decode.name} your Inquiry</h1>
                            </div>
                            <div className="col-lg-4">
                                <button type="button" onClick={() => window.location = "http://localhost:3000/createInquiry"} className="add-inquiry-button"> Add Inquiry</button>
                            </div>
                        </div>) :
                        (<div className="row" style={{ with: '90%', height: '80px', position: 'relative', top: '10px' }}>
                            <div className="col-lg-8">
                                <h1 className="title-inquiry">{decode.name} your Inquiry</h1>
                            </div>
                        </div>)}
                    <br />
                    <div>{ok(data)}<br></br></div>
                </div>
            ) : (
                    <div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                        <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>
                            <i className="fa fa-exclamation-triangle fa-5x" style={{ position: 'relative', top: '50px' }} aria-hidden="true"></i>
                            <h3 style={{ position: 'relative', top: '50px' }}>{decode.name} Don't have daily updates</h3>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default MyInquiry;