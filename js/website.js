//^ Signup form inputs
var emailInput = document.getElementById("SignupEmail");
var passwordInput = document.getElementById("SignupPassword");
var nameInput = document.querySelector("#SignupName");
var signupButton = document.querySelector(".btn-signup");
var errorName=document.querySelector(".errorName");
var errorEmail=document.querySelector(".errorEmail");
var errorPassword=document.querySelector(".errorPassword");


//^ login form inputs
var loginButton = document.querySelector(".btn-login");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var errorLogin = document.querySelector(".errorLogin");


var inputArray=JSON.parse(localStorage.getItem("inputArray")) || [];

document.addEventListener("input",function(e){
    if(e.target === nameInput){
        regex(regexPatterns.nameRegex,nameInput);
    }
    else if(e.target === emailInput){
        regex(regexPatterns.emailRegex,emailInput);
    }   
    else if(e.target === passwordInput){
        regex(regexPatterns.passwordRegex,passwordInput);
    }
})

function input(){
    if(regex(regexPatterns.nameRegex,nameInput)
    & regex(regexPatterns.emailRegex,emailInput)
    & regex(regexPatterns.passwordRegex,passwordInput)){

        var isValid=inputArray.find(function(item){
            return item.email === emailInput.value;
        })
        if(isValid){

            emailInput.classList.add("is-invalid"); 
            emailInput.classList.remove("is-valid");

            errorEmail.classList.add("is-invalid"); 
            errorEmail.classList.remove("is-valid");
            errorLogin.classList.replace("d-none","d-block");
            errorLogin.classList.remove("d-none");
            return;
        }

        var inputs={
            name:nameInput.value,
            email:emailInput.value,
            password:passwordInput.value
    }

    //^ push to array
    inputArray.push(inputs);

    //^ store in local storage
    localStorageFunction();

    //^ reset form
    resetSignup();
    
}

}

if(signupButton){
    signupButton.addEventListener("click",input);
}

function localStorageFunction(){
    localStorage.setItem("inputArray",JSON.stringify(inputArray));
}

function resetSignup(){
    emailInput.value = "";
    passwordInput.value = "";
    nameInput.value = "";

    [nameInput, emailInput, passwordInput].forEach(function(input){
        input.classList.remove("is-valid", "is-invalid");
    });
    
    [errorName, errorEmail, errorPassword].forEach(function(error){
        error.classList.replace("d-block","d-none");
        error.classList.add("d-none"); 
    });

    errorEmail.textContent="Email already registered.";
}


var regexPatterns = {
    nameRegex:/^[A-Z][a-z \s]{2,}$/,
    emailRegex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordRegex:/^(?=.*\d)[A-Za-z\d]{8,}$/

}

function regex(pattern,inputField){
    if(pattern.test(inputField.value)){
        inputField.classList.add("is-valid");
        inputField.classList.remove("is-invalid");
        inputField.nextElementSibling.classList.replace("d-block","d-none");
        return true;
    }
    else{
        inputField.classList.add("is-invalid");
        inputField.classList.remove("is-valid");
        inputField.nextElementSibling.classList.replace("d-none","d-block");
        return false;
    }
}




//^ login function

function loginInput(){

    var inputs={
        email:loginEmail.value,
        password:loginPassword.value
    }
    
    //^ check
    var found=inputArray.find(function(item){
        return item.email === inputs.email && item.password === inputs.password;
    });

    if(found){
        localStorage.setItem("loggedInUser", found.name);
        window.location.href = "/login.html"; 
    }else{
        errorLogin.classList.replace("d-none", "d-block");
        errorLogin.classList.remove("d-none");
    }

    resetLogin();
}

if(loginButton){
    loginButton.addEventListener("click",loginInput);
}

function resetLogin(){
    loginEmail.value = "";
    loginPassword.value = "";
}

function display(){
    var userName = localStorage.getItem("loggedInUser");
    if(userName){
        var data=`<h1 class="text-center mx-auto shadow-lg w-75 m-5 p-5 h1">welcome ${userName}</h1>`;
        document.body.innerHTML+=data;
    }
}
if(window.location.pathname.includes("/login.html")){
    display();
}

document.addEventListener("DOMContentLoaded",function(){
    var btnlogout=document.querySelector(".btn-logout")
    if(btnlogout){
    btnlogout.addEventListener("click",function(){
            localStorage.removeItem("loggedInUser");
            window.location.href = "/index.html"; 
        })
    }
})