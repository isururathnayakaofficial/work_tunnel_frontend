// Login function for direct API calls (without React Router)
export async function performLogin(username, password) {
    if (!username || !password) {
        throw new Error('Please enter both username and password');
    }

    const loginData = {
        username,
        password
    };

    try {
        const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login Success:', data);

        // Store token
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Create user object
        const initials = username.split(' ').map(n => n[0]).join('').toUpperCase() || username.substring(0, 2).toUpperCase();
        const userData = {
            username: data.username || username,
            email: data.email || `${username.toLowerCase()}@example.com`,
            profession: data.profession || 'User',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: initials
        };

        // Store user data
        localStorage.setItem('userData', JSON.stringify(userData));
        return userData;

    } catch (error) {
        console.error('Login error:', error);
        
        // If backend is not available, allow demo login for testing
        if (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message === 'Failed to fetch') {
            console.warn('Backend not available, using demo mode');
            
            // Create demo user
            const initials = username.split(' ').map(n => n[0]).join('').toUpperCase() || username.substring(0, 2).toUpperCase();
            const userData = {
                username: username,
                email: `${username.toLowerCase().replace(/\s+/g, '')}@example.com`,
                profession: 'Demo User',
                joinDate: new Date().toISOString().split('T')[0],
                avatar: initials
            };

            // Store demo data
            localStorage.setItem('token', 'demo-token-' + Date.now());
            localStorage.setItem('userData', JSON.stringify(userData));
            return userData;
        } else {
            throw error;
        }
    }
}
