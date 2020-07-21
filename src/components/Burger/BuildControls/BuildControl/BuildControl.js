import React from 'react'
import classes from './BuildControl.module.css'

const BuildControl = props => {

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        onClick={() => { props.subtract(props.type) }}
        className={classes.Less}
        disabled={props.disabled}
      >Less</button>
      <button
        onClick={() => { props.add(props.type) }}
        className={classes.More}
      >More</button>
    </div>
  )
}

export default BuildControl