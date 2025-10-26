

import { Link, useLoaderData, useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
const MedicineDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleCheckout = (id) => {
    navigate(`/checkout/${id}`)
  }

  console.log(data.productDetails);
  return (
    <div className="z-100  min-h-screen pb-10">

      <div className="custom-container">
        <BackButton />
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="shadow">
            <img
              src={data.image}
              alt={data.medicineName}
              className="w-full h-[400px] object-contain"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold mb-4 font-syne">{data.metaTitle}</h2>
            <p className="text-md font-bold   ">
              Per Tablets: <span className="font-bold text-lg"> ৳ {data.discountPrice
              }</span> <span className="line-through text-gray-600"> {data.price
              }</span>
            </p>
            <p>
              <span className="font-semibold">Brand:</span> {data.brand}

            </p>
            <p className="">
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            {/* rating */}
            <div className="flex items-center ">
              <span className="mr-2 font-semibold">Rating:</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i < Math.floor(data.rating) ? "green" : "#e5e7eb"}
                    className="w-4 h-4"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.382-2.46a1 1 0 00-1.175 0l-3.382 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* strength */}
            <p>
              <span className="font-semibold">Strength:</span> {data.strength}
            </p>
            {/* stock */}

            <p>
              <span className="font-semibold">Stock:</span> {data.stock > 0 ? (
                <span className="text-green-600 font-bold">In Stock ({data.stock} available)</span>
              ) : (
                <span className="text-red-600 font-bold">Out of Stock</span>
              )}
            </p>
            {/* dosageForm */}
            <p>
              <span className="font-semibold">Dosage Form:</span> {data.dosageForm}
            </p>
            {/* launchDate */}
            <p>

              <span className="font-semibold">Launch Date:</span> {data.launchDate}
            </p>
            {/* shortDescription */}
            <p>
              <span className="font-semibold">Description:</span> {data.shortDescription}
            </p>

            <Button children={"Buy Now"} onClick={() => handleCheckout(data._id)} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4 font-syne">Detailed Description</h3>
          <p className="text-justify font-syne tracking-wide">{data.description}  consectetur adipisicing elit. Suscipit cupiditate quia dolores possimus sunt veritatis rerum voluptatem cumque, alias earum impedit corporis architecto accusantium necessitatibus voluptatum libero enim omnis illo?</p>

          <div>
            <h3 className="text-2xl font-semibold my-4 font-syne">Usage Instructions</h3>
            <ul>
              {data?.productDetails?.dosageAdministration?.map((instruction, index) => (
                <li key={index} className="list-disc ml-6 mb-2">{instruction.userType}: {instruction.instruction
                }</li>
              ))}
            </ul>
          </div>
          {/* indications */}
          <div>
            <h3 className="text-2xl font-semibold my-4 font-syne">Indications</h3>
            <ul>
              {data?.productDetails?.indications?.map((indication, index) => (
                <li key={index} className="list-disc ml-6 mb-2">{indication.title}: {indication.description}</li>
              ))}
            </ul>
          </div>

          {/* commonQuestions */}
          <div>
            <h3 className="text-2xl font-semibold my-4 font-syne">Common Questions</h3>
            <ul>
              {data?.productDetails?.commonQuestions?.map((question, index) => (
                <li key={index} className="mb-4">
                  <p className="font-semibold font-syne">Q: {question.question}</p>
                  <p className="ml-4">A: {question.answer}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
