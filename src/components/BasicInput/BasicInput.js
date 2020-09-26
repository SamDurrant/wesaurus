import React from 'react'
import './BasicInput.css'

const BasicInput = React.forwardRef(({ className, ...props }, ref) => {
  const classes = ['BasicInput', className].filter(Boolean).join(' ')
  return <input className={classes} {...props} ref={ref} />
})

export default BasicInput
