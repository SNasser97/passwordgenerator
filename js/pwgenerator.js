"use strict";
// I know there might be a more simpler way of doing 
// this but this was the best I could come up with

// DOM Declarations
let passwordField = document.querySelector(".form__pwfield");
let copyBtn = document.querySelector(".btn-copy");
let generateBtn = document.querySelector(".btn-generate"); // password generate

let passwordLength = document.querySelector(".form__pwlength");

let incNumber = document.querySelector("#hasNumber");
let incSymbol = document.querySelector("#hasSymbol");
let incUppercase = document.querySelector("#hasUppercase");
let incLowercase = document.querySelector("#hasLowercase");
// Alert
let alertMsg = document.querySelector(".form__warning");


generateBtn.addEventListener("click", ()=> {
	generateOutput();
})

copyBtn.addEventListener("click", ()=> {
	if(checkPasswordField(passwordField)) {
		alertMsg.firstChild.textContent = "Copied!";
		alertMsg.firstChild.style.color = "rgb(228, 251, 0)";
	} else {
		alertMsg.firstChild.style.color = "#d80000";
		alertMsg.firstChild.textContent = "Nothing to copy!";
	}
	
});

function generateOutput() {
	// if invalid then clear the passwordField;
	alertMsg.firstChild.style.color = "#d80000";
	if(checkPassWordLength(passwordLength) && checkOptions(incNumber, incSymbol, incUppercase, incLowercase)) {
		// alert("Option or password length is invalid");
		alertMsg.firstChild.textContent = "Option or password length is invalid";
		passwordField.setAttribute("value", "");
	} else if(checkPassWordLength(passwordLength)) {
		// alert("Password length is must be from 6 to 30 max");
		alertMsg.firstChild.textContent = "Must be from 6 to 16 max";
		passwordField.setAttribute("value", "");
	} else if(checkOptions(incNumber, incSymbol, incUppercase, incLowercase)) {
		// alert("An option needs to selected");
		alertMsg.firstChild.textContent = "An option needs to selected";
		passwordField.setAttribute("value", "");
	} else {
		passwordField.setAttribute("value", generatePassword());
		alertMsg.firstChild.textContent = "";
	}
}


////// MAIN FUNCTION 
function generatePassword() {
	const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const charsLower = charsUpper.toLowerCase();
	const symbols = "@%+\\/'!#$^?:,(){}[]~_&|<>`=";
	const numbers = "0123456789";
	let password = "";
	
	// WHERE incNum etc. is DOM elem
	 return password = 
	 	allOptions(incNumber,incSymbol,incUppercase,incLowercase, numbers, symbols, charsUpper, charsLower)

	 || threeOption(incNumber, incSymbol, incUppercase, numbers, symbols, charsUpper)
	 || threeOption(incNumber, incSymbol, incLowercase, numbers, symbols, charsLower)
	 || threeOption(incNumber, incUppercase, incLowercase, numbers, charsUpper, charsLower)
	 || threeOption(incSymbol, incUppercase, incLowercase, symbols, charsUpper, charsLower)
	 
	 || twoOption(incNumber, incSymbol, numbers, symbols) 
	 || twoOption(incNumber, incUppercase, numbers, charsUpper) 
	 || twoOption(incNumber, incLowercase, numbers, charsLower)
	 || twoOption(incSymbol, incUppercase, symbols, charsUpper) 
	 || twoOption(incSymbol, incLowercase, symbols, charsLower)
	 || twoOption(incUppercase, incLowercase, charsUpper, charsLower) 

	 || singleOption(incNumber, numbers) 
	 || singleOption(incSymbol, symbols) 
	 || singleOption(incUppercase, charsUpper)
	 || singleOption(incLowercase, charsLower); 
}

//NOTE: if option.checked === true (if selected/checked);
function singleOption(option, pwtype) {
	let password = "";
	if(option.checked) {
		for(let i = 0; i < parseInt(passwordLength.value); i++) {
			password += pwtype.split("")[Math.floor(Math.random() * pwtype.length)];
		}
	}
	return password;
}

// E.g.  op1 = incNumber, pwtype = numbers (from generatePassword())
function twoOption(op1, op2, pwtype, pwtype2) {
	let password = "";
	let temp = "";
	if(op1.checked && op2.checked ) { // if op1.checked = true
		for(let i =0 ; i< parseInt(passwordLength.value); i++) {
		temp += pwtype.charAt(Math.floor(Math.random() * pwtype.length)) 
		 	 + pwtype2.charAt(Math.floor(Math.random() * pwtype2.length));
		}
		// slice from the start to length set by the user
		return password += temp.slice(0, parseInt(passwordLength.value));	
	}
} 

function threeOption(op1, op2, op3, pwtype, pwtype2, pwtype3) {
	let password = "";
	let temp = "";
	if(op1.checked && op2.checked  && op3.checked ) {
		for(let i =0 ; i< parseInt(passwordLength.value); i++) {
		temp += pwtype.charAt(Math.floor(Math.random() * pwtype.length)) 
		 	 + pwtype2.charAt(Math.floor(Math.random() * pwtype2.length))
		 	 + pwtype3.charAt(Math.floor(Math.random() * pwtype2.length));
		}
		return password += temp.slice(0, parseInt(passwordLength.value));	
	}
} 

function allOptions(op1,op2,op3,op4, pwtype, pwtype2, pwtype3, pwtype4) {
	let password = "";
	let temp = "";
	if(op1.checked && op2.checked && op3.checked  && op4.checked ) {
		for(let i =0 ; i< parseInt(passwordLength.value); i++) {
		temp += pwtype.charAt(Math.floor(Math.random() * pwtype.length)) 
		 	 + pwtype2.charAt(Math.floor(Math.random() * pwtype2.length))
		 	 + pwtype3.charAt(Math.floor(Math.random() * pwtype3.length))
		 	 + pwtype4.charAt(Math.floor(Math.random() * pwtype4.length));
		}
		return password += temp.slice(0, parseInt(passwordLength.value));
	}
}

// BASIC CHECKS
function checkOptions(num, symb, upper, lower) {
	if(num.checked === false 
		&& symb.checked === false 
		&& upper.checked === false 
		&& lower.checked === false
	) {
		return true;
	}
}

function checkPassWordLength(pwLength) {
	if(parseInt(pwLength.value) < 6 || parseInt(pwLength.value) > 16) {
		return true;
	}
	if(isNaN(pwLength.value) || pwLength === "") {
		return true;
	}
}

function checkPasswordField(pwField) {
	if(pwField.value !== "") {
		pwField.focus();
		pwField.select();
		document.execCommand("copy");
		return true;
	} else {
		return false;
	}
}
