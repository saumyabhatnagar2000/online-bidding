import React, { useState, useEffect } from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import axios from 'axios';


const Bidding = () =>{
    const { id } = useParams()
    const [bidData, setBidData] = useState()
    const [min_bid, setMinBid] = useState() 

    useEffect(()=>{
        getAuctionData()
    },[])

    const decrementBid = () =>{
        let decrement = min_bid - bidData?.listing_id?.min_increment
        if(decrement < bidData?.listing_id?.min_bid){
            return alert('Bid amount cannot be less than current')
        }
        setMinBid(decrement)

    }

    const createBid = () =>{

    }

    const getAuctionData = () =>{
        axios.get(`http://localhost:3001/auctions/${id}`)
        .then((resp)=>{
            setBidData(resp.data)
            console.log(resp.data)
            setMinBid(resp.data?.listing_id?.min_bid)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
        
         <div className="container">
             <h1>Bidding Live</h1>
            <div className="row">
            {bidData?.images?.map((item)=>{
            return <div class="col-4">
            <img className="card-img-top" src={item?.image} alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title">{item.sub_category}</h5>
            <p className="card-text">{item.description}</p>
            </div>
            </div>
        })}
            </div>
            </div>
        <hr/>
        <div className="container">
            Category: {bidData?.category}
            <br/>
            Sub Category: {bidData?.sub_category}
            <br/>
            Description: {bidData?.description}
            <br/>
            Status: {bidData?.status}
            <br/>
            <i class="fa fa-minus" aria-hidden="true" onClick={decrementBid}></i>
            <button className="btn btn-warning btn-block">{min_bid}</button>
            <i class="fa fa-plus" aria-hidden="true" onClick={()=>{setMinBid(min_bid+bidData?.listing_id?.min_increment)}}></i>
            <br/>
            <br/>
            <button className="btn btn-warning btn-block">Save</button>
        </div>
      </div>
    )
}

export default Bidding;