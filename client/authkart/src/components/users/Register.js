import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Seller from "./Seller";

const Register = () =>{
    const [createdUser, setCreatedUser] = useState("")
    let navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",
        password: "",
        role:"",
        wallet:0
    })

    const {email, password, role} = user

    const onInputChange = (e) =>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) =>{
        let body = {
            email:user.email, 
            password: user.password,
            role:user.role, 
            wallet:user.wallet
        }
        console.log(body)
        // axios.post(`http://localhost:3001/user/register`, body)
        // .then((resp)=>{
        //     setUser(resp.data)
        //     localStorage.setItem('user', resp.data)
        //     navigate('/seller/details')
        // })
        // .catch((err)=>{
        //     alert(err)
        // })
        setCreatedUser(true)
        // navigate('/seller/details')
        e.preventDefault();
    }
    if(!createdUser){
        return (
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={e =>onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter your Email"
                                required="true"
                                name="email"
                                value={email}
                                onChange={e=>onInputChange(e)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Enter your password"
                                required="true"
                                name="password"
                                value={password}
                                onChange={e=>onInputChange(e)}
                            />
                        </div>
                        <br/>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Join as</label>
                            <select class="form-select form-select-lg mb-3" id="role"
                            value={role}
                            name="role"
                            onChange={e=>onInputChange(e)}>
                                <option>Select Role</option>
                                <option>Seller</option>
                                <option>Buyer</option>
                            </select>
                        </div>
                        <br/>
                        <button className="btn btn-warning btn-block" onClick={onSubmit}>Next</button>
                    </form>
                </div>
                </div>
        )
    }
    return(
        <Seller user={user} role={role}/>
    )
    
}

export default Register;
