import {calculateStringInput} from './CalculatorFrame'

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

// tests for future functionalities
describe("return NaN when input makes no sense", () => {
    it("should return NaN", () => {
        const testString = "10#10"
        expect(calculateStringInput(testString)).toEqual(NaN);
    })
})

describe("return NaN when dividing by 0", () => {
    it("should return NaN instead of Infinity", () => {
        const testString = "10/0"
        expect(calculateStringInput(testString)).toEqual(NaN);
    })
})

describe("parse string for decimal calculation", () => {
    it("should return NaN", () => {
        const testString = "1.5+1.5"
        expect(calculateStringInput(testString)).toEqual(3);
    })
})


