import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Bidding = () => {
  const { id } = useParams();
  const [bidData, setBidData] = useState();
  const [min_bid, setMinBid] = useState();
  const { token } = localStorage;
  const [biddingStart, setBiddingStart] = useState(true);
  const [allBiddings, setAllBiddings] = useState([]);

  useEffect(() => {
    getAuctionData();
    getBiddingData();
  }, []);

  const decrementBid = () => {
    let decrement = min_bid - bidData?.listing_id?.min_increment;
    if (decrement < bidData?.listing_id?.min_bid) {
      return alert("Bid amount cannot be less than current");
    }
    setMinBid(decrement);
  };

  const createBid = () => {
    let body = {
      listing_id: bidData?.listing_id?._id,
      user_id: bidData?.seller_id,
      bid_amount: min_bid,
      active: true,
    };
    axios
      .post(`http://localhost:3001/create/bidding`, body)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const getAuctionData = () => {
    axios
      .get(`http://localhost:3001/auctions/${id}`)
      .then((resp) => {
        setBidData(resp.data);
        setMinBid(resp.data?.listing_id?.min_bid);
        verifyBid();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBiddingData = () => {
    axios
      .get(`http://localhost:3001/bidding/${id}`)
      .then((resp) => {
        console.log(resp?.data);
        setAllBiddings(resp?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   setInterval(() => {
  //     getBiddingData();
  //   }, 20000);

  const verifyBid = () => {
    const stDate = moment.utc(bidData?.listing_id?.start_date);
    const enDate = moment.utc(bidData?.listing_id?.end_date);
    if (stDate > moment(new Date()) || enDate < moment(new Date())) {
      setBiddingStart(false);
    } else {
      setBiddingStart(true);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Bidding Live</h1>
        <div className="row">
          {bidData?.images?.map((item) => {
            return (
              <div class="col-4">
                <img
                  className="card-img-top"
                  src={item?.image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.sub_category}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="container" style={{ marginBottom: 20 }}>
        Category: {bidData?.category}
        <br />
        Sub Category: {bidData?.sub_category}
        <br />
        Description: {bidData?.description}
        <br />
        Status: {bidData?.status}
        <br />
        <i class="fa fa-minus" aria-hidden="true" onClick={decrementBid}></i>
        <button
          style={{ paddingLeft: 20, paddingRight: 20, margin: 20 }}
          className="btn btn-primary btn-block"
        >
          {min_bid}
        </button>
        <i
          class="fa fa-plus"
          aria-hidden="true"
          onClick={() => {
            setMinBid(min_bid + bidData?.listing_id?.min_increment);
          }}
        ></i>
        <br />
        <br />
        {!biddingStart ? (
          <p>
            This bidding has ended or not started yet Please check after
            sometime
          </p>
        ) : null}
        <button
          className="btn btn-success btn-block"
          onClick={createBid}
          style={{ paddingLeft: 20, paddingRight: 20 }}
          disabled={biddingStart ? false : true}
        >
          Place Bid
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Bidding Amount</th>
          </tr>
        </thead>
        <tbody>
          {allBiddings?.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td style={{}}>{item.user_id.email}</td>
                <td>{item.bid_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Bidding;
