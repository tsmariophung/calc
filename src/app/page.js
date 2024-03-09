'use client'
import { useState } from "react";
import { keys, row1, row2, row3, row4 } from "../../constant";

export default function Home() {
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');


  const handleKeyPress = (value) => {
    if (value === '=') {
      try {
        const firstCheck = expression.replace(/x/g, "*");
        const periodCheck = firstCheck.replace(/\.{2,}/g, ".")
        const evalResult = eval(periodCheck).toString();
        setResult(evalResult);
        setExpression(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') { 
      setResult('');
      setExpression('');
    } else if (value === '←' && expression.length > 0) {
      setExpression((value) => {
        const newValue = value.slice(0, -1);
        return newValue
      })
    } else if (value === '+/-') {
      try {
        const invertResult = eval(expression).toString() * -1
        setExpression(invertResult);
      } catch (error) {
        setResult('Add number first');
      }
    } else if (value === '%') {
      try {
        const percentResult = eval(expression).toString() / 100
        setResult(percentResult);
        setExpression(percentResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === '.' && expression.toString().includes('.')) {
      return;
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  }



  return (
    <main className="flex flex-col min-h-screen items-center p-6">
      <h1 className="text-3xl text-white mb-8">Calculator</h1>

      <section>
        <div className="flex flex-col mb-4 bg-white items-center rounded-lg justify-end shadow-lg">
          <input
            type="text"
            className="w-full mb-2 text-sm text-end p-2 rounded-lg focus:outline-none "
            value={expression}
            readOnly
          />
          <input
            type="text"
            className="w-full mb-4 p-2 text-4xl font-bold text-end focus:outline-none"
            value={result}
            readOnly
          />
        </div>

        <div className="flex flex-col flex-wrap bg-white rounded-lg shadow-lg">
          <section className="h-[55vh] min-h-[340px] max-h-[480px] grid grid-cols-4 gap-4 sm:gap-[2.5vh] md:flex-1 p-2 sm:p-6 bg-skin-keypad w-full rounded-xl">


            <button 
              key="C"
              onClick={() => handleKeyPress('C')}
              className="text-4xl bg-red-400 border-b-2 border-red-700 text-white hover:bg-red-500 p-2 rounded-lg">
              C
            </button>
            {row1.map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="operator"
              >
                { btn }
              </button>
            ))}

            {row2.map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="number"
              >
                { btn }
              </button>
            ))}
            <button 
              key="x"
              onClick={() => handleKeyPress('x')}
              className="operator">
              x
            </button>

            {row3.map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="number"
              >
                { btn }
              </button>
            ))}
            <button 
              key="-"
              onClick={() => handleKeyPress('-')}
              className="operator">
              -
            </button>

            {row4.map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="number"
              >
                { btn }
              </button>
            ))}
            <button 
              key="+"
              onClick={() => handleKeyPress('+')}
              className="operator">
              +
            </button>

            {keys.map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="number"
              >
                { btn }
              </button>
            ))}
            <button 
              key="="
              onClick={() => handleKeyPress('=')}
              className="text-4xl bg-green-400 border-b-2 border-green-600 text-white hover:bg-green-500 p-2 rounded-lg">
              =
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
