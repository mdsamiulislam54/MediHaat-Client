import React from 'react'
import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import DiscountProducts from '../DiscountProduct/DiscountProducts'
import TestimonialSection from '../Testimonial/TestimonialSection'

const home = () => {
  return (
    <div >
      <Banner/>
      <Category/>
      <DiscountProducts/>
      <TestimonialSection/>
    </div>
  )
}

export default home