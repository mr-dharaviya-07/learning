/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import './App.css'
import { useId } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  // const [id, setId] = useState('');

  const inputElement = useRef();

  let id1 = useId()

  useEffect(() => {
    setCount(count + 1)
  }, [input]);

  // setTimeout(()=>{
  //   setCount(count + 1)
  // },1000)

  const copy = () => {
    inputElement.current.focus();
    inputElement.current.select()

    navigator.clipboard.writeText(input);
  }
  const clear = () => {
    setInput('');
    // inputElement.current.clear();
  }

  return (
    <>

      <h1 className='m-2 '>
        {input}
      </h1>
      <button className='m-2' onClick={() => setCount((count) => count + 1)}>
        count is {count} and Id is {id1}
      </button>
      <br />
      <input type="text" className='bg-white p-2 m-2 text-black rounded-lg' value={input} onChange={(e) => setInput(e.target.value)} ref={inputElement} />
      <button className='m-2' onClick={copy}>Copy</button>
      <button className='m-2' onClick={clear}>Clear</button>
    </>
  )
}

export default App
