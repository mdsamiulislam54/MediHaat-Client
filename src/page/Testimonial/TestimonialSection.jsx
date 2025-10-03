import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sofia Ahmed",
    designation: "Cardiologist",
    image: "https://i.pravatar.cc/150?img=1",
    review:
      "MediHaat provides quick delivery and authentic medicines. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ayesha Rahman",
    designation: "Customer",
    image: "https://i.pravatar.cc/150?img=2",
    review: "Best online pharmacy I've used. Good customer service!",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahim Uddin",
    designation: "Customer",
    image: "https://i.pravatar.cc/150?img=3",
    review:
      "I always get my medicine on time. Website is very easy to use.",
    rating: 4,
  },
  {
    id: 4,
    name: "Dr. Kamal Hasan",
    designation: "Physician",
    image: "https://i.pravatar.cc/150?img=4",
    review: "My patients are now buying safely from MediHaat. Trusted source.",
    rating: 5,
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    designation: "Customer",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "Packaging is excellent and products are always original. Love it!",
    rating: 5,
  },
  {
    id: 6,
    name: "Tanvir Alam",
    designation: "Customer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLqLmx6atP8zfb8PC9C7AZGmKJgu5OahEEEA&s",
    review: "User-friendly site with useful filters. Fast support too!",
    rating: 4,
  },
  {
    id: 7,
    name: "Dr. Rafiq Islam",
    designation: "Surgeon",
    image: "https://i.pravatar.cc/150?img=7",
    review:
      "I've recommended MediHaat to many patients. Quality is assured.",
    rating: 5,
  },
  {
    id: 8,
    name: "Mariya Khatun",
    designation: "Customer",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Great experience. Got medicine even during lockdown.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <div className="custom-container my-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination]}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="pb-10">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center h-full flex flex-col justify-between my-4 ">
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <p className="text-gray-600 italic mb-4">
                “{testimonial.review}”
              </p>
              <div className="flex justify-center mb-2 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
