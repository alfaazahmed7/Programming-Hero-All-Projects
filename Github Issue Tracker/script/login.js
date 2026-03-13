document.getElementById("login-btn")
    .addEventListener("click", () => {
        const inputUsername = document.getElementById("input-username");
        const usernameValue = inputUsername.value;
        const inputPassword = document.getElementById("input-password");
        const passwordValue = inputPassword.value;
        console.log(passwordValue);

        if (usernameValue === "admin" && passwordValue === "admin123") {
            alert("Login Successful");
            window.location.assign("./issues-tracker.html");
        }
        else {
            alert("Login Failed")
            return;
        }
    });