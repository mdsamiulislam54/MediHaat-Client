import { FaCoffee } from "react-icons/fa"


const Contact = () => {
    return (
        <div className="min-h-screen">
            <div>
                <div className=" relative">
                    <img
                        className="w-full h-[200px] object-center object-cover "
                        src="https://live.themewild.com/medion/assets/img/breadcrumb/01.jpg"
                        alt=""
                    />
                    <div className="absolute inset-0  bg-black/40 text-white flex items-center justify-center">
                        <div>
                            <h2 className="text-3xl font-bold  flex items-center gap-2">Contact Us</h2>

                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-container">
                <div>
                    <div>
                        <div>
                            <FaCoffee />
                            <h2>Office Address</h2>
                            <p>100/C Malibug Drive Road</p>
                            <p>Dhaka, BD</p>
                        </div>
                        <div>
                            <FaCoffee />
                            <h2>Call Us</h2>
                            <p>+880-1239092930</p>
                            <p>+880-1700020000</p>
                        </div>
                        <div>
                            <FaCoffee />
                            <h2>Email Us</h2>
                            <p>info.medihaat@gmail.com</p>
                            <p>support.medi@gmail.com</p>
                        </div>
                        <div>
                            <FaCoffee />
                            <h2>Open Time</h2>
                            <p>Mon -Sat (9AM - 10PM)</p>
                            <p>Sunday - <span>Closed</span></p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Contact