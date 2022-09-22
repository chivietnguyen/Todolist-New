import { Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Home from "./components/Home/Home";
import EditProfile from "./components/EditProfile/EditProfileName";
import { loginPage, registerPage, homePage, editProfile } from "./path";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";

function App() {
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (!localStorage.getItem("user")) {
	// 		navigate(loginPage || registerPage);
	// 	} else {
	// 		navigate(homePage || editProfileName);
	// 	}
	// }, []);

	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						localStorage.getItem("user") ? <Home /> : <Navigate to={loginPage} />
					}
				/>
				<Route path={loginPage} element={ <LoginForm />} />
				<Route path={registerPage} element={ <RegisterForm />} />
				<Route path={homePage} element={<Home />} />
				<Route path={editProfile} element={<EditProfile />} />

			</Routes>
		</div>
	);
}

export default App;
