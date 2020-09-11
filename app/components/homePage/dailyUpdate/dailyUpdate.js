import React, { useEffect, useState } from 'react'
import JwtDecode from 'jwt-decode';
import Axios from 'axios';
import moment from 'moment'
const dailyUpdate = () => {
    var token = localStorage.usertoken;
    var decode = JwtDecode(token);
    var curToday=moment()
    var print;
    const [daily, setDaily] = useState([]);
    let config = {
        headers: {
            Authorization: localStorage.usertoken
        }
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
    const date=(data)=>{
        var cur=curToday.format("L")
        var create=moment(data)
        var createDate=create.format("MMM DD YYYY")
         if((curToday.format('DD')==create.format('DD'))&&(curToday.format('MM')==create.format('MM'))&&(curToday.format('YYYY')==create.format('YYYY'))){
            print=moment(data || moment.now()).locale('en').fromNow()
        }
         else{
             print=createDate
         }
    }
    const ok = (daily) => {
        return daily.map(daily => {
            return (
                <div key={daily._id} >
                    <br/>
                    <div className="row recent-daily" >
                        <div className="col-lg-12 col-sm-12 col-md-12">
                            <p className="dailyUpdate-content">{daily.description}</p>
                            <div className="row" style={{ position: 'relative', top: '80px' }}>
                                <div className="col-lg-7  col-sm-12 col-md-12"></div>
                                <div className="col-lg-3  col-sm-12 col-md-12">
                                    <div className="row" style={{ paddingBottom: '1px', textAlign: 'right', paddingTop: '3px' }}>
                                        <div className="col-lg-6 inquiry-content-left" style={{ fontSize: '14px' }}>created BY: </div>
                                        <div className="col-lg-4 inquiry-content-left " style={{ color: '#23BB9F', textAlign: 'left', fontSize: '16px' }}>{daily.user_Ref[0].name}</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-12 col-md-12">
                                    {date(daily.createdAt),print}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
        })
    }
    return (
        <div>
            {(daily != '') ?
                (<div>
                    {(decode.usertype == 'User') ? (
                        <div className="row" style={{ with: '90%', height: '80px', position: 'relative', top: '10px' }}>
                            <div className="col-lg-8">
                                <h1 className="title-inquiry">{decode.name}  Daily Update</h1>
                            </div>
                        </div>) :
                        (<div className="row" style={{ with: '90%', height: '80px', position: 'relative', top: '10px' }}>
                            <div className="col-lg-8">
                                <h1 className="title-inquiry">{decode.name} &nbsp; Daily Update</h1>
                            </div>
                            <div className="col-lg-4">
                                <button type="button" onClick={() => window.location = "http://localhost:3000/createdaily"} className="add-inquiry-button"> Add DailyUpdate</button>
                            </div>
                        </div>)}
                        <br/>
                    <div>   
                        {ok(daily)}
                        <br />
                        <br />
                    </div>
                    <br></br>
                </div>
                ) : (<div className="row recent-daily" style={{ border: 'solid 0px', boxShadow: '0px 0px 0px ' }}>
                    <div className="col-lg-12 col-sm-12 col-md-12" style={{ textAlign: 'center', color: '#23BB9F' }}>
                        <i className="fa fa-bell-slash-o fa-5x" style={{ position: 'relative', top: '50px' }} aria-hidden="true"></i>
                        <h3 style={{ position: 'relative', top: '50px' }}>{decode.name} Don't have daily update </h3>
                    </div>
                </div>)}
        </div>
    )
}

export default dailyUpdate
