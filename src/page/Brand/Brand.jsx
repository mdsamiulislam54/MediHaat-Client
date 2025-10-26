"use client";
import { motion } from "framer-motion";

const Brand = () => {
  const brand = [
    {
      name: "Square Pharmaceuticals Ltd",
      brandLogo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Square_pharma80.png",
    },
    {
      name: "Beximco Pharmaceuticals Ltd",
      brandLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Logo_of_Beximco_Pharma_(with_tagline).svg/1280px-Logo_of_Beximco_Pharma_(with_tagline).svg.png",
    },
    {
      name: "Eskayef Pharmaceuticals Ltd (SK+F)",
      brandLogo:
        "https://upload.wikimedia.org/wikipedia/commons/3/36/SKF_NEW_LOGO.png",
    },
    {
      name: "Opsonin Pharma Ltd",
      brandLogo: "https://www.opsonin-pharma.com/images/icons/logo-text.png",
    },
    {
      name: "Navana Pharmaceuticals PLC",
      brandLogo: "https://navanapharma.com/assets/images/logo/logo_2.png",
    },
    {
      name: "Radiant Pharmaceuticals Ltd",
      brandLogo:
        "https://images.seeklogo.com/logo-png/40/1/radiant-pharmaceuticals-logo-png_seeklogo-403632.png",
    },
    {
      name: "Aristopharma PLC",
      brandLogo:
        "https://images.seeklogo.com/logo-png/53/1/aristopharma-plc-logo-png_seeklogo-531958.png",
    },
    {
      name: "Pfizer Inc.",
      brandLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pfizer_logo.svg/1280px-Pfizer_logo.svg.png",
    },
    {
      name: "Johnson & Johnson",
      brandLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Johnson_and_Johnson_Logo.svg/2560px-Johnson_and_Johnson_Logo.svg.png",
    },
    {
      name: "Novartis AG",
      brandLogo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Novartis-Logo.svg/2560px-Novartis-Logo.svg.png",
    },
  ];

  return (
    <div className="py-16 overflow-hidden bg-white">
      <div className="custom-container">
        <h2 className="text-3xl font-bold mb-8 font-syne  lg:text-start text-center">
          Popular Brands
        </h2>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex space-x-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {[...brand, ...brand].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-[150px] rounded-full p-4 bg-white shadow-md my-10"
              >
                <img
                  src={item.brandLogo}
                  alt={item.name}
                  className="w-24 h-24 object-contain hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
