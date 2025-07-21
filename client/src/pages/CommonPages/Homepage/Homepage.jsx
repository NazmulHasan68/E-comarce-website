import React from "react";
import ProductCarousel from "@/components/Common/ProductCarousel";
import VerticalProductCarousel from "@/components/Common/VerticalProductCarousel";
import HomeStyleshCart from "./HomeStyleshCart";
import AdsCarousel from "@/components/Common/AdsCarousel";
import { ads } from "@/components/Common/data";
import { getAllCategoryProducts } from "@/components/hook/useAllCategoryProducts";
import Homepopular from "./Homepopular";
import HomeSuggested from "./HomeSugessted";
import HomeBanner from "./Homebanner";
import HomeCategory from "./HomeCategory";

export default function Homepage() {
  const allCategoryData = getAllCategoryProducts();

  return (
    <div className="bg-[var(--primary-bg-color)] w-full py-16">
      <HomeBanner />
      <HomeCategory />
      <Homepopular />
      <HomeSuggested />
      <AdsCarousel data={ads} />

      {allCategoryData.map(({ category, products }, i) => {
        const mod = i % 7;

        return (
          <div key={i}>
            {mod === 0 && (
              <ProductCarousel data={products} title={category} />
            )}

            {mod === 1 && (
              <VerticalProductCarousel data={products} title={category} />
            )}

           {mod === 2 && (
              <HomeStyleshCart data={products} title={category} />
            )}

            {mod === 3 && (
              <AdsCarousel data={ads} />
            )}

            {mod === 4 && (
              <HomeStyleshCart data={products} title={category} />
            )}

             {mod === 5 && (
              <VerticalProductCarousel data={products} title={category} />
            )}
            
            {mod === 6 && (
              <HomeStyleshCart data={products} title={category} />
            )}
          </div>
        );
      })}

    </div>
  );
}




// import React, { useEffect } from "react";
// import Homebanner from "./Homebanner";
// import HomeCategory from "./HomeCategory";
// import Homepopular from "./Homepopular";
// import HomeSugessted from "./HomeSugessted";
// import ProductCarousel from "@/components/Common/ProductCarousel";
// import VerticalProductCarousel from "@/components/Common/VerticalProductCarousel";
// import AdsCarousel from "@/components/Common/AdsCarousel";
// import HomeStyleshCart from "./HomeStyleshCart";
// import { ads } from "@/components/Common/data";
// import useCategoryProducts from "@/components/hook/useCategoryProducts";
// import { category } from "@/components/Common/data";

// export default function Homepage() {

//   useEffect(()=>{
//     const category = useCategoryProducts(category)
//   })
//   const shoulder = useCategoryProducts("Drop shoulder");
//   const panjabi = useCategoryProducts("Panjabi");
//   const shirts = useCategoryProducts("Shirt");
//   const hoodies = useCategoryProducts("Hoodie");

//   return (
//     <div className="bg-[var(--primary-bg-color)] w-full py-16">
//       <Homebanner />
//       <HomeCategory />
//       <Homepopular />
//       <HomeSugessted />
//       <AdsCarousel data={ads} />


//       <ProductCarousel data={tshirts} title="T-shirt" />
//       <VerticalProductCarousel data={shoulder} title="Drop shoulder" />

//       <AdsCarousel data={ads} />

//       <HomeStyleshCart data={panjabi} title="Panjabi" />
//       <VerticalProductCarousel data={shirts} title="Shirt" />
//       <ProductCarousel data={hoodies} title="Hoodie" />

//       <AdsCarousel data={ads} />
//     </div>
//   );
// }
