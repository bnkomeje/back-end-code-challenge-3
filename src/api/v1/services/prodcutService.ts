import { Product } from "../models/productModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const PRODUCTS_COLLECTION = "products";

export type CreateProductDTO = {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: Product["category"];
};

const toDateSafe = (value: any): Date => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate(); // Firestore Timestamp
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
};

const snapshotToProduct = (id: string, data: any): Product => ({
  id,
  name: data.name,
  sku: data.sku,
  quantity: data.quantity,
  price: data.price,
  category: data.category,
  createdAt: toDateSafe(data.createdAt),
  updatedAt: toDateSafe(data.updatedAt),
});

export const createProduct = async (data: CreateProductDTO): Promise<Product> => {
  const now = new Date();

  // Your repo returns ONLY the created doc id (string)
  const id = await firestoreRepository.createDocument<Omit<Product, "id">>(
    PRODUCTS_COLLECTION,
    {
      ...data,
      createdAt: now,
      updatedAt: now,
    }
  );

  // Read back to return full created product
  const snap = await firestoreRepository.getDocumentById(PRODUCTS_COLLECTION, id);

  if (!snap || !snap.exists) {
    return { id, ...data, createdAt: now, updatedAt: now };
  }

  return snapshotToProduct(snap.id, snap.data());
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const snap = await firestoreRepository.getDocumentById(PRODUCTS_COLLECTION, id);

  if (!snap || !snap.exists) return false;

  await firestoreRepository.deleteDocument(PRODUCTS_COLLECTION, id);
  return true;
};
