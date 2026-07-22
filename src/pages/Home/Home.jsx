import Hero from "../../components/Home/Hero";
import Categories from "../../components/Home/Categories";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import OfferBanner from "../../components/Home/OfferBanner";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import Testimonials from "../../components/Home/Testimonials";
import Newsletter from "../../components/Home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <OfferBanner />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;