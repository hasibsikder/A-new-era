import { 
  products, 
  orders, 
  contacts, 
  newsletters,
  type Product, 
  type InsertProduct,
  type Order, 
  type InsertOrder,
  type Contact, 
  type InsertContact,
  type Newsletter, 
  type InsertNewsletter 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  createNewsletterSubscriber(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeProducts().catch(console.error);
  }

  private async initializeProducts() {
    const existingProducts = await this.getProducts();
    if (existingProducts.length > 0) return;

    const sampleProducts: InsertProduct[] = [
      {
        name: "Wireless Headphones",
        description: "Premium audio experience with noise cancellation",
        price: "199.99",
        originalPrice: "249.99",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        category: "electronics",
        rating: "4.9",
        inStock: true,
      },
      // ... other sample products
    ];

    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }

  async getProducts(): Promise<Product[]> {
    const result = await db.select().from(products);
    return result;
  }

  // ... other DatabaseStorage methods
}

class MemStorage implements IStorage {
    private products: Map<number, Product> = new Map();
    // ... other in-memory storage implementations
}

let storage: IStorage;

if (db) {
  try {
    storage = new DatabaseStorage();
    console.log('Using database storage');
  } catch (error) {
    console.warn('Database storage failed, using in-memory storage');
    storage = new MemStorage();
  }
} else {
  console.log('Using in-memory storage');
  storage = new MemStorage();
}

export { storage };
