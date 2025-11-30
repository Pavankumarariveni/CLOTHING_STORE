import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { Trash2, Minus, Plus } from "lucide-react"; // Import Icons
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, fetchCart, removeFromCart, updateQuantity } = useCartStore(); // Get updateQuantity

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <h1 className="text-2xl font-bold tracking-tighter mb-8 uppercase border-b pb-4">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/products" className="underline font-bold">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="w-full text-left mb-8">
            <thead className="hidden md:table-header-group">
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                <th className="py-4 font-normal">Product</th>
                <th className="py-4 font-normal">Size</th>
                <th className="py-4 font-normal">Quantity</th>
                <th className="py-4 font-normal">Total</th>
                <th className="py-4 font-normal text-right"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-0 group flex flex-col md:table-row py-4 md:py-0 relative"
                >
                  {/* Product Info */}
                  <td className="py-4 md:py-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        className="w-20 h-24 md:w-16 md:h-16 object-cover bg-gray-100"
                      />
                      <div>
                        <p className="font-bold text-sm uppercase tracking-tight">
                          {item.product.name}
                        </p>
                        <p className="text-gray-500 text-xs md:hidden mb-2">
                          ₹ {item.product.price}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Size */}
                  <td className="py-1 md:py-6 text-sm text-gray-500 md:text-black">
                    <span className="md:hidden text-xs uppercase font-bold mr-2">
                      Size:
                    </span>
                    {item.size}
                  </td>

                  {/* Quantity Control */}
                  <td className="py-4 md:py-6">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.qty + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>

                  {/* Price Calculation */}
                  <td className="py-1 md:py-6 font-medium">
                    <span className="md:hidden text-xs uppercase font-bold mr-2">
                      Total:
                    </span>
                    ₹ {(item.product.price * item.qty).toFixed(2)}
                  </td>

                  {/* Remove Button */}
                  <td className="py-1 md:py-6 md:text-right absolute top-4 right-0 md:static">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col items-end gap-4 mt-8">
            <div className="flex justify-between w-full md:w-64 border-b border-gray-100 pb-2">
              <span className="text-sm uppercase tracking-widest text-gray-500">
                Subtotal
              </span>
              <span className="text-xl font-bold tracking-tight">
                ₹ {total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              to="/checkout"
              className="swiss-btn text-center w-full md:w-64"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
