import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Seller = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  const role = props.role;
  console.log(role);
  const [bankDetail, setBankDetails] = useState({
    ifscCode: "",
    accountNumber: "",
    name: "",
  });
  const [companyDetail, setCompanyDetails] = useState({
    companyname: "",
    trademark: "",
    website: "",
    gstnumber: "",
  });

  const [userDetails, setUserDetails] = useState({
    file: "",
    username: "",
    number: "",
    pancardnum: "",
  });

  const { ifscCode, accountNumber, name } = bankDetail;
  const { companyname, trademark, website, gstnumber } = companyDetail;
  const { username, file, number, pancardnum } = userDetails;

  const onInputChange = (e) => {
    setBankDetails({ ...bankDetail, [e.target.name]: e.target.value });
  };

  const onDetailsChange = (e) => {
    setCompanyDetails({ ...companyDetail, [e.target.name]: e.target.value });
  };

  const onUserDetailsChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      ifscCode: bankDetail.ifscCode,
      accountNumber: bankDetail.ifscCode,
      name: bankDetail.name,
      user,
      companyname: companyDetail.companyname,
      trademark: companyDetail.trademark,
      website: companyDetail.website,
      file: userDetails.file,
      username: userDetails.username,
      number: userDetails.number,
      gstnumber: companyDetail.gstnumber,
      pancardnum: userDetails.pancardnum,
    };

    console.log(body);
    axios
      .post(`http://localhost:3001/user/register`, body)
      .then((resp) => {
        setUser(resp.data);
        localStorage.setItem("role", role);
        localStorage.setItem("token", resp?.data?.token);
        localStorage.setItem("user", resp.data);
        if (role === "admin" || role === "seller") navigate("/items");
        else navigate("/auctions");
      })
      .catch((err) => {
        alert(err);
      });
  };
  if (role != "Buyer") {
    return (
      <>
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Enter Bank Details</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Bank Name"
                  required="true"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="IFSC CODE"
                  required="true"
                  name="ifscCode"
                  value={ifscCode}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Account Number"
                  required="true"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <br />
            </form>
          </div>
        </div>

        <br />
        <br />
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Enter Company Details</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Company Name"
                  required="true"
                  name="companyname"
                  value={companyname}
                  onChange={(e) => onDetailsChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Trademark"
                  required="true"
                  name="trademark"
                  value={trademark}
                  onChange={(e) => onDetailsChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Website"
                  required="true"
                  name="website"
                  value={website}
                  onChange={(e) => onDetailsChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="GST Number"
                  required="true"
                  name="gstnumber"
                  value={gstnumber}
                  onChange={(e) => onDetailsChange(e)}
                />
              </div>
              <br />
              <button className="btn btn-warning btn-block" onClick={onSubmit}>
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Enter User Details</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Name"
                required="true"
                name="username"
                value={username}
                onChange={(e) => onUserDetailsChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Contact Number"
                required="true"
                name="number"
                value={number}
                onChange={(e) => onUserDetailsChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Email Id"
                required="true"
                name="email"
                value={user.email}
                onChange={(e) => onUserDetailsChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Pan Card"
                required="true"
                name="pancardnum"
                value={pancardnum}
                onChange={(e) => onUserDetailsChange(e)}
              />
            </div>
            <br />
            <button className="btn btn-warning btn-block" onClick={onSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Seller;
