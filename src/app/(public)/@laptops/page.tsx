import Slider from "@/components/common/mySlider";

export default async function Page() {
  const products = await fetch(
    "https://fakestoreapi.com/products?limit=10"
  ).then((res) => {
    console.log("recall api");
    return res.json();
  });
  return (
    <>
      <Slider products={products} />
    </>
  );
}
