import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { loginPage } from "../../path";

import "./Header.css";

export default function Header() {
	const username = JSON.parse(localStorage.getItem("user"))?.username || "";

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate(loginPage);
	}

	return (
		<div className="header-container d-flex align-items-center justify-content-between">
			<div className="header--logo">
				<Link to="/">Todos</Link>
			</div>

			{username && (
				<div className="d-flex align-items-center justify-content-between">
					<div
						style={{ marginRight: "20px" }}
						className="user--display d-flex align-items-center justify-content-between"
					>
						<div className="cat-avatar" style={{ marginRight: "10px" }}>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
								alt="cat-avatar"
							/>
						</div>
						<div className="username">
							<p>{username}</p>
							<div className="edit-delete__container">
								<div>
									<Button onClick={() => navigate('/edit-profile')} className="edit-profile__btn d-flex justify-content-start align-items-center">
										<i className="fa-solid fa-user-pen"></i>
										Edit your profile
									</Button>
								</div>

								<div>
									<Button className="delete-account__btn d-flex justify-content-start align-items-center">
										<i className="fa-solid fa-trash"></i>
										Delete account
									</Button>
								</div>
							</div>
						</div>
					</div>

					<Button onClick={handleLogout} className="btn--logout">
						Log Out
					</Button>
				</div>
			)}
		</div>
	);
}
