
import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="bg-gray-100 min-h-screen p-4">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- Cart Items List -->
        <div class="lg:col-span-3 bg-white p-6 shadow-sm">
          <h1 class="text-3xl font-normal border-b pb-2 mb-4">Cesta</h1>
          
          @if (store.cart().length === 0) {
            <div class="py-8">
              <p class="mb-4">Tu cesta de Amazonia está vacía.</p>
              <a routerLink="/" class="text-blue-700 hover:underline text-sm hover:text-amazon-orange">Ver ofertas del día</a>
            </div>
          } @else {
            <div class="flex justify-end text-xs text-gray-600 mb-2 font-medium">Precio</div>
            
            @for (item of store.cart(); track item.id) {
              <div class="flex flex-col sm:flex-row border-t border-gray-200 py-4 gap-4">
                <div class="flex-shrink-0 cursor-pointer" [routerLink]="['/product', item.id]">
                   <img [ngSrc]="item.image" width="180" height="180" class="object-contain w-32 h-32 sm:w-44 sm:h-44">
                </div>
                
                <div class="flex-grow">
                   <a [routerLink]="['/product', item.id]" class="text-lg font-medium hover:underline hover:text-amazon-orange text-black line-clamp-2">
                     {{ item.title }}
                   </a>
                   <div class="text-green-700 text-xs mt-1 mb-1">En stock</div>
                   <div class="text-xs text-gray-500 mb-1">Elegible para envío GRATIS</div>
                   <div class="flex items-center gap-2 mt-2">
                      <select [value]="item.quantity" (change)="updateQty(item.id, $event)" class="bg-gray-100 border border-gray-300 rounded p-1 text-sm shadow-sm focus:ring-amazon-orange focus:border-amazon-orange">
                         @for (num of [1,2,3,4,5,6,7,8,9,10]; track num) {
                           <option [value]="num">{{ num }}</option>
                         }
                      </select>
                      <span class="text-gray-300">|</span>
                      <button (click)="removeItem(item.id)" class="text-blue-700 hover:underline text-xs">Eliminar</button>
                   </div>
                </div>
                
                <div class="font-bold text-lg text-right">
                   {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }} €
                </div>
              </div>
            }

            <div class="border-t border-gray-200 py-4 text-right">
               <span class="text-lg">Subtotal ({{ store.cartCount() }} productos): </span>
               <span class="text-xl font-bold">{{ store.cartTotal().toFixed(2).replace('.', ',') }} €</span>
            </div>
          }
        </div>

        <!-- Checkout Sidebar -->
        @if (store.cart().length > 0) {
          <div class="lg:col-span-1">
            <div class="bg-white p-4 shadow-sm sticky top-4">
               <div class="text-lg mb-4">
                  Subtotal ({{ store.cartCount() }} productos): 
                  <span class="font-bold block">{{ store.cartTotal().toFixed(2).replace('.', ',') }} €</span>
               </div>
               <div class="flex items-center gap-2 mb-4">
                  <input type="checkbox" id="gift" class="rounded text-amazon-orange focus:ring-amazon-orange">
                  <label for="gift" class="text-sm">Es un regalo</label>
               </div>
               <button routerLink="/checkout" class="w-full bg-amazon-yellow hover:bg-amazon-orange py-2 rounded-lg shadow-sm border border-yellow-500 text-sm mb-4 transition-colors">
                  Tramitar pedido
               </button>
            </div>
          </div>
        }

      </div>
    </div>
  `
})
export class CartComponent {
  store = inject(StoreService);

  updateQty(id: string, event: Event) {
    const qty = parseInt((event.target as HTMLSelectElement).value, 10);
    this.store.updateQuantity(id, qty);
  }

  removeItem(id: string) {
    this.store.removeFromCart(id);
  }
}
