import React from "react";
import { Button } from "react-bootstrap";
import { api } from "../../api/axios";
import { loginPage, userUrl, editProfile } from "../../path";

import "./Navbar.css";

export default function Navbar({ username, handleLogout, navigate }) {
    const handleDeleteAccount = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        
        try {
            const response = await api.delete(userUrl(userId), { headers: {"Authorization" : `Bearer ${token}`}})
            localStorage.clear()
            navigate(loginPage)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

	return (
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
							<Button
								onClick={() => navigate(editProfile)}
								className="edit-profile__btn d-flex justify-content-start align-items-center"
							>
								<i className="fa-solid fa-user-pen"></i>
								Edit your profile
							</Button>
						</div>

						<div>
							<Button onClick={handleDeleteAccount} className="delete-account__btn d-flex justify-content-start align-items-center">
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
	);
}
