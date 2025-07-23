import React from "react";
import ProductCarousel from "@/components/Common/ProductCarousel";
import VerticalProductCarousel from "@/components/Common/VerticalProductCarousel";
import HomeStyleshCart from "./HomeStyleshCart";
import AdsCarousel from "@/components/Common/AdsCarousel";
import { ads, products } from "@/components/Common/data";
import { getAllCategoryProducts } from "@/components/hook/useAllCategoryProducts";
import Homepopular from "./Homepopular";
import HomeSuggested from "./HomeSugessted";
import HomeBanner from "./Homebanner";
import HomeCategory from "./HomeCategory";

export default function Homepage() {
  const allCategoryData = getAllCategoryProducts();

  const propular = products.filter((product)=>product.isPopular)
  const suggested = products.filter((product)=>product.isSuggested)

const handleOnClick = async () => {
  try {
    const response = await fetch(
      "https://cmr.earthdata.nasa.gov/search/granules.json?short_name=OCO2_L2_Lite_FP",
      {
        headers: {
          Authorization: "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6Im5hem11bGhhc2FuIiwiZXhwIjoxNzU4Mzg5MDU0LCJpYXQiOjE3NTMyMDUwNTQsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiIsImlkZW50aXR5X3Byb3ZpZGVyIjoiZWRsX29wcyIsImFjciI6ImVkbCIsImFzc3VyYW5jZV9sZXZlbCI6M30.hVATAl_fJ0krzjJ6Wfa15KGpZT_fHhNqGxEVezO2FUgsIvSjPknAP2fovm51HAZFrHR9qAkHUJirG5tZeERGiW_zka7BoGLW9L3a-XKup5Cg1T6x7U7pffKA6OtBUnIkBW8-FGuKfe0KSM7Pg9YcGt0Fv8g8T_QUpLGzEEghbPa1pfIdEa1onOGwH7FMIVKtov7Kg0Q_2buyWs-jgcqziywBydqk9UHdXIooelfPrlOLaZhVRryqE342ygSTKeOC1mVPYL8fXWl9_kEcrwvNx8BwoG5HYh8W8SYiic5PuljLj30ilQJb-y7x7WnF6WJpqi9v8ttJGhBDzp_0e5dBkw",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("API fetch failed: " + response.status);
    }

    const data = await response.json();
    console.log("CMR Data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};



  return (
    <div className="bg-[var(--primary-bg-color)] w-full py-16">
      <HomeBanner />
      <div onClick={()=>handleOnClick()} className=" cursor-pointer">
        hello bangladesh
      </div>
      <HomeCategory />
      {/* <Homepopular /> */}
      <ProductCarousel data={propular} title={"Popular product"} />
      <VerticalProductCarousel data={suggested} title={"Suggest product"} />
      {/* <HomeSuggested /> */}
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
