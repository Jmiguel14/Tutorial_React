import React, {useState} from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import UserList from "./UserList";
import TodoList from "./TodoList";

const App = (props) => (
    <>
        <UserList users={props.users} />
        <TodoList />
    </>
)

export default App;
