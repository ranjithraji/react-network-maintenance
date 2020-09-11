import React, { useState } from 'react'
import Axios from 'axios'

function createInquiry() {
    const [issue, setIssue] = useState({ description: '', issueType: 'No internet', location: 'Lap' })
    const onChange = (e) => {
        setIssue({ ...issue, [e.target.name]: e.target.value });
    }
    let body = {
        issueType: issue.issueType,
        location: issue.location,
        description: issue.description
    };
    let config = {
        headers: {
            Authorization: localStorage.usertoken
        }
    };
    const onCreate = () => {
        if (issue.description != '') {
            Axios.post('http://localhost:5000/api/issueCreate', body, config).then(res => {
                console.log(res.data.message)
                if (res.data.message == 'issue created successfully') {
                    alert(res.data.message)
                    window.location = `http://localhost:3000/userHome`;
                }
                else {
                    alert(res.data.message)
                }
            }).catch(err => {
                console.log(err);

            })
        }
        else {
            alert('description is must to create an issue');
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-10">
                    <h1 className="title-recent">Create Inquiry</h1>
                </div>
            </div>
            <div className="row" style={{ height: "600px" }}>
                <div className="col-2"></div>
                <div className="col-8 create-center" style={{ height: "460px" }}>
                    <div className="row" >
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 create-inquiry-right">Issue Type :</div>
                        <select name="issueType" onChange={onChange} className="col-lg-4 create-inquiry-left">
                            <option value="">Choose anything</option>
                            <option value="No internet">No internet</option>
                            <option value="Slow Internet">Slow Internet</option>
                            <option value="System maintenance">System maintenance</option>

                        </select>
                    </div>
                    <div className="row" >
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 create-inquiry-right">Location :</div>
                        <select name="location" onChange={onChange} className="col-lg-4 create-inquiry-left">
                            <option value="">Choose anything</option>
                            <option value="Lap">Lap</option>
                            <option value="Department">Department</option>
                            <option value="101">101</option>
                            <option value="102">102</option>
                        </select>
                    </div>
                    <div className="row" >
                        <div className="col-lg-2 "></div>
                        <div className="col-lg-4 create-inquiry-right">Description :</div>
                        <textarea type="text" name='description' onChange={onChange} style={{ height: '150px' }} className="col-lg-4 create-inquiry-left" />
                    </div>
                    <div className="row">
                        <div className="col-lg-7"></div>
                        <div className="col-lg-4">
                            <button type="button" className="add-inquiry-button" onClick={onCreate}>Create Inquiry</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default createInquiry
