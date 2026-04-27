import React from 'react'

type props = {
    active: boolean
    setActive?: ()=>void
    className?: string
}

function RadioBtn({active, setActive, className}:props) {
  return (
    <div onClick={()=>setActive && setActive()} className={`cursor-pointer min-w-[20px] min-h-[20px] size-[20px] border ${active ? 'border-primary bg-primary':'border-black bg-white'} flex items-center justify-center rounded-full ${className}`}>
        <div className={`size-[45%] bg-white border ${active ? 'border-primary':'border-black'} rounded-full`}/>
    </div>
  )
}

export default RadioBtn