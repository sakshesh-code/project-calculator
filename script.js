const display = document.querySelector(".display");

//AC button clears everything
const clear = document.getElementById("clear");
clear.addEventListener("click", (e)=> {
    display.textContent = "0";
});

//Backspace Button clears one number at a time
const backspace = document.getElementById("backspc");
backspace.addEventListener("click", (e)=>{

   display.textContent = display.textContent.slice(0, display.textContent.length - 1) || "0";
});

//Numbers input corresponding values
const nums = document.querySelectorAll(".num");
nums.forEach(btn=>{
    btn.addEventListener("click", (e)=>{
        if(display.textContent === "0"){
            display.textContent = e.target.textContent;
            return;
        }
        display.textContent += e.target.textContent;
    })
});
