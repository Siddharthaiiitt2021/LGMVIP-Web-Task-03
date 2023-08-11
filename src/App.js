import './App.css';
import { createElement, useState } from 'react';

function App() {

  const [str, Setstr] = useState('');

  function AddStr(e) {
    var num = e.target.innerHTML
    Setstr(str + num);
  }

  function SolveStr() {
    var eq = str;
    var solve = []
    var num = ''
    // console.log(eq.search('+'))
    for (let i = 0; i < eq.length; i++) {
      if (i == eq.length - 1) {
        if (eq[i] === "+" | eq[i] === "-" | eq[i] === "*" | eq[i] === "/") {
          Setstr('Syntax Error')
        }
        else {
          num = num + eq[i];
          solve.push(num)
        }
      }

      if (eq[i] === "+" | eq[i] === "-" | eq[i] === "*" | eq[i] === "/") {
        solve.push(num)
        num = ''
        solve.push(eq[i])
      }
      else {
        num = num + eq[i]
      }
      console.log(solve)
    }

    if (str.includes('Syntax Error')) {
      Setstr('Syntax Error')
    }
    else {
      for (let i = 0; i < solve.length; i++) {
        if (solve[i] === "+" | solve[i] === "-" | solve[i] === "*" | solve[i] === "/") {
          if (solve[i] === solve[i - 1]) {
            Setstr('Syntax Error')
            break;
          }
        }

        if (solve[i] === '.') {
          Setstr('Syntax Error')
          break;
        }

        if (solve[i].split('.').length - 1 > 1) {
          Setstr('Syntax Error')
          break;
        }
        else {
          if (solve[i][0] === '.') {
            solve[i] = '0' + solve[i]
          }
          else if (solve[i][solve[i].length - 1] === '.') {
            solve[i] = solve[i] + '0'
          }
        }
      }
    }

    console.log(solve)

    for (let i = 0; i < solve.length; i++) {
      if (solve[i] === "+" | solve[i] === "-" | solve[i] === "*" | solve[i] === "/") {
        continue
      }
      else {
        solve[i] = parseFloat(solve[i])
      }
    }


    var symbols =['/', '*', '+', '-']
    var ans = 0
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < solve.length; i++) {
        if(solve[i] === symbols[j] && j==0){
          ans = ans + solve[i-1]/solve[i+1]
          solve.splice(i-1,3)
          console.log('Splicing ' + solve)
          solve.splice(i-1,0,ans)
          console.log('Solve Splice', ans)
          console.log('After division ' + solve)
        }
        if(solve[i] === symbols[j] && j==1){
          ans = ans + solve[i-1]*solve[i+1]
          solve.splice(i-1,3)
          
          console.log('After multiplication ' + solve)
        }
        if(solve[i] === symbols[j] && j==2){
          ans = ans + solve[i-1]+solve[i+1]
          solve.splice(i-1,3)
          console.log('After Sum ' + solve)
        }
        if(solve[i] === symbols[j] && j==3){
          ans = ans + solve[i-1]-solve[i+1]
          solve.splice(i-1,3)
          console.log('After Substraction ' + solve)
        }
        console.log('ans is '+ans)
      }
    }
    ans = ans.toString()
    Setstr(ans)
  }

  function clearOne() {
    var string  = str;
    string = string.slice(0, string.length-1)
    Setstr(string)
  }

  function ClearAll(){
    Setstr('')
  }

  return (
    <div className="App">
      <div id='calculator'>
        <div id='display_screen'>
          <div id='display'>
            <form>
              <input type='text' id='screen' value={str} readOnly></input>
            </form>
          </div>
          <div id='back'>
            <button onClick={clearOne}>Clear</button>
          </div>
        </div>
        <div id='keypad'>
          <div className='numbers'>
            <button onClick={AddStr}>1</button>
            <button onClick={AddStr}>2</button>
            <button onClick={AddStr}>3</button>
            <button onClick={AddStr}>/</button>
          </div>
          <div className='numbers'>
            <button onClick={AddStr}>4</button>
            <button onClick={AddStr}>5</button>
            <button onClick={AddStr}>6</button>
            <button onClick={AddStr}>-</button>
          </div>
          <div className='numbers'>
            <button onClick={AddStr}>7</button>
            <button onClick={AddStr}>8</button>
            <button onClick={AddStr}>9</button>
            <button onClick={AddStr}>+</button>
          </div>
          <div className='numbers'>
            <button onClick={AddStr}>.</button>
            <button onClick={AddStr}>0</button>
            <button onClick={SolveStr}>=</button>
            <button onClick={AddStr}>*</button>
          </div>
          <div className='Delete'>
            <button onClick={ClearAll}>Clear All</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
