import AboutTheBuilding from "../components/AboutTheBuilding";
import Banner from "../components/Banner";
import CouponsSection from "../components/CouponsSection";
import FAQSection from "../components/FAQSection";
import HowItWorks from "../components/HowItWorks";
import LocationSection from "../components/LocationSection";
import WhyChooseUs from "../components/WhyChooseUs";


const Home = () => {
  
  return (
    <div>
      <Banner/>
      <AboutTheBuilding/>
      <CouponsSection/>
      <WhyChooseUs/>
      <HowItWorks/>
      <LocationSection/>
      <FAQSection/>
    </div>
  );
};

export default Home;