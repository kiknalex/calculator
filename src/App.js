import React from 'react';
import ReactDOM from 'react-dom';

let numRegex = /\d/;
let arithmeticRegex = /^(\+|-|\/|\x)/;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      result: '0',
      currentNum: [],
      displayInput: '0'
      }
    }
    
    matchArithmeticRegex = (element) => {
     return arithmeticRegex.test(element);
    }
    mathOperations = (operator,a,b) => {
      switch(operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "x": return a * b;
        case "/": return a / b;
      }
    }
     math = () => {

       let i = 0;
     let array = this.state.input;
     while(array.some(e => arithmeticRegex.test(e))) {
       i++;
       if(i > 20){
         break;
       }
        if(array.includes("x") && array.includes("/")) {
          let x = array.indexOf("x");
          let y = array.indexOf("/");
          if(x < y) {
            let equation = this.mathOperations(array[x],parseFloat(array[x - 1]),parseFloat(array[x + 1]));
          array.splice(x - 1,3,equation);
          } else {
            let equation = this.mathOperations(array[y],parseFloat(array[y - 1]),parseFloat(array[y + 1]));
          array.splice(y - 1,3,equation);
          }
        }
       else if(array.includes("x")) {
          let x = array.indexOf("x");
          let equation = this.mathOperations(array[x],parseFloat(array[x - 1]),parseFloat(array[x + 1]));
          array.splice(x - 1,3,equation);
       } else if(array.includes("/")) {
         let x = array.indexOf("/");
          let equation = this.mathOperations(array[x],parseFloat(array[x - 1]),parseFloat(array[x + 1]));
          array.splice(x - 1,3,equation);
       } else if(array.includes("-")) {
         let x = array.indexOf("-");
          let equation = this.mathOperations(array[x],parseFloat(array[x - 1]),parseFloat(array[x + 1]));
          array.splice(x - 1,3,equation);
       } else if(array.includes("+")) {
         let x = array.indexOf("+");
          let equation = this.mathOperations(array[x],parseFloat(array[x - 1]),parseFloat(array[x + 1]));
          array.splice(x - 1,3,equation);
       }
     };
      this.setState({result: array});
      this.setState({input: [],currentNum: [array[0]],displayInput: array[0].toString()});
      
   } 
  // SOME WILD SPAGHETTI BELOW,I'M SORRY FOR THE PERSON TRYING TO READ THIS
    numbersInput = (element) => {
      let display = this.state.displayInput;
      let array = this.state.input;
      let currentNumber = this.state.currentNum;
      if(currentNumber[0] == "0" && element == "0" && currentNumber.length == 1) {return;} 
      if(currentNumber[0] == "-" && currentNumber[1] == "0" && element == "0" && currentNumber.length == 2) {return};
      
       if(element == "." && !currentNumber.includes(".") && arithmeticRegex.test(array[array.length - 1]) == false) {
         
        if(display.length == 1) {
        currentNumber.push('0');
        }

       currentNumber.push(element);
       this.setState({currentNum: currentNumber, displayInput: display + element});
     }  else if(element == "." && currentNumber.length != 0 && !currentNumber.includes(".") && !arithmeticRegex.test(currentNumber[currentNumber.length - 1])) {
       currentNumber.push(element);
       this.setState({currentNum: currentNumber, displayInput: display + element});
     }
      if(numRegex.test(element)) {
       if(currentNumber.length == 0 && element == "0") {
         return;
       }
       if(display.charAt(0) == 0 && currentNumber[1] == ".") {
         currentNumber.push(element);
         this.setState({currentNum: currentNumber, displayInput: display + element});
         return;
       }
       if(display.length == 1 && element != "0" && display.charAt(0) == '0') {
         currentNumber.push(element);
         display = '';
         display += element;
         this.setState({currentNum: currentNumber,displayInput: display});
         return;
       }
       
       if(display.length > 0){
         if(display.length == 1 && display.charAt(0) == '0') {
           display = '';
         }
         currentNumber.push(element);
         this.setState({currentNum: currentNumber, displayInput: display + element});
       }
     }
     
    }
  arithmeticInput = (element) => {
    
    let array = this.state.input;
    let currentNumber = this.state.currentNum;
    let lastElem;
    let display = this.state.displayInput;

    if(arithmeticRegex.test(element)) {
       if(display.charAt(0) == "-" && display.length == 1) {return;}
       if(display.charAt(display.length - 1) == '-' && element == "-") {return;}
      if(currentNumber[currentNumber.length - 1] == '.') {return;}
      if(display.length == 1 && display.charAt(0) == '0' && element == "-") {
           display = '';
        currentNumber.push(element);
         this.setState({currentNum: currentNumber, displayInput: display + element});
        return;
         }
         
       if(arithmeticRegex.test(array[array.length-1]) && currentNumber.length == 0 && element != '-') {
         array.pop();
         array.push(element);
         display = array.join("");
         this.setState({input: array, displayInput: display});
       }
      if(arithmeticRegex.test(array[array.length -1]) && currentNumber[0] == "-" && currentNumber.length == 1) {
        array.splice(array.length - 1,1,element);
        display = array.join("");
        this.setState({input: array, displayInput: display, currentNum: []});
        return;
      }
      if(arithmeticRegex.test(array[array.length-1]) && currentNumber.length == 0 && element == '-') {
         currentNumber.push(element);
         this.setState({input: array, displayInput: display + element, currentNum: currentNumber});
         return;
       }
       if(array[array.length - 1] == element && currentNumber.length == 0) {
         return;
       }
      if(currentNumber.length > 0) {
        array.push(currentNumber.join(""));
        array.push(element);
        display = array.join("");
        this.setState({input: array, displayInput: display,currentNum: []});
      } else if(currentNumber.includes("-")) {
        array.push(currentNumber.join(""));
        array.push(element);
        display = array.join("");
        this.setState({input: array, displayInput: display,currentNum: []});
      } 
     }
    
  }
   handleClick = (e) => {
     let currentNum = [];
     let element = e.target.innerText;
     let array = this.state.input;
     let currentNumber = this.state.currentNum;
     if(element == "AC") {
       this.setState({input: [],result: '0',currentNum: [], displayInput: '0'});
       return;
     }
     this.numbersInput(e.target.innerText);
     this.arithmeticInput(e.target.innerText);
     
     if(element == "=" && array.length > 1) {
       array.push(currentNumber.join(""));
       this.setState({input: array});
       this.math();
     }
      
  }  
  
    render() {
      return (
      <body> 
          <div className="calc-wrapper">
            <Display result={this.state.result} displayInput={this.state.displayInput} />
            <Buttons  onClick={this.handleClick} />
            
          </div>
       </body>
      );
    }  
}

