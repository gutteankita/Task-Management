import React, { Component } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

import { v4 as uuidv4 } from 'uuid'
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

import Completed from '../Completed';
import InProgress from '../InProgress'
import ToDo from '../ToDo'

// import TaskDetails from '../TaskDetails';

import './index.css'


const statusList = [
  { optionId: 'TODO', displayText: 'To Do', color: '#4360F6' }, // Blue color for To Do
  { optionId: 'IN_PROGRESS', displayText: 'In Progress', color: '#DDDD52' }, // Yellow color for In Progress
  { optionId: 'COMPLETED', displayText: 'Completed', color: '#19A320' }, // Green color for Completed
];
const countTasksByStatus = (tasks, status) => {
  return tasks.filter(task => task.status === status).length;
};

const assignToList = [
  { optionId: 'Jane Smith', name: 'Jane Smith' },
  { optionId: 'Alex Jhonson', name: 'Alex Jhonson' },
  { optionId: 'Emily Wilson', name: 'Emily Wilson' },
  { optionId: 'Jhon Doe', name: 'Jhon Doe' },
  { optionId: 'Maria Garcia', name: 'Maria Garcia' },
];



class Dashboard extends Component {
  state = {
    title: '',
    description: '',
    selectedDate: '',
    inputList: [],
    selectedStatus: statusList[0].optionId,
    selectedAssign: assignToList[0].optionId,
    activeStatus: 'INITIAL',
    isEditFormOpen: false,
    editingTask: null,
    titleError: '',
    descriptionError: '',
    dateError: '',

    todoList: [],
    inProgressList: [],
    completedList: [],

    // selectedTask: null,

  }

  // handleTaskClick = (task) => {
  //   console.log("Task clicked:", task);
  //   this.setState({ selectedTask: task });
  // };

  // handleCloseDetails = () => {
  //   this.setState({ selectedTask: null });
  // };

  editTask = (task) => {
    const { title, description, status, assign } = task;
    this.setState({ editingTask: task, isEditFormOpen: true, title, description, selectedStatus: status, selectedAssign: assign });
  }



