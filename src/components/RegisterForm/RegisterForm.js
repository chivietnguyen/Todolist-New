import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { USER_REGEX, checkPassword, checkInputsWhenSubmit } from "../../helper";
import { REGISTER_URL, loginPage } from "../../path";

import "./RegisterForm.css";
import Instruction from "../Instruction/Instruction";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { autoValidateConfirmPassword, autoValidatePassword, autoValidateUsername } from "../../validate";

export default function RegisterForm() {
	const [username, setUsername] = useState();
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState();
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState();
	const [validConfirmPwd, setValidConfirmPwd] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		autoValidateUsername(username, setValidName)
		autoValidatePassword(password, setValidPassword)
		autoValidateConfirmPassword(password, confirmPassword, setValidConfirmPwd)
		// Whenever dependencies change, error message will be cleared
		setErrMsg("");
	}, [username, password, confirmPassword]);

	async function handleSubmit(e) {
		e.preventDefault();
		checkInputsWhenSubmit(username, password, setErrMsg)
		
		try {
			const response = await axios.post(REGISTER_URL, { username, password });
			setSuccess(true);
		} catch (err) {
			setErrMsg(err.response.data.message + "!")
		}
	}

	return (
		<div className="form-container row d-flex align-items-center justify-content-center">
			<div className="col-lg-4 col-md-6 col-sm-8 col-10">
				{/* If success full register => go to a section has a link to move to LoginForm */}
				{success ? (
					<Form className="form">
						<h1>Success!</h1>
						<p>
							{/* Router Link here */}
							<Link to={loginPage}>Sign In</Link>
						</p>
					</Form>
				) : (
					<Form className="form" onSubmit={handleSubmit}>
						<h1>Sign up</h1>
						<p>Become our new member</p>

						<Form.Group className="form-group">
							{errMsg && <ErrorMessage errMsg={errMsg} />}
							<div>
								<Form.Control
									autoFocus
									value={username}
									className={validName ? "input" : "input input--error"}
									type="text"
									placeholder="Enter username"
									autoComplete="off"
									required
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
									required
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

							<div>
								<Form.Control
									value={confirmPassword}
									className={validConfirmPwd ? "input" : "input input--error"}
									type="password"
									placeholder="Confirm password"
									required
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>

								<Instruction
									showInstructionCondition={confirmPassword && !validConfirmPwd}
									instructions="Please confirm your password!"
								/>
							</div>
						</Form.Group>

						<Button
							disabled={
								!validName || !validPassword || !validConfirmPwd ? true : false
							}
							type="submit"
							className="button button--create"
						>
							Sign up
						</Button>
						<p>
							Already registered? <br />
							<span className="line">
								{/* Router Link here */}
								<Link to={loginPage}>Sign In</Link>
							</span>
						</p>
					</Form>
				)}
			</div>
		</div>
	);
}
