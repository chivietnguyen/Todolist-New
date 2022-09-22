import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { homePage, loginPage, userUrl } from "../../path";
import { api } from "../../api/axios";
import { checkInputsWhenSubmit } from "../../helper";
import { autoValidateUsername, autoValidatePassword } from "../../validate";

import "./EditProfileName.css";
import Instruction from "../Instruction/Instruction";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function EditProfile() {
	const navigate = useNavigate();

	const [newUsername, setNewUsername] = useState();
	const [validNewUsername, setValidNewUsername] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [newPassword, setNewPassword] = useState();
	const [validNewPassword, setValidNewPassword] = useState(false);
	const [newPasswordFocus, setNewPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		autoValidateUsername(newUsername, setValidNewUsername);
		autoValidatePassword(newPassword, setValidNewPassword);
		// Whenever dependencies change, error message will be cleared
		setErrMsg("");
	}, [newUsername, newPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		checkInputsWhenSubmit(newUsername, newPassword, setErrMsg);

		const userId = JSON.parse(localStorage.getItem("user")).id;

		try {
			await api.patch(userUrl(userId), { username: newUsername, newPassword })
					.then(response => console.log(response));
			localStorage.clear()
			alert("Update profile successfully!");
			navigate(loginPage);
		} catch (err) {
			console.log(err)
			setErrMsg(err.response.data.error.message + "!");
		}
	};

	return (
		<div className="form-container row d-flex align-items-center justify-content-center">
			<div className="col-lg-4 col-md-6 col-sm-8 col-10">
				<Form className="form" onSubmit={handleSubmit}>
					<h1>Edit Profile</h1>
					<p>Update your profile!</p>

					<Form.Group className="form-group">
						{errMsg && <ErrorMessage errMsg={errMsg} />}
						<div>
							<Form.Control
								autoFocus
								value={newUsername}
								className={validNewUsername ? "input" : "input input--error"}
								type="text"
								placeholder="Enter new username"
								autoComplete="off"
								required
								onChange={(e) => setNewUsername(e.target.value)}
								onFocus={() => {
									setUserFocus(true);
								}}
								onBlur={() => {
									setUserFocus(false);
								}}
							/>
							{/* if username input make error => show instruction */}
							<Instruction
								showInstructionCondition={
									userFocus && newUsername && !validNewUsername
								}
								instructions="Username is invalid!"
							/>
						</div>

						<div>
							<Form.Control
								value={newPassword}
								className={validNewPassword ? "input" : "input input--error"}
								type="password"
								placeholder="Enter password"
								required
								onChange={(e) => setNewPassword(e.target.value)}
								onFocus={() => {
									setNewPasswordFocus(true);
								}}
								onBlur={() => {
									setNewPasswordFocus(false);
								}}
							/>
							{/* if password input make error => show instruction */}
							<Instruction
								showInstructionCondition={newPasswordFocus && !validNewPassword}
								instructions="Use more than 6 characters for your password!"
							/>
						</div>
					</Form.Group>

					<Button
						disabled={!validNewUsername || !validNewPassword ? true : false}
						type="submit"
						className="button button--create"
					>
						Save changes
					</Button>
				</Form>
			</div>
		</div>
	);
}
