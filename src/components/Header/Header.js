import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import { loginPage } from "../../path";

import "./Header.css";

export default function Header() {
	const username = JSON.parse(localStorage.getItem("user"))?.username || "";
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate(loginPage, {replace: true});
	};

	return (
		<div className="header-container d-flex align-items-center justify-content-between">
			<div className="header--logo">
				<Link to={localStorage.getItem("user") ? "/home" : "/login"}>Todos</Link>
			</div>

			{username && (
				<Navbar username={username} handleLogout={handleLogout} navigate={navigate}/>
			)}
		</div>
	);
}
