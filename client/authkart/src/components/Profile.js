import React, { useEffect, useState } from "react";
import hackathon from "../services/hackathon";

export const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userHistory, setUserHistory] = useState([]);

  const getUserProfile = async () => {
    try {
      const token = await localStorage.getItem("token");
      const resp = await hackathon({
        url: `/profile/me`,
        headers: {
          Authorization: token,
        },
      });
      //   console.log(resp);s
      setUserProfile(resp?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserHistory = async () => {
    try {
      const token = await localStorage.getItem("token");
      const resp = await hackathon({
        url: `/history`,
        headers: {
          Authorization: token,
        },
      });
      console.log(resp?.data);
      setUserHistory(resp?.data?.items_bought);
    } catch (e) {
      console.log(e);
    }
  };

  const sendForVerification = async (data) => {
    try {
      const token = await localStorage.getItem("token");
      const apiResponse = await hackathon({
        url: "/add_to_verify",
        method: "POST",
        data: {
          item_id: data._id,
        },
        headers: {
          Authorization: token,
        },
      });
      console.log(apiResponse?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserHistory();
    getUserProfile();
  }, []);

  console.log(userProfile);

  return (
    <>
      <div className="container">
        <div className="card">
          <h3>Email: {userProfile?.email}</h3>
          <p style={{ textTransform: "capitalize" }}>
            Role: {userProfile?.role}
          </p>
          <p style={{ textTransform: "capitalize" }}>
            Wallet Money: ₹{userProfile?.wallet}
          </p>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Sold At</th>
            <th scope="col">Status</th>
            <th scope="col">Address</th>
            <th scope="col">Verify</th>
          </tr>
        </thead>
        <tbody>
          {userHistory?.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                <td style={{ textTransform: "capitalize" }}>
                  {item.sub_category}
                </td>
                <td>₹{item.sold_at}</td>
                <td>{item.status}</td>
                <td>{item.item_address}</td>

                <td>
                  {!item.verified ? (
                    <button
                      type="button"
                      onClick={() => sendForVerification(item)}
                      class="btn btn-success"
                    >
                      Verify
                    </button>
                  ) : (
                    "Verified"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
