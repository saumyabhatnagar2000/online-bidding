import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      csvfile: event.target.files[0],
    });
  };

  importCSV = async () => {
    const { csvfile } = this.state;
    console.log(csvfile);
    var fileName = csvfile.name;
    const formData = new FormData();
    formData.append("file", csvfile);
    let token = await localStorage.getItem("token");
    axios
      .post(`http://localhost:3001/bulk-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => {
        // then print response status
        console.log(res);
        if (res === "success") {
          alert("File data uploaded Successfully");
        } else {
          if (res === "Error") {
            alert(
              "Please ensure that your CSV file is formatted using the correct template, if you have any doubt contact the support team."
            );
          } else {
            console.log(res);
          }
        }
      });
    window.location.href = "http://192.168.5.15:3006/items";
  };

  updateData(result) {
    var data = result.data;
    console.log(data);
  }

  render() {
    console.log(this.state.csvfile);
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          ref={(input) => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
      </div>
    );
  }
}

export default AddItem;
