// userRegister.js

export const userRegister = async (e, signupData) => {
  e.preventDefault();

  // Convert age to number
  const payload = {
    ...signupData,
    age: parseInt(signupData.age)
  };

  console.log("Sending JSON:", payload);

  try {
    const response = await fetch("http://localhost:8081/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      alert("User registered successfully ✅");
      console.log(data);
    } else {
      const errorText = await response.text();
      alert("Registration failed ❌");
      console.error(errorText);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error ⚠️");
  }
};