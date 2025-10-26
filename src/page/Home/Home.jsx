import React from 'react'
import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import DiscountProducts from '../DiscountProduct/DiscountProducts'
import TestimonialSection from '../Testimonial/TestimonialSection'

import Faq from '../Faq/Faq'
import HealthPlan from '../HealthPlan/HealthPlan'
import Brand from '../Brand/Brand'

const home = () => {
  return (
    <div >
      <Banner/>
      <Category/>
      <DiscountProducts/>
    
      <Faq/>
      <HealthPlan/>
      <TestimonialSection/>
      <Brand/>
    </div>
  )
}

export default home