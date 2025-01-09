


function onSumit(event) {

    event.preventDefault();

    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    console.log(email);
    console.log(password);

    const user = {
        email: email,
        password: password
    }

    fetch("http://localhost:4000/login",{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json()) 
      .then(data => {
        alert(data.message); 
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Login failed! Please try again.");
    });

}