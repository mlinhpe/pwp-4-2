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


    renderButton(i) {
        return <CalculatorButton value={i} callback={() => this.handleClick(i)} />;
    }

    render() {
        var inputTextField = <TextField value={this.state.inputString} />
        return (
            <div onKeyPress={this.handleKeyPress}>
                {inputTextField}
                <div className="firstRow">
                    {this.renderButton("C")}
                    {this.renderButton("/")}
                </div>
                <div className="secondRow">
                    {this.renderButton(7)}
                    {this.renderButton(8)}
                    {this.renderButton(9)}
                    {this.renderButton("*")}
                </div>
                <div className="thirdRow">
                    {this.renderButton(4)}
                    {this.renderButton(5)}
                    {this.renderButton(6)}
                    {this.renderButton("-")}
                </div>
                <div className="forthRow">
                    {this.renderButton(1)}
                    {this.renderButton(2)}
                    {this.renderButton(3)}
                    {this.renderButton("+")}
                </div>
                <div className="fifthRow">
                    {this.renderButton(0)}
                    {this.renderButton("=")}
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
            <button className="button" onClick={this.props.callback}>
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
    var currentPos = 0;
    var currentResult = 0;
    var currentValue = 0;
    var currentSymbol = "+"
    var symbols = ["/", "*", "-", "+"]
    for (var i = 0; i < inputString.length; i++) {
        if (symbols.includes(inputString.charAt(i))) {
            currentValue = parseInt(inputString.substr(currentPos, i))
            currentPos = i + 1;
            currentResult = calculate(currentValue, currentSymbol, currentResult);
            currentSymbol = inputString.charAt(i)
        } else {
            if (i === inputString.length - 1) {
                currentValue = parseInt(inputString.substr(currentPos, i + 1))
                currentResult = calculate(currentValue, currentSymbol, currentResult);
            }
        }
    }
    return currentResult;
}

class TextField extends React.Component {
    render() {
        return (
            <div className="textfield">
                <input type="text" value={this.props.value} readOnly />
            </div>
        )
    }
}

export {
    CalculatorFrame,
    Calculator,
    calculateStringInput,
    calculate
}