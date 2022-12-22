import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Seller = (props) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState(props.user)
    const role = props.role
    console.log(role)
    const [bankDetail, setBankDetails] = useState({
        ifscCode:"",
        accountNumber:"",
        name:""
    })
    const [companyDetail, setCompanyDetails] = useState({
        companyname:"",
        trademark:"",
        website:""

    })

    const [userDetails, setUserDetails] = useState({
        file:"",
        username:"",
        number:""
    })

    const {ifscCode, accountNumber, name} = bankDetail
    const {companyname, trademark, website} = companyDetail
    const {username, file, number} = userDetails

    const onInputChange = (e) =>{
        setBankDetails({...bankDetail, [e.target.name]:e.target.value})
    }

    const onDetailsChange = (e) =>{
        setCompanyDetails({...companyDetail, [e.target.name]:e.target.value})
    }

    const onUserDetailsChange = (e) =>{
        setUserDetails({...userDetails, [e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        let body = {
            ifscCode:bankDetail.ifscCode, 
            accountNumber: bankDetail.ifscCode,
            name:bankDetail.name,
            user,
            companyname:companyDetail.companyname,
            trademark:companyDetail.trademark,
            website:companyDetail.website,
            file:userDetails.file,
            username: userDetails.username,
            number:userDetails.number
        }
        e.preventDefault();

        console.log(body)
        axios.post(`http://localhost:3001/user/register`, body)
        .then((resp)=>{
            setUser(resp.data)
            localStorage.setItem('user', resp.data)
            navigate('/seller/details')
        })
        .catch((err)=>{
            alert(err)
        })
        navigate('/home')
    }
    if(role!='Buyer'){
        return(
            <>
            <div className="container">
                    <div className="w-75 mx-auto shadow p-5">
                        <h2 className="text-center mb-4">Enter Bank Details</h2>
                        <form onSubmit={e =>onSubmit(e)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Bank Name"
                                    required="true"
                                    name="name"
                                    value={name}
                                    onChange={e=>onInputChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="IFSC CODE"
                                    required="true"
                                    name="ifscCode"
                                    value={ifscCode}
                                    onChange={e=>onInputChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Account Number"
                                    required="true"
                                    name="accountNumber"
                                    value={accountNumber}
                                    onChange={e=>onInputChange(e)}
                                />
                            </div>
                            <br/>
                        </form>
                    </div>
                    </div>

            <br/>
            <br/>
            <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                        <h2 className="text-center mb-4">Enter Company Details</h2>
                        <form onSubmit={e =>onSubmit(e)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Company Name"
                                    required="true"
                                    name="companyname"
                                    value={companyname}
                                    onChange={e=>onDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Trademark"
                                    required="true"
                                    name="trademark"
                                    value={trademark}
                                    onChange={e=>onDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Website"
                                    required="true"
                                    name="website"
                                    value={website}
                                    onChange={e=>onDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <button className="btn btn-warning btn-block" onClick={onSubmit}>Register</button>
                        </form>
                    </div>
                    </div>
            </>
        )
    }
    else{
        return (
            <div className="container">
                    <div className="w-75 mx-auto shadow p-5">
                        <h2 className="text-center mb-4">Enter User Details</h2>
                        <form onSubmit={e =>onSubmit(e)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Name"
                                    required="true"
                                    name="username"
                                    value={username}
                                    onChange={e=>onUserDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Contact Number"
                                    required="true"
                                    name="number"
                                    value={number}
                                    onChange={e=>onUserDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Email Id"
                                    required="true"
                                    name="email"
                                    value={user.email}
                                    onChange={e=>onUserDetailsChange(e)}
                                />
                            </div>
                            <br/>
                            <div class="mb-3">
                            <label for="formFileMultiple" className="form-label">Multiple files input example</label>
                            <input className="form-control" type="file" id="file" multiple>
                            </input>
                            </div>
                            <br/>
                            <button className="btn btn-warning btn-block" onClick={onSubmit}>Register</button>
                        </form>
                    </div>
                    </div>
        )
    }
}


export default Seller;