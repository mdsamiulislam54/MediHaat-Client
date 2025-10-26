
import { Link, useNavigate } from 'react-router'
import { IoIosArrowRoundBack } from "react-icons/io";
const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
  return (
    <button onClick={handleBack}>
      <button className="flex items-center text-sm font-syne text-green-600 font-semibold hover:underline bg-gray-100 p-1 rounded-box my-4 cursor-pointer">
       <IoIosArrowRoundBack size={24} />  <span className="ml-1">Back to Shop</span>
      </button>
    </button>
  )
}

export default BackButton