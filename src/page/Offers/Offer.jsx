import React from "react";

const Offer = () => {


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Special Offers</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="card bg-base-50 image-full w-96 shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className=""
                            />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;
