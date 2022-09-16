import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Header.css";

export default function Header() {
	
	const username = JSON.parse(localStorage.getItem("user"))?.username || '';
	
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.clear();
		navigate("/login");
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

						<p className="username">{username}</p>
					</div>

					<Button onClick={handleLogout} className="btn--logout">
						Log Out
					</Button>
				</div>
			)}
		</div>
	);
}
