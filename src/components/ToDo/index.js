import React, { Component } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { Link } from 'react-router-dom'
import './index.css'

class ToDo extends Component {

    render() {
        const { inputList, deleteTask, editTask, selectedStatus, handleTaskClick } = this.props;
        console.log(inputList, 'oo')
        if (!inputList) {
            return <div>No tasks available</div>;
        }
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        return (
            <>
                <div className='todo-container'>
                    <div className='task-added'>
                        <p className='bullet-blue'></p>
                        <h1 className='task'>ToDo</h1>

                    </div>
                    {inputList.map(task => (
                        <div key={task.id} className={`task-card ${task.status === selectedStatus ? 'highlight' : ''}`}
                            style={{ borderTopColor: getRandomColor() }} onClick={() => handleTaskClick(task)} >
                            {/* <Link to={`/task/${task.id}`}> */}


                                <div className='title-heading-section'>
                                    <div className='title-heading'>
                                        <p className='bullets'></p>
                                        <h1 className='title'>{task.title}</h1>
                                    </div>
                                    <div className='icons'>
                                        <button className='btns' onClick={() => editTask(task)}>
                                            <FaEdit className='edit-icon' />
                                        </button>

                                        <button className='btns' onClick={() => deleteTask(task.id)}>
                                            <MdDelete className='delete-icon' />
                                        </button>
                                    </div>
                                </div>
                                <p className='date'>{task.date}</p>
                                {/* <p className='description'>{task.description}</p> */}
                                <p className='status'>{task.status}</p>
                                <p className='assign'>{task.assign}</p>
                            {/* </Link> */}
                        </div>
                    ))}

                </div>
            </>
        );
    }
}

export default ToDo;




