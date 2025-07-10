import React from 'react'
import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import DiscountProducts from '../DiscountProduct/DiscountProducts'

const home = () => {
  return (
    <div >
      <Banner/>
      <Category/>
      <DiscountProducts/>
    </div>
  )
}

export default home