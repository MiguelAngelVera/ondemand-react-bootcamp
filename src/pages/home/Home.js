import BannerApi from "../../components/banner/BannerApi";
import CarouselApi from "../../components/carousel/CarouselApi";
import HomeButton from "../../components/HomeButton";
//import Products from "../../components/products/Products";
import ProductsApi from "../../components/products/ProductsApi";
import Space from "../../components/Space";

const HomePage = () => (
  <>
    <Space></Space>
    <BannerApi></BannerApi>
    <CarouselApi></CarouselApi>
    <ProductsApi></ProductsApi>
    <Space></Space>
    <HomeButton></HomeButton>
  </>
);

export default HomePage;
