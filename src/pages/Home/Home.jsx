import Hero from "../../components/Home/Hero";
import Categories from "../../components/Home/Categories";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import OfferBanner from "../../components/Home/OfferBanner";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import Testimonials from "../../components/Home/Testimonials";
import Newsletter from "../../components/Home/Newsletter";
import Deals from "../../components/Home/Deals";
import BestSellers from "../../components/Home/BestSellers";




const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <OfferBanner />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;