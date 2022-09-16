import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";

import "./RegisterForm.css";

const USER_REGEX = /^\w+$/;

export default function RegisterForm() {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState();
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState();
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState();
	const [validConfirmPwd, setValidConfirmPwd] = useState(false);
	const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const REGISTER_URL = "/auth/register";

	// Auto focus when load page for the first time
	useEffect(() => {
		userRef.current.focus();
	}, []);

	// Auto validate username whenever username is changed
	useEffect(() => {
		const result = USER_REGEX.test(username);
		setValidName(result);
	}, [username]);

	// Auto validate password and confirm password
	useEffect(() => {
		const result = password ? password.length >= 6 : false;
		setValidPassword(result);

		const match = password === confirmPassword;
		setValidConfirmPwd(match);
	}, [password, confirmPassword]);

	// Whenever dependencies change, error message will be cleared
	useEffect(() => {
		setErrMsg("");
	}, [username, password, confirmPassword]);

	async function handleSubmit(e) {
		e.preventDefault();

		const v1 = USER_REGEX.test(username);
		const v2 = password ? password.length >= 6 : false;

		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}

		try {
			var response = await axios.post(REGISTER_URL, { username, password });
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response!");
			} else if (err.response?.status === 400) {
				setErrMsg(err.response.data.message + "!");
			} else if (err.response?.status === 500) {
				setErrMsg(err.response.data.message + "!");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus(); // For Screen Reader
		}
	}

	return (
		<section>
			<div className="form-container">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-8 col-10">
						{/* If success full register => go to a section has a link to move to LoginForm */}
						{success ? (
							<Form className="form">
								<h1>Success!</h1>
								<p>
									{/* Router Link here */}
									<Link to="/login">Sign In</Link>
								</p>
							</Form>
						) : (
							<Form className="form" onSubmit={handleSubmit}>
								<h1>Sign up</h1>
								<p>Become our new member</p>

								<Form.Group className="form-group">
									<div ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
										<i
											className="fa-solid fa-circle-info"
											style={{ paddingRight: "5px" }}
										></i>
										{errMsg}
									</div>

									<Form.Control
										ref={userRef}
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
									<div
										className={
											userFocus && username && !validName
												? "instructions"
												: "offscreen"
										}
									>
										<p>
											<i
												className="fa-solid fa-circle-info"
												style={{ paddingRight: "5px" }}
											></i>
											Username is invalid!
										</p>
									</div>

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
									<div
										className={
											passwordFocus && !validPassword
												? "instructions"
												: "offscreen"
										}
									>
										<p>
											<i
												className="fa-solid fa-circle-info"
												style={{ paddingRight: "5px" }}
											></i>
											Use more than 6 characters for your password!
										</p>
									</div>

									<Form.Control
										value={confirmPassword}
										className={validConfirmPwd ? "input" : "input input--error"}
										type="password"
										placeholder="Confirm password"
										required
										onChange={(e) => setConfirmPassword(e.target.value)}
										onFocus={() => {
											setConfirmPasswordFocus(true);
										}}
										onBlur={() => {
											setConfirmPasswordFocus(false);
										}}
									/>

									<div
										className={
											confirmPassword && !validConfirmPwd
												? "instructions"
												: "offscreen"
										}
									>
										<p>
											<i
												className="fa-solid fa-circle-info"
												style={{ paddingRight: "5px" }}
											></i>
											Please confirm your password!
										</p>
									</div>
								</Form.Group>

								<Button
									disabled={
										!validName || !validPassword || !validConfirmPwd
											? true
											: false
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
										<Link to="/login">Sign In</Link>
									</span>
								</p>
							</Form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
