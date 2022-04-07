import React from 'react'

const PriceCart = ({cart}) => {
  return (
    <div className='total_price'>
        <span>{cart.title}</span>
        <span>$ {cart.price}</span>
    </div>
  )
}

export default PriceCart