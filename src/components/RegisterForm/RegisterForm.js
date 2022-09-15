import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "../../api/axios";

import "./RegisterForm.css";

export default function RegisterForm() {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const REGISTER_URL = '/auth/AuthController_register'

	async function signUp(e) {
		e.preventDefault();

		const info = {username, password}
		console.log(info)

		try {
			const response = await axios.post(REGISTER_URL, info)
			console.log(response)
		} 
		catch(err) {
			alert(err.message)
		}
	}

	return (
		<div className="login-container">
			<div className="row d-flex align-items-center justify-content-center">
				<div className="col-lg-4 col-md-6 col-sm-8 col-10">
					<Form className="form" onSubmit={signUp}>
						<h1>Sign up</h1>
						<p>Become our new member</p>

						<Form.Group className="form-group">
							<Form.Control
								value={username}
								className="input"
								type="text"
								placeholder="Enter username"
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Form.Control
								value={email}
								className="input"
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Control
								value={password}
								className="input"
								type="password"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Button type="submit" className="button button--create">
							Sign up
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
