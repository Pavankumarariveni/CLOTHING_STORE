import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../lib/axios";
import { Filter, X, ChevronLeft, ChevronRight, Search } from "lucide-react";

const FilterContent = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  category,
  size,
  updateFilter,
  clearAll,
}) => (
  <>
    <div className="mb-8">
      <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Search
      </p>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border-b border-gray-300 py-2 pr-8 text-sm focus:outline-none focus:border-black bg-transparent rounded-none placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 top-2 text-gray-400 hover:text-black"
        >
          <Search size={16} />
        </button>
      </form>
    </div>

    <div className="mb-8">
      <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Category
      </p>
      {["Men", "Women", "Kids"].map((cat) => (
        <label
          key={cat}
          className="flex items-center gap-3 mb-3 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 border border-gray-300 flex items-center justify-center transition-colors ${
              category === cat
                ? "bg-black border-black"
                : "group-hover:border-black"
            }`}
          >
            {category === cat && <div className="w-2 h-2 bg-white" />}
          </div>
          <input
            type="radio"
            name="category"
            checked={category === cat}
            onChange={() => updateFilter("category", cat)}
            className="hidden"
          />
          <span
            className={`text-sm tracking-tight ${
              category === cat ? "font-bold" : "text-gray-600"
            }`}
          >
            {cat}
          </span>
        </label>
      ))}
    </div>

    <div className="mb-8">
      <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
        Size
      </p>
      <div className="flex flex-wrap gap-2">
        {["S", "M", "L", "XL"].map((s) => (
          <button
            key={s}
            onClick={() => updateFilter("size", size === s ? "" : s)}
            className={`w-10 h-10 text-sm font-medium border transition-all ${
              size === s
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-200 hover:border-black"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        onClick={clearAll}
        className="text-xs text-gray-400 mt-4 underline hover:text-black"
      >
        Clear All Filters
      </button>
    </div>
  </>
);

// --- MAIN COMPONENT ---
const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Params
  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const keyword = searchParams.get("keyword") || "";
  const pageParam = searchParams.get("page") || 1;

  // Local Search State
  const [searchTerm, setSearchTerm] = useState(keyword);

  useEffect(() => {
    setSearchTerm(keyword);
  }, [keyword]);

  // Fetch Logic
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          category,
          size,
          keyword,
          page: pageParam,
          limit: 8,
        });
        const { data } = await api.get(`/products?${query.toString()}`);
        setProducts(data.products);
        setPagination({
          page: data.page,
          pages: data.pages,
          total: data.total,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, size, keyword, pageParam]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    if (key !== "page") newParams.set("page", 1);
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilter("keyword", searchTerm);
    setShowMobileFilters(false);
  };

  const clearAll = () => {
    setSearchTerm("");

    setSearchParams({});

    setShowMobileFilters(false);
  };

  const filterProps = {
    searchTerm,
    setSearchTerm,
    handleSearch,
    category,
    size,
    updateFilter,
    clearAll,
  };

  return (
    <div className="flex min-h-screen relative">
      <aside className="w-64 p-8 border-r border-gray-100 hidden md:block fixed h-full overflow-y-auto bg-white z-10">
        <h3 className="font-bold mb-8 tracking-tighter flex items-center gap-2 text-lg uppercase">
          Filters
        </h3>
        <FilterContent {...filterProps} />
      </aside>

      {showMobileFilters && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold uppercase tracking-tight">
              Filters
            </h2>
            <button onClick={() => setShowMobileFilters(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <FilterContent {...filterProps} />
          <button
            onClick={() => setShowMobileFilters(false)}
            className="swiss-btn mt-8 w-full"
          >
            Show Results
          </button>
        </div>
      )}

      <main className="flex-1 md:ml-64 p-6 md:p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Collection
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mt-1">
              {category || (keyword ? `Search: "${keyword}"` : "All Products")}
            </h1>
          </div>

          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-wide border-b border-black pb-1"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400 uppercase tracking-widest text-sm animate-pulse">
            Loading...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">No products found.</p>
            <button onClick={clearAll} className="mt-4 underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 mb-4 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <h3 className="font-medium text-sm tracking-tight leading-none mb-1 group-hover:underline decoration-1 underline-offset-4">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-normal">
                    ₹ {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center">
            <button
              disabled={pagination.page === 1}
              onClick={() => updateFilter("page", Number(pagination.page) - 1)}
              className="flex items-center gap-2 text-sm font-medium disabled:text-gray-300 hover:text-gray-600 transition-colors uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="text-xs font-medium tracking-widest text-gray-400">
              PAGE {pagination.page} OF {pagination.pages}
            </div>
            <button
              disabled={pagination.page === pagination.pages}
              onClick={() => updateFilter("page", Number(pagination.page) + 1)}
              className="flex items-center gap-2 text-sm font-medium disabled:text-gray-300 hover:text-gray-600 transition-colors uppercase tracking-widest"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
