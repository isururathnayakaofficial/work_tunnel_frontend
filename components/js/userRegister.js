import { registerUser, setSession } from './authService';

// Register function using authService (localStorage-based authentication)
export const userRegister = async (e, signupData) => {
  e.preventDefault();

  console.log("Signup Data:", signupData);

  try {
    // Validate required fields
    if (!signupData.name || !signupData.email || !signupData.password) {
      alert("Please fill in all required fields ❌");
      throw new Error('Missing required fields');
    }

    // Register user using authService
    const newUser = registerUser({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      role: 'user',
      adminKey: ''
    });

    // Set session for newly registered user
    const session = setSession(newUser);
    
    alert("User registered successfully ✅");
    console.log("Registered user:", newUser);
    console.log("Session:", session);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed: " + error.message + " ❌");
    throw error;
  }
};

// Alternative function for form-based registration
export const registerUserFromForm = async (formData) => {
  try {
    if (!formData.name || !formData.email || !formData.password) {
      throw new Error('Name, email, and password are required');
    }

    const newUser = registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'user',
      adminKey: ''
    });

    setSession(newUser);
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};