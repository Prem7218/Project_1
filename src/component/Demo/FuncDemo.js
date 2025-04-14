import React, { useEffect, useState } from 'react'

export const FuncDemo = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  
  // useEffect(() => {
  //   console.log("Hello in UseEffect");
  // }, [count, count1])

  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     alert(`Hello ${Math.random(5)} is Buying Some Course...`);
  //     console.log("Hello");
  //   }, 7000);

  //   return () => {
  //     clearInterval(timeout);
  //   }
  // }, []) 

  return (
    <>
      <h1>Hello in Function Component: {count} ----- Count1: {count1}</h1>
      <button 
        className='text-green-300 border border-red-400 bg-yellow-50 mx-5'
        onClick={() => setCount((prev) => prev + 1)}>
            InCrese Count
        </button>

        <button 
        className='text-green-300 border border-red-400 bg-yellow-50 mx-5'
        onClick={() => setCount1((prev) => prev + 1)}>
            InCrese Count
        </button>
    </>
  )
}

export const AuthFuncDemo = (FuncDemo, isAuthenticate) => {

  return () => {
    if(isAuthenticate) {
      return <FuncDemo />
    }

    return (
      <h1>Access Denied!</h1>
    )
  }
}
