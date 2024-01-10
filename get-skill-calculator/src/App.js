import React, { useReducer } from 'react';
import './App.css';


const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:"clear",
  DELETE_DIGIT:"delete-digit",
  EVALUATE:"evaluate"
}

function reducer(state, action){
  switch(action.type){
    case ACTIONS.ADD_DIGIT:
      if (action.payload.digit=== 0 && state.currentOperand=== 0) {
        return state;
      }
      if(action.payload.digit=== "." && state.currentOperand.includes(".")){
        return state;
      }
      if(state.previousOperand!=null){
        return {
          ...state,
          previousOperand:`${state.previousOperand||""}${state.currentOperand}${action.payload.digit}`,
          currentOperand: `${state.currentOperand||""}${action.payload.digit}`,
          operation:null
        }
      }
      return {
        ...state,
        previousOperand: `${state.currentOperand||""}${action.payload.digit}`,
        currentOperand: `${state.currentOperand||""}${action.payload.digit}`,
        operation:null
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand===0){
        return {...state, currentOperand:null, operation: action.payload.operation}
      }
      if (state.currentOperand==null){
        return {...state, operation: action.payload.operation}
      }  
      return {...state, 
        operation: action.payload.operation, 
        previousOperand :state.currentOperand, 
        currentOperand:null}
      

    case ACTIONS.CLEAR:
      return {
        currentOperand:0
      }
  }
}

function evaluate({currentOperand,previousOperand,operation}){

}
function App() {
  const [{ currentOperand, previousOperand, operation },dispatch]= useReducer(reducer,{currentOperand:0})

  return (
    <div className="App">
      <div className="output" id="display">
        <div className='previous-operand'>{previousOperand}{operation}</div>
        <div className='current-operand'>{currentOperand}{operation}</div>
      </div>
      <button className='span-two' id='clear' onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button id="delete">Del</button>
      <button id="divide" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation : "/"}})}>/</button>
      <button id="one" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 1}})}>1</button>
      <button id="two" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 2}})}>2</button>
      <button id="three" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 3}})}>3</button>
      <button id="multiply" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation : "*"}})}>*</button>
      <button id="four" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 4}})}>4</button>
      <button id="five" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 5}})}>5</button>
      <button id="six" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 6}})}>6</button>
      <button id="add" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation : "+"}})}>+</button>
      <button id="seven" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 7}})}>7</button>
      <button id="eight" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 8}})}>8</button>
      <button id="nine" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 9}})}>9</button>
      <button id="subtract" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation : "-"}})}>-</button>
      <button id="decimal" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : "."}})}>.</button>
      <button id="zero" onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload:{digit : 0}})}>0</button>
      <button id="equals" className='span-two'>=</button>
    </div>
  );
}

export default App;
