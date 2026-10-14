
export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
};


export type ProductSummary = Pick<Product, "name" | "price">;


export type CreateProductDTO = Omit<Product, "id" | "createdAt">;


export type UpdateProductDTO = Partial<CreateProductDTO>;

export type StoredProduct = Readonly<Product>;
