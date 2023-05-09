import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState("")
	useEffect(()=>{
		getAllTodos()
	},[])

	const getAllTodos = () => {
		let requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/ainhoaQM", requestOptions)
			.then(response => response.json())
			.then(result => setTodos(result))
			.catch(error => console.log('error', error));
	}

	const addTodo = () => {
		let myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");


		 let agregar = todos.concat( {
			"label": input,
			"done": false
		  })

         let requestOptions = {
           method: 'PUT',
           headers: myHeaders,
           body: JSON.stringify(agregar),
           redirect: 'follow'
         };

        fetch("https://assets.breatheco.de/apis/fake/todos/user/ainhoaQM", requestOptions)
          .then(response => response.json())
          .then(result => getAllTodos())
          .catch(error => console.log('error', error));
	}

	const deleteTodo = (todo) => {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");


		let eliminar = todos.filter(task => task != todo)
		console.log(eliminar)

		let requestOptions = {
		  method: 'PUT',
		  headers: myHeaders,
		  body: JSON.stringify(eliminar),
		  redirect: 'follow'
		};

	   fetch("https://assets.breatheco.de/apis/fake/todos/user/ainhoaQM", requestOptions)
		 .then(response => response.json())
		 .then(result => getAllTodos())
		 .catch(error => console.log('error', error));
		   }

	return (
		<div>
			<input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="What do yo do?"></input>
			<button onClick={addTodo}>Send</button>
			
			<div>
			{todos.map((todo, index)=>(
				<>
					<p key={index}>
						{todo.label}
					</p>
					<button onClick={()=>deleteTodo(todo)} className="btn btn-danger">
						Eliminar
					</button>
				</>
			))}
			</div>
		</div>
	);
};

export default Home;
