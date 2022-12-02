import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { JavaScriptParserListener } from '../JavaScript/JavaScriptParserListener';
import {
  ClassDeclarationContext,FunctionDeclarationContext, ImportStatementContext,
  VariableDeclarationListContext,ExpressionStatementContext
} from '../JavaScript/JavaScriptParser';

let id = 0;
let parse: any = [];

export const ParseGenContext = (tree: any, program: string) => {

  class EnterFunctionListener implements JavaScriptParserListener {

    enterExpressionStatement(context: ExpressionStatementContext) {
      id = id + 1
      let start: number = context._start.startIndex;
      let stop: any = context._stop?.stopIndex;
      let startLine: any = context.start?.line;
      let stopLine: any = context._stop?.line;
      let importContext = {
        id: id,
        line: [startLine, stopLine],
        text: program.slice(start, stop + 1),
        type: 'keywords'
      }
      parse.push(importContext)
    }

    enterVariableDeclarationList(context: VariableDeclarationListContext) {
      id = id + 1;
      let startLine: any = context.start?.line;
      let stopLine: any = context._stop?.line;
      let start: number = context._start.startIndex;
      let stop: any = context._stop?.stopIndex;
      let variableContext = {
        id: id,
        line: [startLine, stopLine],
        text: program.slice(start, stop + 1),
        type: 'variableList'
      }
      parse.push(variableContext)
    }


    // Assuming a parser rule with name: `functionDeclaration`
    enterFunctionDeclaration(context: FunctionDeclarationContext) {
      id = id + 1
      let startLine: any = context.start?.line;
      let stopLine: any = context._stop?.line;
      let start: number = context._start.startIndex;
      let stop: any = context._stop?.stopIndex;
      let functionContext = {
        id: id,
        line: [startLine, stopLine],
        text: program.slice(start, stop + 1),
        type: 'function',

      }
      parse.push(functionContext)
    }

    enterClassDeclaration(context: ClassDeclarationContext) {
      id = id + 1
      let start: number = context._start.startIndex;
      let stop: any = context._stop?.stopIndex;
      let startLine: any = context.start?.line;
      let stopLine: any = context._stop?.line;
      let classContext = {
        id: id,
        line: [startLine, stopLine],
        text: program.slice(start, stop + 1),
        type: 'class'
      }
      parse.push(classContext)
    }

    enterImportStatement(context: ImportStatementContext) {
      id = id + 1
      let start: number = context._start.startIndex;
      let stop: any = context._stop?.stopIndex;
      let startLine: any = context.start?.line;
      let stopLine: any = context._stop?.line;
      let importContext = {
        id: id,
        line: [startLine, stopLine],
        text: program.slice(start, stop + 1),
        type: 'import'
      }
      parse.push(importContext)
    }

    // other enterX functions...
  }

  // Create the listener
  const listener: JavaScriptParserListener = new EnterFunctionListener();
  // Use the entry point for listeners
  ParseTreeWalker.DEFAULT.walk(listener, tree);

  // console.log({parse})

  return parse;

}