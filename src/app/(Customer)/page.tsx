import Carousel from "@/components/common/carousel";
import Services from "@/components/common/landingPage/services";
import ProductCard from "@/components/common/product/productCard";
import ProductsSection from "@/components/common/sections/productsSections";
import ProductsSlider from "@/components/common/sliders/productsSlider";

export default async function Page() {
  const products = await fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  return (
    <>
      <div>
        <div className="grid grid-flow-row-dense grid-cols-3 ...">
          <div className="col-span-2">
            <Carousel />
          </div>
          <div>
            <Carousel />
            <Carousel />
          </div>
        </div>
        <ProductsSection name="Top Selling Products">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <ProductsSection name="New Arrivals">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <ProductsSection name="On Sale">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <div className="divider">Our Services.</div>
        <Services />
        <ProductsSection name="Mobile Phones.">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <ProductsSection name="Accessories.">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <ProductsSection name="Laptops.">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
        <ProductsSection name="Gaming.">
          <ProductsSlider>
            {products?.map((product:any) => <ProductCard key={product.id} {...product} />)}
          </ProductsSlider>
        </ProductsSection>
      </div>
    </>
  );
}
