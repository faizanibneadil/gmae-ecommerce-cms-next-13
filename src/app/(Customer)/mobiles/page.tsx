import ProductCard from "@/components/common/product/productCard";
import ProductsSection from "@/components/common/sections/productsSections";
import ProductsSlider from "@/components/common/sliders/productsSlider";

export default async function Page() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return (
    <div>
      <ProductsSection name="Samsung">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Nokia">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Iphone">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Vivo">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Oppo">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Infinix">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
      <ProductsSection name="Jazz">
        <ProductsSlider>
          {products?.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductsSlider>
      </ProductsSection>
    </div>
  );
}
