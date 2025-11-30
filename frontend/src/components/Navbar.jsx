import { ShoppingBag, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { cart } = useCartStore();
  const { user, logout } = useAuthStore();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
          Unify.
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-1 hover:text-gray-600"
            >
              <User className="w-5 h-5 stroke-[1.5px]" />
              {/* Optional: Show name on desktop */}
              <span className="hidden md:block text-xs font-bold uppercase tracking-wide ml-1">
                {user.name.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <User className="w-5 h-5 stroke-[1.5px]" />
            </Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
