function makeTest(){
    window.location.href="./src/pages/login/index.html"
}

const handleLogin = () => {
    try{

        var currentUser = JSON.parse(sessionStorage.getItem('user')).username
        console.log(currentUser)
        if(currentUser != null){
            document.querySelector('#login-button').style.visibility = "hidden";
            document.querySelector('#logout').style.visibility = "visible";
            document.querySelector('#user-name').innerHTML = `Welcome ${capitalizeFirstLetter(currentUser)}`
        }  
    }catch{
        console.log('no user logged in!')
    }
}

const handleLogout = () => {
    document.querySelector('#login-button').style.visibility = "visible";
    document.querySelector('#logout').style.visibility = "hidden";
    document.querySelector('#user-name').innerHTML = '';
    sessionStorage.clear();
    window.location.href="/";
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
