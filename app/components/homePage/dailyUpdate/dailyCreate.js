import React, { useState } from 'react'
import Axios from 'axios'

function dailyCreate() {
    const [daily, setDaily] = useState({ description: '', department: 'RVSCAS' })
    const onChange = (e) => {
        setDaily({ ...daily, [e.target.name]: e.target.value });
    }
    let body = {
        department: daily.department,
        description: daily.description
    };
    let config = {
        headers: {
            Authorization: localStorage.usertoken
        }
    };
    const onCreate = () => {
        if (daily.description != '') {
            Axios.post('http://localhost:5000/api/createDaily', body, config).then(res => {
                console.log(res.data.message)
                if (res.data.message == 'dailyupdate created successfully') {
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
            alert('description is must to create an daily');
        }

    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-10">
                    <h1 className="title-recent">Create Daily Update</h1>
                </div>
            </div>
            <div className="row" style={{ height: "600px" }}>
                <div className="col-2"></div>
                <div className="col-8 create-center" style={{ height: "400px" }}>
                    <div className="row" >
                        <div className="col-lg-2"></div>
                        <div className="col-lg-4 create-inquiry-right">Department :</div>
                        <select name="department" onChange={onChange} className="col-lg-4 create-inquiry-left">
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
                    <div className="row" >
                        <div className="col-lg-2 "></div>
                        <div className="col-lg-4 create-inquiry-right">Description :</div>
                        <textarea type="text" name='description' onChange={onChange} style={{ height: '150px' }} className="col-lg-4 create-inquiry-left" />
                    </div>
                    <div className="row">
                        <div className="col-lg-7"></div>
                        <div className="col-lg-4">
                            <button type="button" onClick={onCreate} className="add-inquiry-button">Create Daily</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default dailyCreate
