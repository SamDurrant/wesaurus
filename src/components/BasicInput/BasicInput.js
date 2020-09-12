import React from 'react'
import './BasicInput.css'

function BasicInput({ className, ...props }) {
  const classes = ['BasicInput', className].filter(Boolean).join(' ')
  return <input className={classes} {...props} />
}

export default BasicInput
