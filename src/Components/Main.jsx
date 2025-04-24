import React from 'react'
import Cards from './Cards'
import Header from './Header'

export default function Main() {
  return (
    <>
    <div className='max-w-[1280px] mx-16 gap-4 rounded-md shadow-md bg-slate-900 text-white'>
        <Header/>
    </div>
    <div>
      <Cards/>
    </div>
    </>
  )
}
