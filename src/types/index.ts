export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  variants: string[];
  inStock: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: string, qty: number) => void;
}

export interface CartItem {
  product: Product;
  variant: string;
  qty: number;
}
