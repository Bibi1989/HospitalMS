
let singIn = document.querySelector("#sign-in")
let reg = document.querySelector("#reg")

singIn.addEventListener("submit", getData)
reg.addEventListener("submit", postData)


function getData(e) {
    e.preventDefault()
    let emailLogin = document.querySelector("#email-login").value
    let passwordLogin = document.querySelector("#password-login").value
    let url = "http://localhost:3000/sign"
    console.log(url, emailLogin, passwordLogin)
    fetch(url).then((res) => res.json()).then(data => {
        console.log(data.email)
        data.forEach(a => {
            if(emailLogin == a.email && passwordLogin == a.password) {
                sessionStorage.setItem("sign", a.email)
                window.location = "home.html"
                alert("Sign in!!!")
                } else {
                window.location = "index.html"
                alert("Wrong email or password")
                }
        })
    })
}

function postData(e) {
    e.preventDefault()
    let url = "http://localhost:3000/sign"
    let name = document.getElementById("name-reg").value
    let email = document.getElementById("email-reg").value
    let password = document.getElementById("password-reg").value
    console.log(name, email, password)
    // let confirmPassword = document.querySelector("#passwordc-reg").value
            fetch(url).then(res => res.json()).then(data => {
              const user = data.some(user=> user.email == email)
              if(user) return

              fetch(url, {
                  method: "post",
                  header: {
                      'Accept': 'application/json, plain/text, */*',
                      'content-type': 'apllication/json'
                  },
                  body: JSON.stringify({name, email, password})
              }).then(res => res.json()).then(data => {
                  alert(`${data.name} Added`)
                  window.location = "index.html"
                })
            })
        
}
