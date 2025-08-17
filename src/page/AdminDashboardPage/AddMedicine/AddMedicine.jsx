import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const AddMedicineForm = () => {
    const { user } = UserAuth();
    const axiosinstanceCall = useAxiosSecure();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tags: [""],
            indications: [""],
            interaction: [""],
            commonQuestions: [""],
            reviews: [],
        },
    });

    // Field arrays
    const { fields: tagsFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: "tags",
    });

    const { fields: indicationsFields, append: appendIndication, remove: removeIndication } =
        useFieldArray({ control, name: "indications" });

    const { fields: interactionFields, append: appendInteraction, remove: removeInteraction } =
        useFieldArray({ control, name: "interaction" });

    const { fields: commonQuestionsFields, append: appendQuestion, remove: removeQuestion } =
        useFieldArray({ control, name: "commonQuestions" });

    const onSubmit = (data) => {
        console.log(data)

    };

    const categories = [
        "Painkiller",
        "Antibiotic",
        "Vitamin",
        "Baby Care",
        "Heart Care",
        "Ayurveda & Herbal",
        "Women's Health",
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
            <PageTitle title="Add Medicine" />
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <IoAddCircleOutline /> Add New Medicine
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <input {...register("name", { required: "Medicine name is required" })} type="text" placeholder="Medicine Name" className="input input-bordered w-full" />
                <input {...register("genericName", { required: "Generic name is required" })} type="text" placeholder="Generic Name" className="input input-bordered w-full" />

                <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                    <option value="">Select Category</option>
                    {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>

                <select {...register("medicineType", { required: "Type is required" })} className="select select-bordered w-full">
                    <option value="">Select Type</option>
                    <option value="Prescription">Prescription</option>
                    <option value="OTC">OTC</option>
                </select>

                <input {...register("manufacturer", { required: "Manufacturer name is required" })} type="text" placeholder="Manufacturer" className="input input-bordered w-full" />
                <input {...register("expiryDate", { required: "Expiry date is required" })} type="date" className="input input-bordered w-full" />
                <input {...register("price", { required: "Price is required" })} type="number" placeholder="Price (৳)" className="input input-bordered w-full" />
                <input {...register("stock", { required: "Stock is required" })} type="number" placeholder="Stock (pcs)" className="input input-bordered w-full" />
                <input {...register("imageURL", { required: "Image URL is required" })} type="text" placeholder="Image URL" className="input input-bordered w-full" />
                <input {...register("discount")} type="number" placeholder="Discount (%)" className="input input-bordered w-full" />
                <input {...register("sellerEmail")} type="email" placeholder="Seller Email" value={user?.email} className="input input-bordered w-full" />
                <input {...register("sellerName")} type="text" placeholder="Seller Name" value={user?.displayName} className="input input-bordered w-full" />

                {/* Description */}
                <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered w-full md:col-span-2" rows={3}></textarea>

                {/* Tags */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Tags</h3>
                    {tagsFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2 items-center">
                            <input {...register(`tags.${index}`)} placeholder="Tag" className="input input-bordered w-2/3" />
                            <button type="button" className="btn btn-error" onClick={() => removeTag(index)}><IoRemoveCircleOutline /></button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={() => appendTag("")}><IoAddCircleOutline /> Add Tag</button>
                </div>

                {/* Indications */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Indications</h3>
                    {indicationsFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2 items-center">
                            <input {...register(`indications.${index}`)} placeholder="Indication" className="input input-bordered w-2/3" />
                            <button type="button" className="btn btn-error" onClick={() => removeIndication(index)}><IoRemoveCircleOutline /></button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={() => appendIndication("")}><IoAddCircleOutline /> Add Indication</button>
                </div>

                {/* Dosage Administration */}
                <textarea {...register("dosageAdministration")} placeholder="Dosage & Administration" className="textarea textarea-bordered w-full md:col-span-2" rows={3}></textarea>

                {/* Interaction */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Interaction</h3>
                    {interactionFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2 items-center">
                            <input {...register(`interaction.${index}`)} placeholder="Interaction" className="input input-bordered w-2/3" />
                            <button type="button" className="btn btn-error" onClick={() => removeInteraction(index)}><IoRemoveCircleOutline /></button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={() => appendInteraction("")}><IoAddCircleOutline /> Add Interaction</button>
                </div>

                {/* Common Questions */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Common Questions</h3>
                    {commonQuestionsFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2 items-center">
                            <input {...register(`commonQuestions.${index}`)} placeholder="Question" className="input input-bordered w-2/3" />
                            <button type="button" className="btn btn-error" onClick={() => removeQuestion(index)}><IoRemoveCircleOutline /></button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={() => appendQuestion("")}><IoAddCircleOutline /> Add Question</button>
                </div>

                {/* Boolean & Other Fields */}
                <div className="flex flex-wrap gap-4 md:col-span-2">
                    <label className="flex items-center gap-2"><input type="checkbox" {...register("featured")} className="checkbox" /> Featured</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register("specialOffer")} className="checkbox" /> Special Offer</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register("isNewArrival")} className="checkbox" /> New Arrival</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register("isTrending")} className="checkbox" /> Trending</label>
                </div>

                <input {...register("launchDate")} type="date" placeholder="Launch Date" className="input input-bordered w-full" />
                <input {...register("salesCount")} type="number" placeholder="Sales Count" className="input input-bordered w-full" />
                <input {...register("viewsCount")} type="number" placeholder="Views Count" className="input input-bordered w-full" />
                <input {...register("rating")} type="number" step="0.1" min={0} max={5} placeholder="Rating (0-5)" className="input input-bordered w-full" />

                {/* Submit */}
                <button type="submit" className="btn btn-primary md:col-span-2">
                    Add Medicine
                </button>

            </form>
        </div>
    );
};

export default AddMedicineForm;
