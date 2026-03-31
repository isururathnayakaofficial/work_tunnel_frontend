import { loginUser } from './authService';

// Login function using authService (localStorage-based authentication)
export async function performLogin(email, password) {
    if (!email || !password) {
        throw new Error('Please enter both email and password');
    }

    try {
        // Use the authService to login
        const user = loginUser(email, password);
        console.log('Login Success:', user);
        return user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Alternative function for backward compatibility
export async function performLoginWithUsername(username, password) {
    if (!username || !password) {
        throw new Error('Please enter both username and password');
    }

    try {
        // Use the authService to login (treat username as email)
        const user = loginUser(username, password);
        console.log('Login Success:', user);
        return user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
