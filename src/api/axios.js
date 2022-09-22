import axios from "axios";

export const api = axios.create({
	baseURL: "https://www.task-manager.api.mvn-training.com",
});

api.interceptors.request.use((requestConfig) => {
	if (localStorage.getItem("user")) {
		const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
		requestConfig.headers = {
			Authorization: `Bearer ${accessToken}`,
		};
		return requestConfig;
	}
    return requestConfig
});

// api.interceptors.response.use(
// 	(response) => {
//         return response
//     }, (err) => {
// 		console.log(err.response.data.error.message)
//         return err.response.data.error.message
//     }
// );
