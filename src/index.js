import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CalculatorFrame extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          inputString : "",
      };
      this.handleClick = this.handleClick.bind(this)
  }

  handleClick(i) {
      if (i !== "C" && i !== "=") {
          const newInputString = this.state.inputString + i
          this.setState({
            inputString: newInputString
          });     
      } else if (i === "C") {
          const newInputString = ""
          this.setState({
            inputString: newInputString
          }); 
      } else if (i === "=") {
          const result = this.calculateStringInput(this.state.inputString)
          this.setState({
              inputString: result
          })
      }
  }

calculateStringInput(inputString) {
    var currentPos = 0; 
    var currentResult= 0;
    var currentValue = 0;
    var currentSymbol = "+"
    var symbols = ["/", "*", "-", "+"]
    for (var i = 0; i < inputString.length; i++) {
        if (symbols.includes(inputString.charAt(i))) {
            currentValue = parseInt(inputString.substr(currentPos,i))
            currentPos = i+1;
            currentResult = this.calculate(currentValue, currentSymbol, currentResult);
            currentSymbol = inputString.charAt(i)
        } else {
            if (i === inputString.length -1) {
                currentValue = parseInt(inputString.substr(currentPos,i+1))
                currentResult = this.calculate(currentValue, currentSymbol, currentResult);
            }
        }
    } 
    return currentResult;
}

calculate(currentValue, currentSymbol, currentResult) {
    switch(currentSymbol) {
        case "+": return currentResult + currentValue;
        case "-": return currentResult - currentValue;
        case "*": return currentResult * currentValue;
        case "/": return currentResult / currentValue;
        default: return currentResult;
    }
}

  
renderButton(i) {
    return <CalculatorButton value={i} callback={() => this.handleClick(i)} />;
  }

  render() {
      var inputTextField = <TextField value={this.state.inputString} />
      return (
          <div>
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
        value : props.value,
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

class TextField extends React.Component {
  render() {
      return (
          <div className="textfield">
              <input type="text" value={this.props.value} readOnly />
          </div>
      )
  }
}


ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
)
