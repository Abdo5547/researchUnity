// djoser api

import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/';

export const registerUser = (userData) => axios.post(`${API_URL}users/`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}jwt/create/`, userData);

export const requestPasswordReset = (email) => axios.post(`${API_URL}users/reset_password/`, { email });

export const resetPassword = (uid, token, newPassword) => axios.post(`${API_URL}users/reset_password_confirm/`, {
    uid,
    token,
    new_password: newPassword
});

export const changePassword = (token, password) => axios.post(`${API_URL}users/set_password/`, password, {
    headers: { Authorization: `JWT ${token}` }
});

export const activateAccount = (uid, token) => axios.post(`${API_URL}users/activation/`, { uid, token });

export const getCurrentUser = (token) => axios.get(`${API_URL}users/me/`, {
    headers: { Authorization: `JWT ${token}` }
});

export const updateCurrentUser = (token, userData) => axios.put(`${API_URL}users/me/`, userData, {
    headers: { Authorization: `JWT ${token}` }
});

export const deleteUser = (token) => axios.delete(`${API_URL}users/me/`, {
    headers: { Authorization: `JWT ${token}` }
});



