import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

import "./LoginForm.css";

export default function LoginForm() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	function signIn(e) {
		e.preventDefault();
	}

	return (
		<div className="login-container">
			<div className="row d-flex align-items-center justify-content-center">
				<div className="col-lg-4 col-md-6 col-sm-8 col-10">
					<Form className="form" onSubmit={signIn}>
						<h1>Sign In</h1>
						<p>Sign in and start managing your future!</p>

						<Form.Group className="form-group">
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
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						<Button type="submit" className="button">
							Sign In
						</Button>

						<Button type="submit" className="button button--create">
							Create new account
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
