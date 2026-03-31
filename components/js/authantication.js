// Authentication utilities and helper functions
// This file provides compatibility and additional auth utilities

import { 
  loginUser, 
  registerUser, 
  setSession, 
  getSession, 
  clearSession, 
  getCurrentUser, 
  logoutUser 
} from './authService';

// Auth helper functions
export const isUserLoggedIn = () => {
  return getCurrentUser() !== null;
};

export const hasValidSession = () => {
  const session = getSession();
  return session && session.id && session.email;
};

export const getUserInfo = () => {
  return getCurrentUser();
};

export const logUserOut = () => {
  logoutUser();
};

export const authenticateUser = (email, password) => {
  return loginUser(email, password);
};

export const createNewUser = (userData) => {
  return registerUser({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    adminKey: userData.adminKey || ''
  });
};

// Re-export all functions from authService for convenience
export {
  loginUser,
  registerUser,
  setSession,
  getSession,
  clearSession,
  getCurrentUser,
  logoutUser
};
