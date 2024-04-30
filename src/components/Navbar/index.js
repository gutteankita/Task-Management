import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MdAddTask } from "react-icons/md";
import './index.css'

class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul className='ul-container'>
                    <Link to="/" className='logo'>
                        <MdAddTask fontSize={17} className='icon' />
                        <h1 className='tag'>TaskMe</h1>
                    </Link>
                    <button className='logout-btn'>AG</button>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
