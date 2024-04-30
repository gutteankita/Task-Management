
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import ActiveMenuContext from '../../context/ActiveMenuContext';

import './index.css';

class Sidebar extends Component {
    render() {
        return (
            <ActiveMenuContext.Consumer>
                {value => {
                    const { isActive } = value;
                    return (
                        <div className='sidebar-main-container'>
                            <ul className='sidebar-ul-container'>
                                <li className='sidebar-li-container'>
                                    <NavLink exact to="/" className={`side-links ${isActive ? 'active' : ''}`}>
                                        <MdDashboard className='sidebar-icon' />
                                        <p className={`sidebar-title ${isActive ? 'active' : ''}`}>Dashboard</p>
                                    </NavLink>
                                </li>
                                <li className='sidebar-li-container'>
                                    <FaTasks className='sidebar-icon' />
                                    <span className='sidebar-title'>Tasks</span>
                                    <span className='hover-text'>Coming soon</span>
                                </li>
                                <li className='sidebar-li-container'>
                                    <SiGoogletasks className='sidebar-icon' />
                                    <span className='sidebar-title'>Completed</span>
                                    <span className='hover-text'>Coming soon</span>
                                </li>
                                <li className='sidebar-li-container'>
                                    <GiProgression className='sidebar-icon' />
                                    <span className='sidebar-title'>In Progress</span>
                                    <span className='hover-text'>Coming soon</span>
                                </li>
                                <li className='sidebar-li-container'>
                                    <FaClipboardList className='sidebar-icon' />
                                    <span className='sidebar-title'>To DO</span>
                                    <span className='hover-text'>Coming soon</span>
                                </li>
                            </ul>
                        </div>
                    );
                }}
            </ActiveMenuContext.Consumer>
        );
    }
}

export default Sidebar;


