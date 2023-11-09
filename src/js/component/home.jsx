import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    useEffect(() => {
        getAllTodos();
    }, []);

    const getAllTodos = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("https://playground.4geeks.com/apis/fake/todos/user/ainhoaQM", requestOptions)
        .then(response => response.json())
        .then(result => setTodos(result))
        .catch(error => console.log('error', error));
    }

    const addTodo = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let agregar = todos.concat({
            "label": input,
            "done": false
        })

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(agregar),
            redirect: 'follow'
        };

        fetch("https://playground.4geeks.com/apis/fake/todos/user/ainhoaQM", requestOptions)
        .then(response => response.json())
        .then(result => getAllTodos())
        .catch(error => console.log('error', error));
    }

    const deleteTodo = (todo) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let eliminar = todos.filter(task => task !== todo);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(eliminar),
            redirect: 'follow'
        };

        fetch("https://playground.4geeks.com/apis/fake/todos/user/ainhoaQM", requestOptions)
        .then(response => response.json())
        .then(result => getAllTodos())
        .catch(error => console.log('error', error));
    }

    const deleteAllTodos = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://playground.4geeks.com/apis/fake/todos/user/ainhoaQM", requestOptions)
        .then(response => response.json())
        .then(result => {
            // Luego de eliminar, creamos un nuevo todo list vacío
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify([]),
                redirect: 'follow'
            };
            fetch("https://playground.4geeks.com/apis/fake/todos/user/ainhoaQM", requestOptions)
            .then(response => response.json())
            .then(result => getAllTodos())
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What do you do?"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <button onClick={deleteAllTodos} className="m-2">Delete All To Does</button>
            <div className="todos">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-item">
                        <p>{todo.label}</p>
                        <button onClick={() => deleteTodo(todo)} className="btn btn-danger"> Delete </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;