import React from "react";
import '../App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

const Home = () =>{
    return(
        <div style={{
            backgroundImage: `url('auctkart-high-resolution-color-logo.png')`
        }}>
            <h1>Home page for auction website
            </h1>
        </div>
    )
}

export default Home;