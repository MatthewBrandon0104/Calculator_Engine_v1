let test = () => {document.getElementById('test').textContent = "temp= " + temp + "MainArray= " + mainArray; document.getElementById('display-bar').textContent = display;}

let operators = {
    "+": function(a,b) {return a + b; },
    "-": function(a,b) {return a - b; },
    "*": function(a,b) {return a * b; },
    "/": function(a,b) {return a / b; },
};

let mainArray = [];
let temp = [];
let display = "";

const btn = document.getElementsByClassName('btn');

btnInit();

function btnInit() {
	for (i = 0; i < btn.length; i++) {
    let x = i;
    btn[i].addEventListener('click', function() {
        if (btn[x].classList.contains('btn-op') && /[+/*-]/.test(display.substr(display.length - 1))) {
        return "";
        
        }  else if (btn[x].dataset.symbol === "=") {
            let y = temp.join("");
            mainArray.push(y);
            temp.splice(0, temp.length);
            opOrder2(mainArray);
            display = opOrder1(mainArray).join("");
            temp.push(mainArray[0]);
            test();
            mainArray.splice(0, 1);
        
        }  else if (btn[x].classList.contains('btn-op')) {
            display += `${btn[x].dataset.symbol}`;
            let y = temp.join("");
            mainArray.push(y);
            mainArray.push(`${btn[x].dataset.symbol}`);
            temp.splice(0, temp.length);
            test();
        
        }  else if (btn[x].id === "btn-ac") { 
        	mainArray.splice(0, mainArray.length);
            temp.splice(0, temp.length);
            display = "";
            test();
          
        }  else if (btn[x].id === "btn-c") {
            display = display.substr(0, display.length - temp.length);
            temp.splice(0, temp.length);
            test();
          
        }  else {
        	display += `${x}`;
            temp.push(`${x}`);
            test();
        }
    });
    
    btn[i].addEventListener('mouseover', function(e) {
    	btn[x].style.background = "teal";
    });
    btn[i].addEventListener('mouseout', function(e) {
    	btn[x].style.background = "tomato";
    });
  }
}

function opOrder1(input) {
  for (j = 0; j < input.length; j++) {
  	let x = j;
    if (input[x] === "+") {
    	let result = operators["+"](parseInt(input[x -1]), parseInt(input[x +1]));
        input[x -1] = result;
    	input.splice(x, 2);
    	opOrder1(input);
    } else if (input[x] === "-") {
    	let result = operators["-"](parseInt(input[x -1]), parseInt(input[x +1]));
    	input[x -1] = result;
    	input.splice(x, 2);
    	opOrder1(input);
    }
  }
  return input;
}

function opOrder2(input) {
	for (j = 0; j < input.length; j++) {
  	let x = j;
    if (input[x] === "*") {
    	let result = operators["*"](parseInt(input[x -1]), parseInt(input[x +1]));
        input[x -1] = result;
        input.splice(x, 2);
        opOrder2(input);
    } else if (input[x] === "/") {
    	let result = operators["/"](parseInt(input[x -1]), parseInt(input[x +1]));
        input[x -1] = result;
        input.splice(x, 2);
        opOrder2(input);
    }
  }
  return input;
}