import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios";
import { useCartStore } from "../store/useCartStore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCartStore();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)]">
      {/* Left: Image */}
      <div className="bg-gray-50 h-full flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[80vh] object-contain shadow-sm"
        />
      </div>

      {/* Right: Details */}
      <div className="p-8 md:p-16 flex flex-col justify-center max-w-xl">
        <span className="text-sm text-gray-400 uppercase tracking-widest mb-2">
          {product.category}
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {product.name}
        </h1>
        <p className="text-2xl font-light mb-8">₹ {product.price}</p>

        <p className="text-gray-600 leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="mb-8">
          <p className="text-sm font-bold mb-3 uppercase">Select Size</p>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border flex items-center justify-center text-sm font-medium transition-all
                  ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedSize) {
              addToCart(product, selectedSize, 1);
              alert("Added to cart");
            } else {
              alert("Please select a size");
            }
          }}
          className="swiss-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
