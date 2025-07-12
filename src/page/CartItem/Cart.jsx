import { useContext, useState } from "react";
import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import Button from "../../components/Button/Button";
import { Link } from "react-router";

const Cart = () => {
  const { cart, removeCart } = useContext(CartContext);

  // checkbox selected data state
  const [selectedItems, setSelectedItems] = useState([]);

  // Total Price & Discount for selected items only
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const totalDiscount = selectedItems.reduce(
    (acc, item) => acc + (item.price * item.discount) / 100,
    0
  );

  // checkbox handle
  const handleSelect = (item) => {
    const isSelected = selectedItems.find((i) => i._id === item._id);
    if (isSelected) {
      // already selected — remove it
      const updated = selectedItems.filter((i) => i._id !== item._id);
      setSelectedItems(updated);
    } else {
      // not selected — add it
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select at least one item to checkout!",
      });
      return;
    }

    // pass selectedItems to checkout page — here just showing in alert
    Swal.fire({
      icon: "success",
      title: "Checkout Successful!",
      html: `<b>${selectedItems.length}</b> item(s) purchased. Thank you!`,
    });

    // console.log(selectedItems)
  };
  console.log(selectedItems)

  return (
    <div className="w-11/12 mx-auto px-4 py-8 min-h-screen">
     

      {cart.length === 0 ? (
        <div className="text-gray-600 flex justify-center items-center min-h-screen flex-col gap-4">
                <p className="text-3xl">Your cart is empty.</p>
                <Link to={'/shop'} className="border border-primary p-2 rounded-md font-bold hover:bg-primary hover:text-white transition-all duration-300">Add Item</Link>
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
                    <th className="p-3">Category</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Price ($)</th>
                    <th className="p-3">Discount (%)</th>
                    <th className="p-3">After Discount ($)</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={!!selectedItems.find((i) => i._id === item._id)}
                          onChange={() => handleSelect(item)}
                          className="checkbox checkbox-sm text-primary"
                        />
                      </td>
                      <td className="p-3">
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="h-14 w-14 object-contain"
                        />
                      </td>
                      <td className="p-3 font-semibold">{item.name}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">{item.stock}</td>
                      <td className="p-3">${item.price}</td>
                      <td className="p-3">{item.discount}%</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="shadow p-5 rounded-lg space-y-2   w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-3">Order Summary</h3>
            <p className="text-base font-medium flex justify-between items-center ">Selected: <span>{selectedItems.length}</span></p>
            <p className="text-base font-medium flex justify-between items-center ">
              Total Price: <span>${totalPrice.toFixed(2)}</span>
            </p>
            <p className="text-base font-medium flex justify-between items-center ">
              Total Discount: <span>${totalDiscount.toFixed(2)}</span>
            </p>
            <p className="text-lg font-bold border-t py-4 border-primary flex justify-between items-center ">
              Payable: <span>${(totalPrice - totalDiscount).toFixed(2)}</span>
            </p>
            <Button
              onClick={handleCheckout}
              className="w-full"
              children={" Checkout"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
