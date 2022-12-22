import React, { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { getItems, startAuctionApi } from "../../services/itemsService";

const Items = () => {
  const { token } = useData();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const setSelectItem = (item) => {
    let temp = {};
    if (!selected[item._id]) temp = { ...temp, [item._id]: true };
    else temp = { ...temp, [item._id]: false };
    setSelected(temp);
    console.log(temp);
  };

  console.log(token);

  const startAuction = async () => {
    try {
      const apiResponse = await startAuctionApi(selected, token);
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await getItems(token);
        console.log(response?.data);
        setData(response?.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="container">
      <div
        className="row"
        style={{
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <h3 style={{ flex: 4 }} className="col">
          All Auction Items
        </h3>
        <button
          onClick={() => startAuction()}
          type="button"
          class="btn btn-secondary col align-self-end"
        >
          Start Auction
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Uploaded By</th>
            <th scope="col">Status</th>
            <th scope="col">Sold To</th>
            <th scope="col">Sold At</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr>
                <th>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked={selected[item._id]}
                    onChange={() => setSelectItem(item)}
                  ></input>
                </th>
                <th scope="row">{index + 1}</th>
                <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                <td style={{ textTransform: "capitalize" }}>
                  {item.sub_category}
                </td>
                <td>
                  {/* <img
                    style={{ height: 50, width: 50 }}
                    src={item.images[0].image}
                  ></img> */}
                </td>
                <td>{item.seller_id}</td>
                <td>{item?.status ?? ""}</td>
                <td>{item?.sold_to ?? "N/A"}</td>
                <td>{item?.status ?? "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
