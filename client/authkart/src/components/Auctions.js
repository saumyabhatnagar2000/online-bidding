import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Auction = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = () => {
    axios
      .get("http://localhost:3001/auctions")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {data?.map((item) => {
            return (
              <div class="col-4">
                <img
                  className="card-img-top"
                  src={
                    item?.images[0]?.image ??
                    "http://res.cloudinary.com/saumya1/image/upload/v1671779241/ekcqike1yqhdggynlfb8.jpg"
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.sub_category}</h5>
                  <p className="card-text">{item.description}</p>
                  <Link
                    className="btn btn-primary m-2"
                    to={`/auctions/${item.listing_id._id}`}
                  >
                    Go to Bidding
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Auction;
