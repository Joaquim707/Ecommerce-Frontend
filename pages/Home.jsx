import * as React from "react";
import ContainerFullWidth from "../src/layouts/ContainerFullWidth";
import DiscountBanner from "../src/components/DiscountBanner";
import ImageSlider from "../src/components/ImageSlider";
import PromoCarousel from "../src/components/PromoCarousel";
import ShopByCategory from "../src/components/ShopByCategory";
import Footer from "../src/components/Footer";
import PromoCarouselSpace from "../src/components/PromoCarouselSpace";

export default function Home() {
  return (
    <ContainerFullWidth>
      <DiscountBanner />

      <ImageSlider />

      <PromoCarousel title={"RISING STARS"} height={"503px"} />

      <PromoCarouselSpace title={"LUXE GRAND REDUCTION DEALS"} />

      <PromoCarousel title={"MEDAL WORTHY BRANDS TO BAG"} height={"420px"} />

      <PromoCarousel title={"GRAND GLOBAL BRANDS"} height={"420px"} />

      <ShopByCategory />
    </ContainerFullWidth>
  );
}
