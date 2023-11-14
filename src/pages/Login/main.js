function login(){
    //document.getElementById("passerror").innerText="";
    event.preventDefault();
   var username = document.getElementById("textBoxUserName").value
   var password =document.getElementById("textBoxPassword").value
   var user = {username:username,
    password: password,
      }
    //  if(password.length<8 || password.charAt(0)!== )
          // Save the data in the browser's sessionStorage
sessionStorage.setItem("user", user);
    // Save the data in the browser's LocalStorage
//var users = []
//users.push(user)
//localStorage.setItem("users",JSON.stringify(users));
window.location.href = "Home.html"
document.write(user.username,user.password)
}  

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",
        password = "";
    for (var i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("textBoxPassword").value = password;
    return password;
}

