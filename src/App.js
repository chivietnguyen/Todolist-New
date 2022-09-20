import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Home from "./components/Home/Home";
import EditProfileName from "./components/EditProfile/EditProfileName";
import { loginPage, registerPage, homePage, editProfileName } from "./path";

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
						localStorage.getItem("user") ? <Navigate to={homePage} /> : <Navigate to="/login" />
					}
				/>
				<Route path={registerPage} element={<RegisterForm />} />
				<Route path={loginPage} element={<LoginForm />} />
				<Route path={homePage} element={<Home />} />
				<Route path={editProfileName} element={<EditProfileName />}/>
			</Routes>
		</div>
	);
}

export default App;
