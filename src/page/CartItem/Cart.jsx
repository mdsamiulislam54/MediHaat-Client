import { useContext, useState } from "react";
import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeCart, allDelete } = useContext(CartContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Handle Single Select
  const handleSelect = (item) => {
    if (selectedItem && selectedItem._id === item._id) {
      setSelectedItem(null); // আবার ক্লিক করলে unselect হবে
    } else {
      setSelectedItem(item); // নতুন item select হবে
      setQuantities((prev) => ({
        ...prev,
        [item._id]: prev[item._id] || 1,
      }));
    }
  };

  // Quantity Increase / Decrease
  const handleIncrease = (id, stock) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] >= stock ? stock : (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Checkout function
  const handleCheckout = (id) => {
    navigate(`/checkout/${id}`);
  };

  console.log("Selected Item:", selectedItem);
  return (
    <div className="custom-container px-4 py-8 min-h-screen">
      <PageTitle title={"Cart"} />
      {cart.length !== 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={allDelete}
            className="flex justify-center items-center font-bold border p-2 rounded-md border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <MdDeleteForever />
            All Delete
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-gray-600 flex justify-center items-center min-h-screen flex-col gap-4">
          <p className="text-3xl">Your cart is empty.</p>
          <Link
            to={"/shop"}
            className="border border-primary p-2 rounded-md font-bold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Add Item
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Cart Table */}
          <div className="w-full">
            <div className="overflow-x-auto w-full">
              <table className="table w-full shadow-lg">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Select</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">After Discount</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const isSelected = selectedItem?._id === item._id;
                    return (
                      <tr key={item._id} className="border-t">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelect(item)}
                            className="checkbox checkbox-sm"
                          />
                        </td>
                        <td className="p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 object-contain"
                          />
                        </td>
                        <td className="p-3 font-semibold">{item.name}</td>
                        <td className="p-3">${item.price}</td>
                        <td className="p-3">
                          {isSelected ? (
                            <div className="flex items-center rounded w-fit">
                              <button
                                onClick={() => handleDecrease(item._id)}
                                className="px-3 py-1 bg-gray-100 text-lg"
                              >
                                -
                              </button>
                              <span className="px-4">
                                {quantities[item._id] || 1}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncrease(item._id, item.stock)
                                }
                                className="px-3 py-1 text-lg"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-3">
                          $
                          {(
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed(2)}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => removeCart(item)}
                            className="text-accent cursor-pointer"
                          >
                            <MdDeleteForever size={22} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="shadow p-5 rounded-lg space-y-2 w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-3">Order Summary</h3>

            {selectedItem ? (
              <>
                <p className="text-base font-medium flex justify-between">
                  Quantity: <span>{quantities[selectedItem._id] || 1}</span>
                </p>
                <p className="text-base font-medium flex justify-between">
                  Price: <span>${selectedItem.price.toFixed(2)}</span>
                </p>
                <p className="text-base font-medium flex justify-between">
                  Discount: <span>{selectedItem.discount}%</span>
                </p>
                <p className="text-lg font-bold border-t py-4 border-primary flex justify-between">
                  Payable:{" "}
                  <span>
                    $
                    {(
                      (selectedItem.price -
                        (selectedItem.price * selectedItem.discount) / 100) *
                      (quantities[selectedItem._id] || 1)
                    ).toFixed(2)}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Please select a product.
              </p>
            )}

            <Button
              onClick={() => {
                if (!selectedItem) {
                  toast.error("Please select one product to checkout!");
                  return;
                }
                handleCheckout(selectedItem._id);
              }}
              className="w-full"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
