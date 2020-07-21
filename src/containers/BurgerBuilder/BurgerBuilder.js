import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
  
class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchasable = (ingredClone) => {
    // const ingredients = {
    //   ...this.state.ingredients
    // }

    const sum = Object.values(ingredClone)
      .reduce((acc, el) => {
        return acc + el
      }, 0);
    console.log(sum)

    // const sum = Object.keys(ingredClone)
    //   .map((igKey) => {
    //     return ingredClone[ igKey ]
    //   })
    //   .reduce((acc, el) => {
    //     return acc + el
    //   }, 0);
    
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount + 1;

    const ingredClone = { ...this.state.ingredients }
    ingredClone[ type ] = newCount
    
    const priceAddition = INGREDIENT_PRICES[ type ]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: ingredClone,
      totalPrice: newPrice
    })
    this.updatePurchasable(ingredClone)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[ type ]
    let newCount = oldCount - 1;
    if (newCount < 0) {
      return
    }

    const ingredClone = { ...this.state.ingredients }
    ingredClone[ type ] = newCount

    const priceSubtraction = INGREDIENT_PRICES[ type ]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceSubtraction;

    this.setState({
      ingredients: ingredClone,
      totalPrice: newPrice
    })
    this.updatePurchasable(ingredClone)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    console.log("got handler")
    this.setState({ purchasing: false })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) { // [salad, bacon, cheese]
      disabledInfo[key] = disabledInfo[key] <= 0 // [salad:f, bacon:f, cheese:f]
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}  />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          subtract={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder