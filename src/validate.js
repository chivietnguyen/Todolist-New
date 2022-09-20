import { USER_REGEX } from "./helper";
import { checkPassword } from "./helper";

const autoValidateUsername = (username, setValid) => {
	const usernameResultCheck = USER_REGEX.test(username);
	setValid(usernameResultCheck);
};

const autoValidatePassword = (password, setValid) => {
	const passwordResultCheck = password ? checkPassword(password) : false;
	setValid(passwordResultCheck);
};

const autoValidateConfirmPassword = (password, confirmPassword, setValid) => {
	const match = password === confirmPassword
	setValid(match);
};

export {autoValidatePassword, autoValidateUsername, autoValidateConfirmPassword}
