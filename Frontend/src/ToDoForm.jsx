import React, { useEffect, useState } from "react";
import {
	addTodo,
	deleteTodo,
	getAllTodos,
	updateTodo,
} from "./lib/todo.controller";
import { useNavigate } from "react-router-dom";
import { isValidUserId } from "./lib/user.controller";

function ToDoForm() {
	const [allTodos, setAllTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [updateNote, setUpdatednote] = useState("");
	const [editingNoteId, setEditingNoteId] = useState(null);
	const [isUserValid, setUserValid] = useState(false);
	const [message, setMessage] = useState("");
	const user_id = localStorage.getItem("user_id");
	const navigate = useNavigate();
	const handleAdd = async () => {
		if (inputValue.length === 0 || inputValue.trim().length === 0) {
			setMessage("Empty Field");
		} else {
			await addTodo(inputValue, user_id);
			await loadAllTodos();
			setInputValue("");
		}
	};

	const handleRemove = async (id) => {
		await deleteTodo(id, user_id);
		await loadAllTodos();
	};

	async function loadAllTodos() {
		const todos = await getAllTodos(user_id);
		if (todos) {
			setAllTodos(todos);
			if (todos.length === 0) {
				setMessage("Add todo's to your list ; )");
			} else {
				setMessage("");
			}
		} else {
			setMessage("Add todo's to your list ; )");
			// setMessage("Error Fetching Todo")
			setAllTodos([]);
		}
	}

	async function handleEdit(id, body) {
		setEditingNoteId(id);
		setUpdatednote(body);
	}

	const handleUpdate = async (id) => {
		await updateTodo(id, updateNote, user_id);
		await loadAllTodos();
		setEditingNoteId(null);
		setUpdatednote("");
	};

	useEffect(() => {
		(async function () {
			const result = await isValidUserId(user_id);
			if (result.userExists === true) {
				setUserValid(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (isUserValid) {
			loadAllTodos();
		}
	}, [isUserValid]);

	if (!isUserValid) {
		return <></>;
	}

	const handleLogout = () => {
		localStorage.removeItem("user_id");
		setUserValid(false);
		navigate("/");
	};

	return (
		<div className="todo-container">
			<h1>To-Do Guru</h1>

			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Enter your todo"
				className="todo-input"
			/>
			<button onClick={handleAdd} className="todo-button">
				Add Note
      </button>
      <button onClick={handleLogout} className="logout-button">
				Logout
			</button>

			<h2 className="todo-title">Notes</h2>
			{message && <span className="todo-note">{message}</span>}

			<ul className="todo-list">
				{allTodos.map((todo) => (
					<li key={todo.note_id} className="todo-item">
						{editingNoteId === todo.note_id ? (
							<div>
								<input
									type="text"
									value={updateNote}
									onChange={(e) => setUpdatednote(e.target.value)}
									className="todo-edit-input"
								/>
								<button
									onClick={() => handleUpdate(todo.note_id)}
									className="todo-save-button"
								>
									Save
                </button>
                
							</div>
						) : (
							<>
								<span className="text">{todo.notes}</span>
								<span className="note-btn">
									<button
										onClick={() => handleEdit(todo.note_id, todo.notes)}
										className="todo-edit-button"
									>
										Edit
									</button>
									<button
										onClick={() => handleRemove(todo.note_id)}
										className="todo-remove-button"
									>
										Mark Completed
									</button>
								</span>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ToDoForm;
