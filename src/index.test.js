import React from "react";
import {calculateStringInput, CalculatorButton} from './CalculatorFrame'
import { act } from "react-dom/test-utils";
import { render } from "react-dom";

describe("parse string for sum calculation", () => {
    it("should calculate from input string", () => {
        const testString = "1+3"
        expect(calculateStringInput(testString)).toEqual(4);
    })
})

describe("parse string for difference calculation", () => {
    it("should calculate from input string", () => {
        const testString = "10-3"
        expect(calculateStringInput(testString)).toEqual(7);
    })
})

describe("parse string for division calculation", () => {
    it("should calculate from input string", () => {
        const testString = "12/6"
        expect(calculateStringInput(testString)).toEqual(2);
    })
})

describe("parse string for multiplication calculation", () => {
    it("should calculate from input string", () => {
        const testString = "5*9"
        expect(calculateStringInput(testString)).toEqual(45);
    })
})

describe("return 'do not divide by 0' when dividing by 0", () => {
    it("should return an error message instead of Infinity", () => {
        const testString = "10/0"
        expect(calculateStringInput(testString)).toEqual("do not divide by 0");
    })
})

describe("parse string for decimal calculation", () => {
    it("should be able to calulate decimals", () => {
        const testString = "1.5+1.5"
        expect(calculateStringInput(testString)).toEqual(3);
    })
})

describe("calculate multiplication and division before addition and substraction", () => {
    it("should calculate in the correct order", () => {
        const testString = "5+7*8-4"
        expect(calculateStringInput(testString)).toEqual(57)
    })
})

it("renders a button", () => {
    let buttonContent = null; 
    buttonContent = document.createElement("div");
    document.body.appendChild(buttonContent);
    act(() => {
      render(<CalculatorButton value="hello" className="five" callback={() => {}}/>, buttonContent );
    });
    expect(buttonContent.textContent).toBe("hello");
  });



