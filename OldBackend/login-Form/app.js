

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const toastLiveExample = document.getElementById('liveToast')
const toastBody = document.querySelector(".toast-body");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");


function changeEmail(){
    emailError.textContent = "";
    emailInput.classList.remove("border-danger");
}

function changePassword(){
    passwordError.textContent = "";
    passwordInput.classList.remove("border-danger");
}


function onSubmit(event) {

    event.preventDefault();

    emailError.textContent = "";
    emailInput.classList.remove("border-danger");

    passwordError.textContent = "";
    passwordInput.classList.remove("border-danger");

    const email = emailInput.value;
    const password = passwordInput.value;

    let isValid = true;

    if (!email) {
        emailInput.classList.add("border-danger");
        emailError.textContent = "Please enter the email.";
        isValid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add("border-danger");
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (!password) {
        passwordInput.classList.add("border-danger");
        passwordError.textContent = "Please enter the password.";
        isValid = false;

    } else if (password.length < 8) {
        passwordInput.classList.add("border-danger");
        passwordError.textContent = "Password must be at least 8 characters long.";
        isValid = false;

    }

    if(!isValid){
        return
    }

    const user = {
        email: email,
        password: password
    }


    fetch("http://localhost:4000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
        .then(data => {

            if (data.message) {

                toastBody.innerHTML = data.message;
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()

            }
            else {
                localStorage.setItem("userName", data.userName);
                window.location.href = "profile.html";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Login failed! Please try again.");
        });

}