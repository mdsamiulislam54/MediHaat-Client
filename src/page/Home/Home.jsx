import React from 'react'
import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import DiscountProducts from '../DiscountProduct/DiscountProducts'
import TestimonialSection from '../Testimonial/TestimonialSection'
import Offer from '../Offers/Offer'
import Faq from '../Faq/Faq'

const home = () => {
  return (
    <div >
      <Banner/>
      <Category/>
      <DiscountProducts/>
      <Offer/>
      <TestimonialSection/>
      <Faq/>
    </div>
  )
}

export default home