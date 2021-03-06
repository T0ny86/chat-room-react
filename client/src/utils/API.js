import axios from 'axios'

export const URL = "http://localhost:5000"

const server = axios.create({
    baseURL: URL
})

export default server

export const signupRoute = `${URL}/api/auth/signup`
export const loginRoute = `${URL}/api/auth/login`
export const logoutRoute = `${URL}/api/auth/logout`
export const setAvatarRoute = `${URL}/api/auth/setAvatar`;
export const allUsersRoute = `${URL}/api/auth/allusers`;
export const sendMessageRoute = `${URL}/api/messages/addmsg`;
export const recieveMessageRoute = `${URL}/api/messages/getmsg`;