import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { JavaScriptLexer } from './JavaScript/JavaScriptLexer'
import { JavaScriptParser } from './JavaScript/JavaScriptParser';
import fs from 'fs/promises';
import { ParseGenContext } from './utils/genContextFromAst';

const program = `import Reverse from "./Reverse.js";
const Reverses = require("./Reverse.js")

var SingleDigit = [1,2,3,4,5,8,9]
let DoubleDigit = [34,56,23]

class AddSub {
	constructor(num1,num2){
		this.num1 = num1;
		this.num2 = num2;
	}
	
	addition() {
		return this.num1 + this.num2;
	}
	
	Substraction() {
		return this.num1 + this.num2;
	}
}

function TDMatrix(num1,num2){
	let arr = []
	for(let i = 0; i < num1; i++){
		let SubArr = []
		for(let j = 0; j < num2; j++){
			SubArr.push(j)
		}
		arr.push(SubArr)
	}
}

class MultDiv {
	constructor(num1,num2){
		this.num1 = num1;
		this.num2 = num2;
	}
	
	Multiplication() {
		return this.num1 * this.num2;
	}
	
	Division() {
		return this.num1/this.num2;
	}
}

const MultipliedNum = new MultDiv(34,67)
console.log(MultipliedNum.Multiplication())

function CallReverse(){
	let val = Reverse(SingleDigit)
	let addVal = new AddSub(34,55)
	val.push(addVal.addition())
	return val;
}

const RevAs = CallReverse()
console.log(RevAs)`;

const GenJsParse = (input: string) => {

    // Create the lexer and parser
    let inputStream = CharStreams.fromString(input);
    let lexer = new JavaScriptLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new JavaScriptParser(tokenStream);
    let tree = parser.program();
    let result = ParseGenContext(tree, input);

    let output: any = []
    let currLast = 0
    result.forEach((i: any) => {
        if (i.line[1] >= currLast) {
            output.push(i)
            currLast = i.line[1];
        }
    });

    fs.writeFile("jsParser.json", JSON.stringify(output)).then((err: any) => {
        if (err) return false;
        console.log("file writed successfully")
    });
};

GenJsParse(program)