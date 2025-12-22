
import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  isPrime: boolean;
  bestseller: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userEmail: string; // Added user association
  date: Date;
  items: CartItem[];
  total: number;
  status: 'Entregado' | 'En camino' | 'Pendiente' | 'Devuelto' | 'Reembolsado';
  deliveryDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // Mock Data
  private readonly MOCK_PRODUCTS: Product[] = [
    {
      id: '1',
      title: 'Auriculares Inalámbricos Sony con Cancelación de Ruido',
      price: 249.99,
      rating: 4.8,
      reviews: 12500,
      image: 'https://picsum.photos/id/1/400/400',
      category: 'Electrónica',
      description: 'Experimenta un sonido inmersivo con la mejor cancelación de ruido de la industria. Batería de larga duración y comodidad excepcional.',
      isPrime: true,
      bestseller: true
    },
    {
      id: '2',
      title: 'Apple iPad Air (5ª generación) - Azul',
      price: 559.00,
      rating: 4.9,
      reviews: 3400,
      image: 'https://picsum.photos/id/119/400/400',
      category: 'Electrónica',
      description: 'Pantalla Liquid Retina de 10.9 pulgadas, chip M1, Touch ID y soporte para Apple Pencil.',
      isPrime: true,
      bestseller: false
    },
    {
      id: '3',
      title: 'Juego de Sartenes Antiadherentes T-fal',
      price: 89.99,
      rating: 4.5,
      reviews: 890,
      image: 'https://picsum.photos/id/225/400/400',
      category: 'Hogar',
      description: 'Juego de cocina duradero con indicador de calor Thermo-Spot. Apto para lavavajillas.',
      isPrime: false,
      bestseller: true
    },
    {
      id: '4',
      title: 'Cámara DSLR Canon EOS Rebel T7',
      price: 479.00,
      rating: 4.7,
      reviews: 1500,
      image: 'https://picsum.photos/id/250/400/400',
      category: 'Electrónica',
      description: 'Sensor CMOS de 24.1 MP, Wi-Fi y NFC integrados. Ideal para principiantes en fotografía.',
      isPrime: true,
      bestseller: false
    },
    {
      id: '5',
      title: 'Cafetera Programable Oster 12 Tazas',
      price: 34.99,
      rating: 4.3,
      reviews: 5600,
      image: 'https://picsum.photos/id/425/400/400',
      category: 'Hogar',
      description: 'Prepara café delicioso fácilmente. Función de pausa para servir y selector de intensidad.',
      isPrime: true,
      bestseller: false
    },
    {
      id: '6',
      title: 'Mochila de Viaje Impermeable para Laptop',
      price: 29.99,
      rating: 4.6,
      reviews: 2100,
      image: 'https://picsum.photos/id/365/400/400',
      category: 'Moda',
      description: 'Mochila espaciosa con puerto de carga USB. Material resistente al agua y diseño ergonómico.',
      isPrime: true,
      bestseller: true
    },
    {
      id: '7',
      title: 'Monitor Gaming ASUS 27" 165Hz',
      price: 219.50,
      rating: 4.7,
      reviews: 980,
      image: 'https://picsum.photos/id/3/400/400',
      category: 'Electrónica',
      description: 'Monitor Full HD con tiempo de respuesta de 0.5ms y tecnología G-SYNC Compatible.',
      isPrime: true,
      bestseller: false
    },
    {
      id: '8',
      title: 'Libro: Hábitos Atómicos - James Clear',
      price: 18.00,
      rating: 5.0,
      reviews: 50000,
      image: 'https://picsum.photos/id/24/400/400',
      category: 'Libros',
      description: 'Una manera fácil y comprobada de construir buenos hábitos y romper los malos.',
      isPrime: true,
      bestseller: true
    },
    {
      id: '9',
      title: 'Zapatillas Running Nike Air Zoom',
      price: 120.00,
      rating: 4.6,
      reviews: 450,
      image: 'https://picsum.photos/id/103/400/400',
      category: 'Moda',
      description: 'Amortiguación reactiva y ajuste seguro para tus carreras diarias.',
      isPrime: false,
      bestseller: false
    }
  ];

  // State Signals
  readonly products = signal<Product[]>(this.MOCK_PRODUCTS);
  readonly cart = signal<CartItem[]>([]);
  readonly orders = signal<Order[]>([]);
  
  // Computed Signals
  readonly cartCount = computed(() => 
    this.cart().reduce((acc, item) => acc + item.quantity, 0)
  );
  
  readonly cartTotal = computed(() => 
    this.cart().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  constructor() {
    // Add a mock past order for demonstration attached to juanma@gmail.com
    this.addMockOrder();
  }

  private addMockOrder() {
    const mockOrder: Order = {
      id: '405-1234567-8901234',
      userEmail: 'juanma@gmail.com', // Assigned to example user
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      items: [this.MOCK_PRODUCTS[0] as CartItem],
      total: 249.99,
      status: 'Entregado',
      deliveryDate: new Date(Date.now() - 86400000 * 2)
    };
    // Mock item needs quantity
    mockOrder.items[0].quantity = 1;
    this.orders.set([mockOrder]);
  }

  addToCart(product: Product, qty: number = 1) {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...currentCart, { ...product, quantity: qty }];
    });
  }

  removeFromCart(productId: string) {
    this.cart.update(current => current.filter(item => item.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cart.update(current => 
      current.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  }

  clearCart() {
    this.cart.set([]);
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  searchProducts(term: string): Product[] {
    const lowerTerm = term.toLowerCase();
    return this.products().filter(p => 
      p.title.toLowerCase().includes(lowerTerm) || 
      p.category.toLowerCase().includes(lowerTerm)
    );
  }

  // --- Order Management ---

  createOrder(items: CartItem[], total: number, userEmail: string) {
    const newOrder: Order = {
      id: `405-${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 10000000)}`,
      userEmail: userEmail,
      date: new Date(),
      items: [...items], // Copy items
      total: total,
      status: 'En camino',
      deliveryDate: new Date(Date.now() + 86400000 * 2) // +2 days
    };

    this.orders.update(orders => [newOrder, ...orders]);
  }

  returnOrder(orderId: string) {
    this.orders.update(orders => 
      orders.map(o => o.id === orderId ? { ...o, status: 'Devuelto' } : o)
    );
  }
}
