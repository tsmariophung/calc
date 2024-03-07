'use client'
import { useState } from "react";
import { keys } from "../../constant";

export default function Home() {
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');


  const handleKeyPress = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(expression).toString();
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') { 
      setResult('');
      setExpression('');
    } else if (value ==='DEL' && expression.length > 0) {
      setExpression((value) => {
        const newValue = value.slice(0, -1);
        return newValue
      })

    } else {
      setExpression((prevExpression) => prevExpression + value)
    }
  };



  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <h1 className="text-3xl mb-10">Calculator</h1>

      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          className="w-full mb-2 border-b-2 border-gray-400 text-3xl focus:outline-none"
          value={expression}
          readOnly
        />
        <input
          type="text"
          className="w-full mb-4 text-4xl font-bold focus:outline-none"
          value={result}
          readOnly
        />
        <section className="h-[55vh] min-h-[340px] max-h-[480px] grid grid-cols-4 gap-4 sm:gap-[2.5vh] p-4 sm:p-6 bg-skin-keypad w-full rounded-xl">
          {keys.map((btn) => (
            <button
              key={btn}
              onClick={() => handleKeyPress(btn)}
              className="text-4xl bg-gray-300 hover:bg-gray-400 p-2 rounded-lg"
            >
              { btn }
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
