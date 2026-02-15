import { type Product } from "../types";

export const MockProducts: Product[] = [
  {
    id: "1",
    name: "Beige Wool Sweater",
    price: 40.0,
    image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=765&auto=format&fit=crop",
    category: "Apparel",
    variants: ["Size 40", "Size 42", "Size 44"],
    inStock: true,
  },
  {
    id: "2",
    name: "White Cotton T-Shirt",
    price: 22.0,
    image: "https://images.unsplash.com/photo-1713881676551-b16f22ce4719?q=80&w=687&auto=format&fit=crop",
    category: "Apparel",
    variants: ["Natural", "Black"],
    inStock: true,
  },
  {
    id: "3",
    name: "Jeans Jacket",
    price: 70.0,
    image: "https://images.unsplash.com/photo-1741941171881-40832346c7fe?q=80&w=735&auto=format&fit=crop",
    category: "Apparel",
    variants: ["XS", "S", "M"],
    inStock: false,
  },
  {
    id: "4",
    name: "3 T-Shirt Pack",
    price: 50.0,
    image: "https://images.unsplash.com/photo-1720514496333-2c552e9ee5f2?q=80&w=687&auto=format&fit=crop",
    category: "Apparel",
    variants: ["XS", "S", "M"],
    inStock: false,
  },
];

export const MockCategories: string[] = ["Apparel"];