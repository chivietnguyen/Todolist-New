export const USER_REGEX = /^\w+$/;

export const checkPassword = (password) => {
    return password.length >= 6
}