

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "medihaat");
  formData.append("cloud_name","dcmatsilv" )

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dcmatsilv/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("Image upload failed");
  }
};

export default uploadImageToCloudinary;
