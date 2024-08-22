import React, { useState } from "react";
import { Await, Link,useNavigate } from "react-router-dom";
import { AuthenticateUser } from "../lib/user.controller";
import("./Login.css");
const Login = () =>
{
    const navigate = useNavigate();
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const handleLogin = async (email, password) => 
    {
        if (email.length === 0 || password.length === 0)
        {
            setError("Empty Fields")
        }
        else
        {    
            const lowerCaseEmail=email.toLowerCase();
            setLoading(true)
            setError("")
            const user = await AuthenticateUser(lowerCaseEmail, password);
            setLoading(false);
            if (user) {
                console.log(user);
                localStorage.setItem("user_id", user.id);
                navigate("/todo")
            }
            else {
                setError("Credentials Error")
            }
		}
	};
	return (
		<section className="parent">
			<h1>Login</h1>
            <div className="child">
            {error && <div className="error">{error}</div> }

                {loading && <div className="loading"> Loading...</div>}
				<label>
					Email:
					<input
						type="email"
						value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
					/>
				</label>
				<button onClick={() => handleLogin(email, password)}>Login</button>
				<span className="signUp">
					Don't have an account? <Link to="/signup">SignUp</Link>{" "}
				</span>
			</div>
		</section>
	);
};

export default Login;
