import React from 'react'

export default function Nav() {
  return (
    <div>
      <form action="" className='max-w-[1280px] mx-16 flex gap-4 p-4 bg-slate shadow-md rounded-md m-auto'>
        <input type="search" placeholder='Enter Username...' autoFocus className='flex-1 border-gray-200 rounded-md px-4 py-2 border-2'/>
        <button type="search" className='bg-green-500 text-white font-semibold px-4 py-2 rounded-md'>Search</button>
      </form>
    </div>
  )
}
