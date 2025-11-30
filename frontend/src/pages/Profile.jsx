import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { Package, User, LogOut } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // --- Status Logic ---
  // Define the progression of steps
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];

  // Helper Component for the Glowing Tracker
  const StatusTracker = ({ currentStatus }) => {
    // Find index, default to 0 if unknown
    const currentIndex =
      steps.indexOf(currentStatus) !== -1 ? steps.indexOf(currentStatus) : 0;

    return (
      <div className="w-full py-6">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />

          {/* Connecting Line Progress (Green) */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={step}
                className="flex flex-col items-center bg-white px-2"
              >
                {/* THE BULB */}
                <div
                  className={`
                    w-4 h-4 rounded-full border-2 transition-all duration-300 z-10
                    ${
                      isCompleted
                        ? "bg-black border-black"
                        : "bg-white border-gray-300"
                    }
                    ${isCurrent ? "ring-4 ring-black/20 scale-125" : ""}
                    ${
                      isCurrent ? "shadow-[0_0_15px_rgba(0,0,0,0.5)]" : ""
                    } /* The Glow Effect */
                  `}
                />

                {/* Label */}
                <span
                  className={`
                    absolute top-6 text-[10px] font-bold uppercase tracking-widest mt-2
                    ${isCompleted ? "text-black" : "text-gray-400"}
                  `}
                  // Positioning hack to center text under bulb
                  style={{
                    transform: "translateX(-50%)",
                    left: `${(index / (steps.length - 1)) * 100}%`,
                    marginLeft:
                      index === 0
                        ? "10px"
                        : index === steps.length - 1
                        ? "-10px"
                        : "0",
                  }}
                >
                  {/* Only show label on desktop to save space, or use short codes */}
                  <span className="hidden md:block">{step}</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Status Text (Shown only on small screens below the bar) */}
        <div className="md:hidden text-center mt-6 text-xs font-bold uppercase tracking-widest">
          Status: {currentStatus}
        </div>
      </div>
    );
  };

  if (!user) return <div className="p-10">Please log in.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tighter mb-10 uppercase border-b border-black pb-4">
        My Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* --- LEFT: Profile Card --- */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 border border-gray-100 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-bold rounded-none">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide">
                  Hello,
                </p>
                <p className="text-lg font-bold tracking-tight">{user.name}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                  Email
                </label>
                <p className="font-medium text-sm">{user.email}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                  User ID
                </label>
                <p className="font-medium text-sm truncate">{user._id}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest py-3 border border-gray-200 hover:bg-black hover:text-white transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* --- RIGHT: Order History --- */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" /> Past Orders
          </h2>

          {loading ? (
            <p className="text-sm text-gray-400 animate-pulse">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-200">
              <p className="text-gray-500 mb-4">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border-b border-gray-100 pb-12 last:border-0 last:pb-0"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                        Order ID
                      </p>
                      <p className="font-mono text-sm font-bold">
                        #{order._id.slice(-6)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                        Total
                      </p>
                      <p className="font-medium text-sm">
                        ₹ {order.totalPrice}
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="bg-gray-50 p-4 mb-8 text-sm">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1">
                        <span className="text-gray-600">
                          {item.qty}x {item.name}{" "}
                          <span className="text-gray-400 text-xs">
                            ({item.size})
                          </span>
                        </span>
                        <span className="font-medium">₹ {item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* THE GLOWING BULB TRACKER */}
                  <div className="px-2 mb-4">
                    <StatusTracker currentStatus={order.status || "Pending"} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
