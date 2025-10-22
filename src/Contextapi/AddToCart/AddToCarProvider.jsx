import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "./cartContext";
import { toast } from "react-toastify";

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
      return toast.error( "This item is already in the cart!")
    }

    const updatedCart = [...cart, item];
    setCart(updatedCart);
    toast.success("Item added to cart!")
    
  };

  const removeCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
    toast.success("Item removed from cart!")
  };

  const allDelete = () => {
    if (cart.length === 0) {
      toast.error("Your cart is already empty!")
    }

    Swal.fire({
      title: "Are you sure?",
      text: "All items will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        toast.success("Cleared!", "Your cart is now empty.", "success")
      }
    });
  };

  const data = {
    cart,
    addToCart,
    removeCart,
    allDelete
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default AddToCarProvider;
