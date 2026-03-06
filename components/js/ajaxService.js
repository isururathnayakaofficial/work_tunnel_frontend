export function ajaxService() {

    const url = "http://localhost:8080/auth/register";

    const data = {
        name: document.getElementById("signup-name").value,
        profession: document.getElementById("signup-profession").value,
        password: document.getElementById("signup-password").value,
        email: document.getElementById("signup-email").value,
        age: parseInt(document.getElementById("signup-age").value)
    };
    console.log("Data to be sent:", data);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {

        const text = await response.text();   // read raw response

        if (!text) {
            console.log("User registered successfully (empty response)");
            return;
        }

        const result = JSON.parse(text);
        console.log("Success:", result);

    })
    .catch(error => {
        console.error("Error:", error);
    });
}