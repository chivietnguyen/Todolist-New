import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "../../api/axios";
import { USER_REGEX, checkPassword } from "../../helper";
import { LOGIN_URL, registerPage } from "../../path";

import "./LoginForm.css";

export default function LoginForm() {
	const [username, setUsername] = useState();
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState();
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	// Auto validate username whenever username is changed
	useEffect(() => {
		const result = USER_REGEX.test(username);
		setValidName(result);
	}, [username]);

	// Auto validate password and confirm password
	useEffect(() => {
		const result = password ? checkPassword(password) : false;
		setValidPassword(result);
	}, [password]);

	// Whenever dependencies change, error message will be cleared
	useEffect(() => {
		setErrMsg("");
	}, [username, password]);

	async function handleSubmit(e) {
		e.preventDefault();

		const v1 = USER_REGEX.test(username);
		const v2 = password ? checkPassword(password) : false;

		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}

		try {
			var response = await axios.post(LOGIN_URL, { username, password });

			// When Login, save JWT to LocalStorage
			localStorage.setItem(
				"user",
				JSON.stringify({ username, accessToken: response.data.token })
			);

			// Then navigate to home page
			navigate('/home');

			// setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response!");
			} else if (err.response?.status === 400) {
				setErrMsg(err.response.data.message + "!");
			} else if (err.response?.status === 500) {
				setErrMsg(err.response.data.message + "!");
			} else {
				setErrMsg("Login Failed");
			}
		}
	}

	return (
		<section>
			<div className="form-container">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-8 col-10">
						<Form className="form" onSubmit={handleSubmit}>
							<h1>Sign in</h1>
							<p>Sign in and start managing your life!</p>

							<Form.Group className="form-group">
								<div className={errMsg ? "errmsg" : "offscreen"}>
									<i
										className="fa-solid fa-circle-info"
										style={{ paddingRight: "5px" }}
									></i>
									{errMsg}
								</div>

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
									{/* Router Link here */}
									<Link to={registerPage}>Sign Up</Link>
								</span>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
}
