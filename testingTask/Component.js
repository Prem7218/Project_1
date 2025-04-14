import React from 'react'

const Component = () => {
  return (
    <div>
        <h1>Component For Contact Information</h1>
        <form>
            <br />
            <label className='border border-black m-2 p-2 rounded-md'>Name:</label>
            <input className='border border-black m-2 p-2 rounded-lg' type="text" placeholder='example: Prem Radheshyam Mahajan' />
            
            <br />
            <br />
            <label className='border border-black m-2 p-2 rounded-md'>Email:</label>
            <input className='border border-black m-2 p-2 rounded-lg' type="email" placeholder='example: premradheshyammahajan@gmail.com' />

            <br />
            <br />
            <label className='border border-black m-2 p-2 rounded-md'>Password:</label>
            <input className='border border-black m-2 p-2 rounded-lg' type="number" placeholder='example: ********' />

            <br />
            <br />
            <button className='text-center border border-black ml-24 m-2 pl-4 pr-4 p-2 rounded-lg bg-slate-100'>Submit</button>
        </form>
    </div>
  )
}

export default Component;