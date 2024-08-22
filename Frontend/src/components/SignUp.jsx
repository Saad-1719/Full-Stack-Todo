import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ("./SignUp.css");
import { AddUser } from "../lib/user.controller";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
    const [success, setsuccess] = useState("");
    const [loading,setLoading]=useState(false)

    const navigate = useNavigate();
	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	async function handleSubmit() {
		if (name.trim() === "") {
			setError("Name is required");
        }
        else if (!validateEmail(email)) {
			setError("Invalid email format");
        }
        else if (password === "") {
			setError("Password is required");
		} 
		else if (password.length < 5) {
			setError("Password must be atleast of  five characters");
        }
        else if (password !== confirmPassword) {
			setError("Passwords do not match");
		} else {
			setError("");
            try {
                setLoading(true)
                const user = await AddUser(name, email.toLocaleLowerCase(), password);
                setLoading(false)
                // console.log(user);
				if (user.userAdded===true) {
					localStorage.setItem("user_id", user.id);
					setName("");
					setEmail("");
					setPassword("");
					setConfirmPassword("");
					
					setsuccess("SignUp Successful")
					// await delay(2000);
                    navigate("/")
				}
			} catch (error) {
				setError("Error adding user");
				setLoading(false)
			}
		}
	}

	return (
		<section className="parent">
			<h1>Sign Up</h1>
			<div className="child">
                {error && <div className="error">{error}</div> }
                {success && <div className="success" >{success}</div>}
                {loading && <div className="loading"> Loading...</div>}
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					Retype-Password:
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				<button onClick={handleSubmit}>Signup</button>
				<span className="link">
					Have an account? <Link to="/">Login</Link>
				</span>
			</div>
		</section>
	);
};

export default SignUp;
