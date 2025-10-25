
import "swiper/css";
import "swiper/css/pagination";
import Button from "../../components/Button/Button";
import { Link } from "react-router";


const Banner = () => {
  return (
    <div className="w-full relative mx-auto min-h-[100vh] shadow flex justify-center items-center bg-cover" style={{ backgroundImage: `url("https://img.freepik.com/free-photo/doctor-talking-with-his-patient-clinic_1303-19772.jpg?t=st=1761373163~exp=1761376763~hmac=2a122ec8833d4687416c3ae47a46e18a5fc135400926cafa742794acc2292141&w=1480")` }} >
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>
      <div className="custom-container">
        <div className="w-full sm:w-8/12 lg:2/12 text-white z-100 relative space-y-4">
          <p className="font-bold text-sm ">Up to <span className="text-xl font-syne text-primary">30%</span> Off on Heart Care Medicines</p>
          <h1 className="font-bold md:text-5xl text-3xl font-syne ">Trusted brands for cardiac health</h1>
          <p className="text-md">
            Highly effective in managing high blood pressure and supporting overall heart health.
            Recommended by leading cardiologists worldwide for its proven ability to improve
            blood circulation, reduce the risk of heart complications, and promote a healthier lifestyle.
          </p>
          <Link to={"/shop"}>
            <Button children={"Shop Heart Care"} className={"text-white"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