const Display = ({result, displayInput}) => {
    return (
    <div id="displayy">
        <div className="result">{result}</div>
        <div id="display" className="input">{displayInput}</div>
        </div>
    );
  }

const Buttons = (props) => {
  
    return (
    <div className="buttons-wrapper">
        <button id="clear" className="box-1" onClick={props.onClick}>AC</button>
        <button id="divide" onClick={props.onClick}>/</button>
        <button id="multiply" onClick={props.onClick}>x</button>
        <button id="seven" className="numbers" onClick={props.onClick}>7</button>
        <button id="eight" className="numbers" onClick={props.onClick}>8</button>
        <button id="nine" className="numbers" onClick={props.onClick}>9</button>
        <button id="subtract" onClick={props.onClick}>-</button>
        <button id="four" className="numbers" onClick={props.onClick}>4</button>
        <button id="five" className="numbers" onClick={props.onClick}>5</button>
        <button id="six" className="numbers" onClick={props.onClick}>6</button>
        <button id="add" onClick={props.onClick} >+</button>
        <button id="one" className="numbers" onClick={props.onClick}>1</button>
        <button id="two" className="numbers" onClick={props.onClick}>2</button>
        <button id="three" className="numbers" onClick={props.onClick}>3</button>
        <button id="zero" className="box-2 numbers" onClick={props.onClick}>0</button>
        <button id="decimal" onClick={props.onClick}>.</button>
        <button id="equals" className="box-3" onClick={props.onClick}>=</button>
    </div>
    );
  }

export default App;
