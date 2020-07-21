import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  //gets an array of key strings [meat, cheese, salad]
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => { 
      //make an array with as many indexes as items you need
      //2 meat: [_,_] 
      return [...Array(props.ingredients[ igKey ])].map((_, i) => {
          return <BurgerIngredient key={igKey+i} type={igKey} />
        })
    })
    // has 2 params: the returned value, the current value
    // arr = [], el is current array looked at
    // this will flatten the array
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;