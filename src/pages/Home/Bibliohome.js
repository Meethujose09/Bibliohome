import React from "react";
import { Link } from 'react-router-dom';
import Library from '../../asset/images/pic.jpg';
import './Bibliohome.css';
function Bibliohome() {
    return (
        <div className="container">
            <div className="content">
                <div className="text">
                    <p className='header'>Bibliohome</p>
                    <p>Step into the world of literature where every page holds adventure!</p>
                    <a href="/booklist" className="button">Get started</a>
                </div>
            </div>
            <img src={Library} alt="Image" className="image" />
        </div>
    )
}

export default Bibliohome