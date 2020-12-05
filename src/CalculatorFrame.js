import './index.css';
import React from 'react';


class CalculatorFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputString: "",
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(input) {
        const i = input.toString();
        if (i.toUpperCase() !== "C" && i !== "=" && i !== "Enter") {
            const newInputString = this.state.inputString + i
            this.setState({
                inputString: newInputString
            });
        } else if (i.toUpperCase() === "C") {
            const newInputString = ""
            this.setState({
                inputString: newInputString
            });
        } else if (i === "=" || i === "Enter") {
            const result = calculateStringInput(this.state.inputString)
            this.setState({
                inputString: result
            })
        }
    }

    handleKeyPress = (event) => {
        const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "+", "-", "c", "=", "Enter"]
        if (allowedKeys.includes(event.key)) {
            this.handleClick(event.key)
        }
    }


    renderButton(i, cN) {
        return <CalculatorButton value={i} className={cN} callback={() => this.handleClick(i)} />;
    }

    renderTextfield(inputText, cN) {
        return <TextField value={inputText} className={cN} />;
    }

    render() {
        return (
            <div onKeyPress={this.handleKeyPress} className="calculatorframe">
                {this.renderTextfield(this.state.inputString, "textfield")}
                <div className="grid-container">
                    {this.renderButton("C", "clear")}
                    {this.renderButton("/", "slash")}
                    {this.renderButton(7, "seven")}
                    {this.renderButton(8, "eight")}
                    {this.renderButton(9, "nine")}
                    {this.renderButton("*", "star")}
                    {this.renderButton(4, "four")}
                    {this.renderButton(5, "five")}
                    {this.renderButton(6, "six")}
                    {this.renderButton("-", "minus")}
                    {this.renderButton(1, "one")}
                    {this.renderButton(2, "two")}
                    {this.renderButton(3, "three")}
                    {this.renderButton("+", "plus")}
                    {this.renderButton(0, "zero")}
                    {this.renderButton(".", "point")}
                    {this.renderButton("=", "equal")}
                </div>
            </div>
        )
    }
}

class CalculatorButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        //console.log(props.value)
    }

    render() {
        return (
            <button className={"Button " +this.props.className} onClick={this.props.callback}>
                {this.props.value}
            </button>
        );
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div className="calculator">
                <div className="calculator-frame">
                    <CalculatorFrame />
                </div>
                <div className="calculator-result">
                </div>
            </div>
        );
    }
}

function calculateArray(inputArray) {
    // take the first value
    var currentResult = parseFloat(inputArray[0]);
    var currentSymbol = "+"
    var symbols = ["/", "*", "-", "+"]
    for (var i = 1; i < inputArray.length; i++) {
        var currentValue = inputArray[i]
        if (symbols.includes(currentValue)) {
            currentSymbol = currentValue
        } else {
            currentResult = calculate(parseFloat(currentValue), currentSymbol, currentResult);
        }
    }
    return currentResult;
}

function calculate(currentValue, currentSymbol, currentResult) {
    switch (currentSymbol) {
        case "+": return currentResult + currentValue;
        case "-": return currentResult - currentValue;
        case "*": return currentResult * currentValue;
        case "/": return currentResult / currentValue;
        default: return currentResult;
    }
}

function calculateStringInput(inputString) {
    var symbols = ["/", "*", "-", "+"]
    // last character should not be a symbol and no more than 1 decimal point should be in a number
    if (symbols.includes(inputString.charAt(inputString.length-1)) || (/[0-9]*\.[0-9]*\./).test(inputString)) {
      return "Syntax Error"
    }
    // check divison by 0
    if (inputString.includes("/0")) {
      return "do not divide by 0"
    }
    var replacedInputString = inputString.replace(/\+/, ",+,")
    replacedInputString = replacedInputString.replace(/-/, ",-,")
    // split by plus, minus
    var replacedInputArray = replacedInputString.split(",")
    const result = calculateOrderedInputString(replacedInputArray, symbols)
    return result
}

function calculateOrderedInputString(groupedInput, symbols) {
    var expression = "";
    var expressionGroups;

    // calculate total value for each element in group.
    for (var i = 0; i < groupedInput.length; i++) {
        if (!symbols.includes(groupedInput[i])) {
            expression = groupedInput[i]
            expression = expression.replace(/\//, ",/,")
            expression = expression.replace(/\*/, ",*,")
            // split by division, multiplication
            expressionGroups = expression.split(",")
            // parse each string inside expressionGroups
            groupedInput[i] = calculateArray(expressionGroups)
        } 
    }
    return calculateArray(groupedInput);
}

class TextField extends React.Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.value} className={this.props.className} readOnly />
            </div>
        )
    }
}

export {
    CalculatorFrame,
    Calculator,
    CalculatorButton,
    calculateStringInput,
    calculate
}