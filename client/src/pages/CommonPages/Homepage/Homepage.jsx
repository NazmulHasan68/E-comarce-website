import React from "react";
import Homebanner from "./Homebanner";
import HomeCategory from "./HomeCategory";
import Homepopular from "./Homepopular";
import HomeSugessted from "./HomeSugessted";
import ProductCarousel from "@/components/Common/ProductCarousel";
import VerticalProductCarousel from "@/components/Common/VerticalProductCarousel";
import AdsCarousel from "@/components/Common/AdsCarousel";
import HomeStyleshCart from "./HomeStyleshCart";
import { ads } from "@/components/Common/data";
import useCategoryProducts from "@/components/hook/useCategoryProducts";

export default function Homepage() {
  const tshirts = useCategoryProducts("T-shirt");
  const shoulder = useCategoryProducts("Drop shoulder");
  const pangabi = useCategoryProducts("Pangabi");
  const shirts = useCategoryProducts("Shirt");
  const hoodies = useCategoryProducts("Hoodie");

  return (
    <div className="bg-[var(--primary-bg-color)] w-full py-16">
      <Homebanner />
      <HomeCategory />
      <Homepopular />
      <HomeSugessted />

      <AdsCarousel data={ads} />

      <ProductCarousel data={tshirts} title="T-shirt" />
      <VerticalProductCarousel data={shoulder} title="Drop shoulder" />

      <AdsCarousel data={ads} />

      <HomeStyleshCart data={pangabi} title="Pangabi" />
      <VerticalProductCarousel data={shirts} title="Shirt" />
      <ProductCarousel data={hoodies} title="Hoodie" />

      <AdsCarousel data={ads} />
    </div>
  );
}
