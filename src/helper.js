const USER_REGEX = /^\w+$/;

const checkPassword = (password) => {
	return password.length >= 6;
};

const checkInputsWhenSubmit = (username, password, setErrMsg) => {
	const v1 = USER_REGEX.test(username);
	const v2 = password ? checkPassword(password) : false;

	if (!v1 || !v2) {
		setErrMsg("Invalid Entry");
		return;
	}
};


export {USER_REGEX, checkPassword, checkInputsWhenSubmit}