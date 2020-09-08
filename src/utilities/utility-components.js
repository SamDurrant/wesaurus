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

export function Button({ className, text, ...props }) {
  const classes = ['Button', className].filter(Boolean).join(' ')
  return (
    <button className={classes} {...props}>
      {text}
    </button>
  )
}

export function Section({ className, ...props }) {
  const classes = ['Section', className].filter(Boolean).join(' ')
  return <section className={classes} {...props} />
}
