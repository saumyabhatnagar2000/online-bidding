import React, { useEffect, useState } from "react";
import {
  Dialog,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Modal,
  Box,
  TextField,
  Button,
  DialogContent,
} from "@mui/material";
import { useData } from "../../hooks/useData";
import { getItems, startAuctionApi } from "../../services/itemsService";
// import DatePicker from "react-datepicker";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// import "react-datepicker/dist/react-datepicker.css";

const getItemData = (id, data) => {
  let temp = {};
  data.forEach((item) => {
    if (item._id === id) {
      temp = item;
    }
  });
  return temp;
};

const Items = () => {
  const { token } = useData();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  const setSelectItem = (item) => {
    let temp = {};
    if (!selected[item._id]) temp = { ...temp, [item._id]: true };
    else temp = { ...temp, [item._id]: false };
    setSelected(temp);
  };

  const [show, setShow] = useState(false);

  const startAuction = async () => {
    try {
      setShow(true);
      //   const apiResponse = await startAuctionApi(selected, token);
      const tempdata = getItemData(Object.keys(selected)[0], data);
      setSelectedData(tempdata);
      console.log(selectedData);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClose = () => setShow(false);
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

  const [formIndex, setFormIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [minInc, setMinInc] = useState(0);
  const [minBid, setMinBid] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const submitAuctionData = async () => {
    try {
      const token = await localStorage.getItem("token");
      const data = {
        item_id: Object.keys(selected)[0],
        min_increment: minInc,
        min_bid: minBid,
        end_date: new Date(deadline),
        start_date: new Date(startTime),
      };
      console.log(data);
      const apiResponse = await startAuctionApi(data, token);
      setShow(false);
      setSelected({});
    } catch (e) {}
  };

  return (
    <>
      <div>
        <Dialog
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            "& .MuiDialog-paper": {
              minWidth: "600px",
              minHeight: "260px",
            },
            "& .MuiPaper-root": {
              minWidth: "800px",
              minHeight: "500px",
            },
          }}
        >
          <Box>
            <Typography
              align="center"
              className="col"
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ margin: 10 }}
            >
              Enter details for {selectedData.name}
            </Typography>

            <Typography
              align="center"
              style={{ margin: 10 }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {formIndex} out of {Object.keys(selected).length}
            </Typography>

            <FormControl>
              <TextField
                value={minBid}
                onChange={(e) => setMinBid(e.target.value)}
                style={{ marginLeft: 270, marginTop: 10 }}
                label="Enter Minimum bid"
                variant="standard"
                color="primary"
                focused
              />
              <TextField
                style={{ marginLeft: 270, marginTop: 10 }}
                value={minInc}
                onChange={(e) => setMinInc(e.target.value)}
                label="Minimum Increment"
                variant="standard"
                color="primary"
                focused
              />

              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 270,
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      className="w-40"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <DateTimePicker
                        label="Start date"
                        inputFormat="yyyy-MM-dd"
                        value={startTime}
                        //   maxDate={endDate || moment(new Date())}
                        inputFormat="E MMM dd yyyy HH:MM:SS O"
                        onChange={(value) => {
                          setStartTime(value);
                        }}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </Box>
                  </Box>
                </LocalizationProvider>
              </DialogContent>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 270,
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      className="w-40"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <DateTimePicker
                        label="End date"
                        inputFormat="yyyy-MM-dd"
                        value={deadline}
                        //   maxDate={endDate || moment(new Date())}
                        inputFormat="E MMM dd yyyy HH:MM:SS O"
                        onChange={(value) => {
                          setDeadline(value);
                        }}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </Box>
                  </Box>
                </LocalizationProvider>
              </DialogContent>
              <Button
                sx={{ marginTop: 3 }}
                style={{ marginLeft: 270 }}
                variant="contained"
                onClick={submitAuctionData}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Dialog>
      </div>
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
            onClick={startAuction}
            type="button"
            class="btn btn-secondary col align-self-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
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
                    {item.status == "upcoming" ? (
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={selected[item._id]}
                        onChange={() => setSelectItem(item)}
                      ></input>
                    ) : (
                      <></>
                    )}
                  </th>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {item.sub_category}
                  </td>
                  <td>
                    <img
                      style={{ height: 50, width: 50 }}
                      src={item?.images[0]?.image}
                    ></img>
                  </td>
                  <td>{item.seller_id}</td>
                  <td>{item?.status ?? ""}</td>
                  <td>{item?.sold_to ?? "N/A"}</td>
                  <td>{item?.sold_at ?? "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Items;
