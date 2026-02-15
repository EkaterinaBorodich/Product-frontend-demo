import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { type Product, type CartItem } from "./types";

const API_URL = "https://product-bakend-demo.onrender.com";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/products/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `${API_URL}/products?category=${encodeURIComponent(selectedCategory)}`
      : `${API_URL}/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const addToCart = (product: Product, variant: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variant === variant
      );
      if (existing) return prev.map((i) => i === existing ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, variant, qty }];
    });
  };

  const removeFromCart = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-zinc-100 px-6 py-4 flex justify-between items-center">
        <span className="text-sm font-bold tracking-widest uppercase text-zinc-900">Store</span>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-700 hover:text-zinc-900 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition
              ${!selectedCategory
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition
                ${selectedCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-xs text-zinc-400 uppercase tracking-widest py-16">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-xs text-zinc-400 uppercase tracking-widest py-16">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <h2 className="text-sm font-bold tracking-widest uppercase">Cart ({totalItems})</h2>
              <button onClick={() => setCartOpen(false)} className="text-zinc-400 hover:text-zinc-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-xs text-zinc-400 text-center uppercase mt-16">Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-zinc-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.variant} · Qty {item.qty}</p>
                      <p className="text-xs font-bold text-zinc-900 mt-1">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(i)}
                      className="text-zinc-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-zinc-100 space-y-3">
                <div className="flex justify-between text-sm font-bold text-zinc-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-zinc-900 text-white text-xs font-semibold tracking-widest uppercase py-3.5 rounded-xl hover:bg-zinc-700 transition">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
