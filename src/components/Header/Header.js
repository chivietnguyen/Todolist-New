import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import { loginPage, homePage } from "../../path";

import "./Header.css";

export default function Header() {
	const username = JSON.parse(localStorage.getItem("user"))?.username || "";
	const navigate = useNavigate();

	const handleLogout = async () => {
		localStorage.clear();
		navigate(loginPage);
	};

	return (
		<div className="header-container d-flex align-items-center justify-content-between">
			<div className="header--logo">
				<Link to={localStorage.getItem("user") ? homePage : loginPage}>Todos</Link>
			</div>

			{username && (
				<Navbar username={username} handleLogout={handleLogout} navigate={navigate}/>
			)}
		</div>
	);
}
