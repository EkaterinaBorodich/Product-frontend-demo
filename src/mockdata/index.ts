import { type Product } from "../types";
export const Products: Product[] = [
  {
    id: "1",
    name: "Beige Wool Sweater",
    price: 40.0,
    image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { id: "1-s", label: "Size 40", inStock: true },
      { id: "1-m", label: "Size 42", inStock: true },
      { id: "1-l", label: "Size 44", inStock: false },
    ],
  },
  {
    id: "2",
    name: "White Cotton T-Shirt",
    price: 22.0,
    image: "https://images.unsplash.com/photo-1713881676551-b16f22ce4719?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { id: "2-nat", label: "Natural", inStock: true },
      { id: "2-blk", label: "Black", inStock: false },
    ],
  },
  {
    id: "3",
    name: "Jeans Jacket",
    price: 70.0,
    image: "https://images.unsplash.com/photo-1741941171881-40832346c7fe?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { id: "3-xs", label: "XS", inStock: false },
      { id: "3-s",  label: "S",  inStock: false },
      { id: "3-m",  label: "M",  inStock: false },
    ],
  },
  {
    id: "4",
    name: "3 T-Shirt Pack",
    price: 50.0,
    image: "https://images.unsplash.com/photo-1720514496333-2c552e9ee5f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { id: "4-xs", label: "XS", inStock: false },
      { id: "4-s",  label: "S",  inStock: false },
      { id: "4-m",  label: "M",  inStock: false },
    ],
  },
];