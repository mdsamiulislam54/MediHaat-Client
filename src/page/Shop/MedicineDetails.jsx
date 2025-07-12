import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaWindowClose } from "react-icons/fa";
import Button from "../../components/Button/Button";

const MedicineDetails = ({ medicine, onClose }) => {
  console.log(medicine);
  return (
    <div className="fixed inset-0 bg-primary/10 flex justify-center items-center z-100 mt-10">
 
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white rounded-lg lg:w-5/12 w-11/12  mx-auto  p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-2xl font-bold"
          >
            <FaWindowClose className="text-primary cursor-pointer"/>
          </button>
          <h2 className="text-2xl font-bold mb-4">{medicine?.name}</h2>
          <img
            src={medicine.imageURL}
            alt={medicine.medicineName}
            className="w-[300px] h-auto object-cover mx-auto rounded mb-4"
          />
          <div className="grid grid-cols-2  place-content-center ">
            <p>
              <strong>Generic Name:</strong> {medicine.genericName}
            </p>
            <p>
              <strong>Category:</strong> {medicine.category}
            </p>
            <p>
              <strong>Manufacturer:</strong> {medicine.manufacturer}
            </p>
            <p>
              <strong>Stock:</strong> {medicine.stock}
            </p>
            <p>
              <strong>Price:</strong> ${medicine.price}
            </p>
            <p>
              <strong>Discount:</strong> {medicine.discount}%
            </p>
            <p>
              <strong>MedicineType:</strong> {medicine.medicineType}
            </p>
            <p>
              <strong>Seller:</strong> {medicine.sellerName}
            </p>
            <p>
              <strong>ExpiryDate:</strong> {medicine.expiryDate}
            </p>
          </div>
          <div className="flex justify-end">
            <Button children={"Add To Cart"}/>
          </div>
        </motion.div>
   
    </div>
  );
};

export default MedicineDetails;
