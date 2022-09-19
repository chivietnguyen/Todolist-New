import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Home from "./components/Home/Home";
import EditProfile from "./components/EditProfile/EditProfile";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						localStorage.getItem("user") ? <Navigate to="/home" /> : <Navigate to="/login" />
					}
				/>
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/home" element={<Home />} />
				<Route path="/edit-profile" element={<EditProfile />}/>
			</Routes>
		</div>
	);
}

export default App;
