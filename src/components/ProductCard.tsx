import { useState } from "react";
import { type ProductCardProps } from "../types";


export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const isAvailable = product.inStock;

  const handleAdd = () => {
    if (!isAvailable) return;
    onAddToCart(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full">
      <div className="relative overflow-hidden bg-zinc-100 aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-zinc-800 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex flex-col flex-1 gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 h-10">{product.name}</h3>
          <span className="text-sm font-bold text-zinc-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Variant Dropdown */}
        <select
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          disabled={!isAvailable}
          className="w-full text-xs border border-zinc-200 rounded-lg px-3 py-2 text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.variants.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <div className="flex-1" />
        <div className="flex items-center justify-between border border-zinc-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={!isAvailable}
            className="w-10 h-9 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 transition text-base leading-none"
          >
            −
          </button>
          <span className="text-xs font-semibold text-zinc-900 tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            disabled={!isAvailable}
            className="w-10 h-9 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 transition text-base leading-none"
          >
            +
          </button>
        </div>
          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            disabled={!isAvailable}
            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200
              ${
                !isAvailable
                  ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                  : added
                  ? "bg-green-500 text-white scale-95"
                  : "bg-zinc-900 text-white hover:bg-zinc-700 active:scale-95"
              }`}
          >
            {!isAvailable ? "Out of Stock" : added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
  );
}
