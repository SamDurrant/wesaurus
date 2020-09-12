import React from 'react'
import './utility-components.css'

export function Section({ className, column, stretch, ...props }) {
  const classes = ['Section', column && 'Section-column', className]
    .filter(Boolean)
    .join(' ')
  return <section className={classes} {...props} />
}
