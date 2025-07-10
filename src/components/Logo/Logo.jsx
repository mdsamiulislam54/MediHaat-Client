import { CiMedicalCase } from "react-icons/ci";
const Logo = ({color='text-gray-100'}) => {
  return (
    <div>
      <div className={`flex justify-center items-center text-2xl font-bold ${color}`}>
        <CiMedicalCase size={30} className={color} />
        MediHaat
      </div>
    </div>
  )
}

export default Logo