import React from 'react'
import './BasicLabel.css'

function BasicLabel({ className, ...props }) {
  const classes = ['BasicLabel', className].filter(Boolean).join(' ')
  return <label className={classes} {...props} />
}

export default BasicLabel
