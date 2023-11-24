function login(){
    event.preventDefault();
    var username = document.getElementById("textBoxUserName").value
    var password =document.getElementById("textBoxPassword").value
    var user = {username:username, password: password}

    sessionStorage.setItem("user", user);
    
    //we can add a validation for the username
    if(password === sessionStorage.getItem("generatedPassword")){
        console.log("deu match")
        window.location.href="../test-form/index.html"
    }
}  

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",
        password = "";
    for (var i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("textBoxPassword").value = password;
    sessionStorage.setItem("generatedPassword", password)
    return password;
}

