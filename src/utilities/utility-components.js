import React from 'react'
import './utility-components.css'

export function Label({ className, ...props }) {
  const classes = ['Label', className].filter(Boolean).join(' ')
  return <label className={classes} {...props} />
}

export function Input({ className, ...props }) {
  const classes = ['Input', className].filter(Boolean).join(' ')
  return <input className={classes} {...props} />
}

export function Button({ className, text, small, solid, ...props }) {
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

export function Section({ className, column, stretch, ...props }) {
  const classes = ['Section', column && 'Section-column', className]
    .filter(Boolean)
    .join(' ')
  return <section className={classes} {...props} />
}
