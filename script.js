
const text = document.querySelector(".text");


//Number and operators for running calculations
let num = "";
let oper = "";
let num1 = "";


//AC button clears everything
const clear = document.getElementById("clear");
clear.addEventListener("click", (e)=> {
    text.textContent = "";
    num = "";
    num1 = "";
    oper = "";
});


//Backspace Button clears one number at a time
const backspace = document.getElementById("backspc");
backspace.addEventListener("click", (e)=>{
if(num === ""){
    num = num1;
    oper = "";
    text.textContent = text.textContent.slice(0, text.textContent.length - 1) || "0";
    return;
}
   text.textContent = text.textContent.slice(0, text.textContent.length - 1) || "0";
   num = num.slice(0, -1);
});


//Numbers input corresponding values
const nums = document.querySelectorAll(".num");

nums.forEach(btn=>{
    btn.addEventListener("click", (e)=>{

        if(num.length > 10){
            return;
        };

        if(num === "" && num1 === ""){
            text.textContent = e.target.textContent;

            num += e.target.textContent;
            return;
        }
        text.textContent += e.target.textContent;

        num += e.target.textContent;

    })
});


//Operators
const op = document.querySelectorAll(".op");

op.forEach(btn=>{
    btn.addEventListener("click", e=>{

        //Runs calculation if operator is already present
        if(oper !== ""){
            let result = operate(oper, Number(num1), Number(num));
            oper = e.target.textContent;
            text.textContent = result + oper;
            num1 = result;
            num = "";
            return;
        }

        //Allows - operator to start 
        if(e.target.textContent === "-" && text.textContent === ""){
            text.textContent = e.target.textContent;
            
            oper = e.target.textContent;

            num = e.target.textContent;
            
            return;
        };

        //stops operators running first
        if(text.textContent === ""){
            return;
        };

        const op = "+×-÷%";

        //Stops consecutive operators on text
        if(op.includes(text.textContent.slice(-1))){
            return;
        };

       text.textContent = e.target.textContent;

       oper = e.target.textContent;
       
       num1 = num;
       num = "";    
       
    })
});


//result from =
const equals = document.querySelector(".result");
equals.addEventListener("click", e=>{
    if(num1 === ""){
        return;
    }

    num1 = Number(num1);
    num = Number(num);

   text.textContent = operate(oper, num1, num);
    num = "";
    num1 = "";
    oper = "";

});


//period .
const dot = document.querySelector(".period");
dot.addEventListener("click", e=>{
    if(num.includes(".")){
        return;
    }else if(text.textContent === ""){
        text.textContent = "0.";
        num = "0.";
        return;
    }

    text.textContent += e.target.textContent;
    num += e.target.textContent;
})


//Operations functions

function add(a, b){
    return a + b;
};

function sub(a, b){
    return a - b;
};

function multi(a, b){
    return a * b;
};

function div(a, b){
    return a / b;
};

function remainder(a, b){
    return a % b;
};

//------------------------

//Operate calculation function
function operate(op, a, b){
    op === "+" ? 
        op = add: 
        op === "-" ? 
            op = sub: 
            op === "×" ?
                    op = multi :
                    op === "÷" ?
                        op = div :
  
                        op = remainder;
//Filter Infinity
if(b === 0 && op === div){
    return "Error: Infinite";
};                 

    const result = op(a, b);

    if(String(result).length > 10 && Number.isInteger(result)){
        return result.toExponential(6);
    }

    return (String(result).length) > 10 && String(result).includes(".") ? 
        result.toFixed(10) : result;
};

