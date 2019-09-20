$(document).ready(function () {
$('#sign-in').submit(e => {
    e.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()

    $.ajax({
        url: `http://localhost:3000/sign?email=${email}`,
        method: 'get',
    }).done(data => {
        console.log(data[0].password)
        if(password == data[0].password) {
            sessionStorage.setItem("log", data[0].id)
            window.location = "home.html"
        } else {
            alert("Wrong Email or Password")
        }
    })
})

$('#logout').on('click', () => {
    sessionStorage.removeItem("log")
})

})
