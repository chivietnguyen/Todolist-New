import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Instruction from "../Instruction/Instruction";
import axios from "../../api/axios";
import { USER_REGEX, checkPassword, checkInputsWhenSubmit } from "../../helper";
import { LOGIN_URL, registerPage, homePage } from "../../path";
import { autoValidatePassword, autoValidateUsername } from "../../validate";

import "./LoginForm.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function LoginForm() {
	const [username, setUsername] = useState();
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState();
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		autoValidateUsername(username, setValidName);
		autoValidatePassword(password, setValidPassword);
		// Whenever dependencies change, error message will be cleared
		setErrMsg("");
	}, [username, password]);

	async function handleSubmit(e) {
		e.preventDefault();
		checkInputsWhenSubmit(username, password, setErrMsg);

		try {
			const response = await axios.post(LOGIN_URL, { username, password });
			const userInfo = {
				username,
				accessToken: response.data.token,
				id: response.data.id,
			};
			localStorage.setItem("user", JSON.stringify(userInfo));
			navigate(homePage);
		} catch (err) {
			setErrMsg(err.response.data.message + "!");
		}
	}

	return (
		<div className="form-container row d-flex align-items-center justify-content-center">
			<div className="col-lg-4 col-md-6 col-sm-8 col-10">
				<Form className="form" onSubmit={handleSubmit}>
					<h1>Sign in</h1>
					<p>Sign in and start managing your life!</p>

					<Form.Group className="form-group">
						{errMsg && <ErrorMessage errMsg={errMsg} />}
						<div>
							<Form.Control
								autoFocus
								value={username}
								className={validName ? "input" : "input input--error"}
								type="text"
								placeholder="Enter username"
								onChange={(e) => setUsername(e.target.value)}
								onFocus={() => {
									setUserFocus(true);
								}}
								onBlur={() => {
									setUserFocus(false);
								}}
							/>
							{/* if username input make error => show instruction */}
							<Instruction
								showInstructionCondition={userFocus && username && !validName}
								instructions="Username is invalid!"
							/>
						</div>

						<div>
							<Form.Control
								value={password}
								className={validPassword ? "input" : "input input--error"}
								type="password"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => {
									setPasswordFocus(true);
								}}
								onBlur={() => {
									setPasswordFocus(false);
								}}
							/>
							{/* if password input make error => show instruction */}
							<Instruction
								showInstructionCondition={passwordFocus && !validPassword}
								instructions="Use more than 6 characters for your password!"
							/>
						</div>
					</Form.Group>

					<Button
						disabled={!validName || !validPassword ? true : false}
						type="submit"
						className="button"
					>
						Sign In
					</Button>
					<p style={{ marginTop: "15px" }}>
						Already registered? <br />
						<span className="line">
							<Link to={registerPage}>Sign Up</Link>
						</span>
					</p>
				</Form>
			</div>
		</div>
	);
}
