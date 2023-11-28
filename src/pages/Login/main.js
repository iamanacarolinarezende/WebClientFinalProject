function login(){
    event.preventDefault();
    var username = document.getElementById("textBoxUserName").value
    var password =document.getElementById("textBoxPassword").value
    var user = JSON.stringify({username:username, password: password})
    //save the user and password on session storage
    sessionStorage.setItem("user", user);
    //validate if the user name contains any value
    if (username.length !== 0 ){
        //validate if the password matchs with the one on sessionStorage
        if(password === sessionStorage.getItem("generatedPassword")){
            handleLogin()
            window.location.href="../test-form/index.html"
        }
    }else{ alert("Validate User name!")}
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

