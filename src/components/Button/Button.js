import React from 'react'
import './Button.css'

function Button({ className, text, small, solid, ...props }) {
  const classes = [
    'Button',
    small && 'Button-small',
    solid && 'Button-solid',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={classes} {...props}>
      {text}
    </button>
  )
}

export default Button
