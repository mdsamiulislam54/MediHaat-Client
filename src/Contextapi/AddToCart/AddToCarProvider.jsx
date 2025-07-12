import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "./cartContext";

const AddToCarProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("medicine");
    return saved ? JSON.parse(saved) : [];
  });



  // LocalStorage sync when cart changes
  useEffect(() => {
    localStorage.setItem("medicine", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingCartItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingCartItem) {
      return Swal.fire({
        icon: "error",
        title: "This item is already in the cart!",
      });
      
    }

    const updatedCart = [...cart, item];
    setCart(updatedCart);

    Swal.fire({
      icon: "success",
      title: "Item added to cart!",
    });
  };

 const removeCart = (item) => {
  const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
  setCart(updatedCart);

  Swal.fire({
    icon: "success",
    title: "Item removed from cart!",
  });
};


  const data = {
    cart,
    addToCart,
    removeCart
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default AddToCarProvider;
