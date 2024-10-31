import React from 'react'

const HiddenLabel = ({ children, htmlFor }: { children: string | string[]; htmlFor?: string }) => {
  return (
    <label className='hidden' htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default HiddenLabel