  deleteTask = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(task => task.id !== id),
      inProgressList: prevState.inProgressList.filter(task => task.id !== id),
      completedList: prevState.completedList.filter(task => task.id !== id),
      inputList: prevState.inputList.filter(task => task.id !== id),
    }));
  };


  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeDescription = event => {
    this.setState({
      description: event.target.value,
    });
  }

  onChangeDate = event => {
    const selectedDate = event.target.value;
    this.setState({
      selectedDate: selectedDate,
    });
  };


  onSelectedStatus = event => {
    this.setState({
      selectedStatus: event.target.value,
    });
  }

  onSelectedAssign = event => {
    this.setState({
      selectedAssign: event.target.value,
    });
  }


  handleSubmitBtn = event => {
    event.preventDefault();
    const { isEditFormOpen, title, description, selectedStatus, selectedAssign, selectedDate } = this.state;


    // Reset error messages
    this.setState({
      titleError: '',
      descriptionError: '',
      dateError: '',
    });

    // Validation checks
    let isValid = true;
    if (!title.trim()) {
      this.setState({ titleError: 'Please enter a title' });
      isValid = false;
    }
    if (!description.trim()) {
      this.setState({ descriptionError: 'Please enter a description' });
      isValid = false;
    }
    if (!selectedDate.trim()) {
      this.setState({ dateError: 'Please select a date' });
      isValid = false;
    }
    // Prevent form submission if validation fails
    if (!isValid) {
      return;
    }



    // Create a new task object
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: selectedStatus,
      assign: selectedAssign,
      date: selectedDate,
    };


    // Add the new task to the appropriate list based on its status
    switch (selectedStatus) {
      case 'TODO':
        this.setState(prevState => ({
          todoList: [...prevState.todoList, newTask],
        }));
        break;
      case 'IN_PROGRESS':
        this.setState(prevState => ({
          inProgressList: [...prevState.inProgressList, newTask],
        }));
        break;
      case 'COMPLETED':
        this.setState(prevState => ({
          completedList: [...prevState.completedList, newTask],
        }));
        break;
      default:
        break;
    }


    // Add task to inputList if form is not in edit mode
    if (!isEditFormOpen) {
      const uuid = uuidv4();
      this.setState(prevState => ({
        inputList: [
          ...prevState.inputList,
          { id: uuid, title: title, description: description, status: selectedStatus, assign: selectedAssign, date: selectedDate },
        ],
        title: '',
        description: '',
        selectedStatus: statusList[0].optionId,
        selectedAssign: assignToList[0].optionId,
        selectedDate: '',
      }));
    }
  }

  onClickActiveStatus = optionId => {
    this.setState(prevState => ({
      activeStatus: prevState.activeStatus === optionId ? 'INITIAL' : optionId,
    }));
  }




  handleUpdateTask = updatedTask => {
    const { todoList, inProgressList, completedList, inputList } = this.state;

    // Remove the updated task from its previous list
    const updatedList = inputList.filter(task => task.id !== updatedTask.id);

    // Add the updated task to the new list
    let newList;
    switch (updatedTask.status) {
      case 'TODO':
        newList = [...todoList.filter(task => task.id !== updatedTask.id), updatedTask];
        break;
      case 'IN_PROGRESS':
        newList = [...inProgressList.filter(task => task.id !== updatedTask.id), updatedTask];
        break;
      case 'COMPLETED':
        newList = [...completedList.filter(task => task.id !== updatedTask.id), updatedTask];
        break;
      default:
        break;
    }

    // Update state with the new lists and reset form fields and editing state
    this.setState({
      todoList: updatedTask.status === 'TODO' ? newList : todoList.filter(task => task.id !== updatedTask.id),
      inProgressList: updatedTask.status === 'IN_PROGRESS' ? newList : inProgressList.filter(task => task.id !== updatedTask.id),
      completedList: updatedTask.status === 'COMPLETED' ? newList : completedList.filter(task => task.id !== updatedTask.id),
      editingTask: null,
      isEditFormOpen: false,
      title: '',
      description: '',
      selectedStatus: statusList[0].optionId,
      selectedAssign: assignToList[0].optionId,
      selectedDate: '',
      inputList: updatedList, // Update inputList with the updated task removed
    });
  };


  handleCancelEdit = () => {
    this.setState({
      isEditFormOpen: false,
      title: '',
      description: '',
      selectedStatus: statusList[0].optionId,
      selectedAssign: assignToList[0].optionId,
      selectedDate: '',
    });
  }

  getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros if month/day is a single digit
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }


  render() {
    const { todoList, inProgressList, completedList, title, description,
       selectedStatus, selectedAssign, selectedDate, isEditFormOpen, editingTask,
        titleError, descriptionError, dateError} = this.state;



    const data = statusList.map(status => ({
      name: status.displayText,
      value: countTasksByStatus(
        status.optionId === 'TODO' ? todoList :
          status.optionId === 'IN_PROGRESS' ? inProgressList : completedList,
        status.optionId
      ),
      fill: status.color
    }));

    return (
      <>
        <Navbar />
        <div className='main-container'>
          <Sidebar />
          <div className='dashboard-container'>
            <div className='form-chart-container'>


              {isEditFormOpen && editingTask && (
                <form className='task-form'>
                  <h1>Edit Task</h1>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='title'>Title</label>
                    <input className='input' type='text' value={title} onChange={this.onChangeTitle} />
                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='description'>Description</label>
                    <textarea rows="3" id='description' onChange={this.onChangeDescription} value={description} className='input' />

                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='status'>Status</label>
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={this.onSelectedStatus}
                      className='input'
                    >

                      {statusList.map(each => (
                        <option key={each.optionId} value={each.optionId}>
                          {each.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='assign'>Assign Task To</label>

                    <select
                      id="assign"
                      value={selectedAssign}
                      onChange={this.onSelectedAssign}
                      className='input'
                    >
                      {assignToList.map(each => (
                        <option key={each.optionId} value={each.name}>
                          {each.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  {/* <div className='inputs-container'>
                  <label className='label' htmlFor='date'>Due Date</label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    className='input'
                  />
                  <span className='error-message'>{dateError}</span>
                </div> */}
                  <div className='btn-container'>
                    <button className="updates-btn update" onClick={() => this.handleUpdateTask({ ...editingTask, title, description, status: selectedStatus, assign: selectedAssign })}>Update</button>
                    <button className="updates-btn cancel" onClick={() => this.handleCancelEdit()}>Cancel</button>
                  </div>

                </form>
              )}

              {!isEditFormOpen && (
                <form className='task-form' onSubmit={this.handleSubmitBtn}>
                  <h1>Add Task</h1>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='title'>Title</label>
                    <input id='title' className='input'
                      onChange={this.onChangeTitle} value={title} />
                    <span className='error-message'>{titleError}</span>
                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='description'>Description</label>
                    <textarea rows="3" id='description' onChange={this.onChangeDescription} value={description} className='input' />
                    <span className='error-message'>{descriptionError}</span>
                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='assign'>Assign Task To</label>

                    <select
                      id="assign"
                      value={selectedAssign}
                      onChange={this.onSelectedAssign}
                      className='input'
                    >
                      {assignToList.map(each => (
                        <option key={each.optionId} value={each.name}>
                          {each.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='status'>Status</label>
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={this.onSelectedStatus}
                      className='input'
                    >
                      <option value="">Select,,,,</option>

                      {statusList.map(each => (

                        <option key={each.optionId} value={each.optionId}>
                          {each.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='inputs-container'>
                    <label className='label' htmlFor='date'>Due Date</label>
                    <input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={this.onChangeDate}
                      min={this.getMinDate()}
                      className='input'
                    />
                    <span className='error-message'>{dateError}</span>
                  </div>
                  <button className='add-btn' type='submit'>Add</button>
                </form>
              )}

              {todoList.length || inProgressList.length || completedList.length ? (
                <div className='chart-container'>
                  <h2>Task Status Overview</h2>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data}
                      cx={200}
                      cy={200}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              ) : null}


            </div>

            <div className='render-tasks'>
              <ToDo inputList={todoList} deleteTask={this.deleteTask}
               editTask={this.editTask} />
              <InProgress inputList={inProgressList} deleteTask={this.deleteTask} editTask={this.editTask} />
              <Completed inputList={completedList} deleteTask={this.deleteTask} editTask={this.editTask} />
            </div>

            {/* {selectedTask && (
  <TaskDetails task={selectedTask} onClose={this.handleCloseDetails} />
)} */}

          </div>

          
        </div>

        
      </>
    );
  }
}

export default Dashboard;










