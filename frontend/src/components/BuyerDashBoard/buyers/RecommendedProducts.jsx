import ProductCard from "./ProductCard";

const RecommendedProducts = ({ products }) => (
  <div className="bg-white p-4 rounded-xl shadow mt-6">
    <h3 className="font-semibold mb-4">Recommended for You</h3>
    <div className="grid grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </div>
);

export default RecommendedProducts;
