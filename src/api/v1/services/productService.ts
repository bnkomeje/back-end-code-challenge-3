export type Category = "electronics" | "clothing" | "food" | "tools" | "other";

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: Category;
  createdAt: string;
}

export type CreateProductInput = Omit<Product, "id" | "createdAt">;

let products: Product[] = [];

// POST /products
export const createProduct = async (input: CreateProductInput): Promise<Product> => {
  const newProduct: Product = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  products.push(newProduct);
  return newProduct;
};

// DELETE /products/:id
export const deleteProduct = async (id: string): Promise<boolean> => {
  const before = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < before;
};
