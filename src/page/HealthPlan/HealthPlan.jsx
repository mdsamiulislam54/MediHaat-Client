import React from 'react'
import { Link } from 'react-router'
import Button from '../../components/Button/Button'

const HealthPlan = () => {
    return (
        <div className='bg-cover w-full h-full' style={{ backgroundImage: `url("https://preview.colorlib.com/theme/caremed/images/cta.jpg")` }}>
            <div className="custom-container">
                <div className='flex flex-col items-center justify-center text-center py-20 font-syne'>
                    <h2 className='text-4xl font-semibold text-white mb-4'>Join Our Health Plan</h2>
                    <p className='text-white mb-6'>Subscribe to our health plan and enjoy exclusive benefits and discounts on our services.</p>
                    <Link to={'#'}>
                    <Button children={"Request Plan"} className={"text-white"}/>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default HealthPlan