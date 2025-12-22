
import { Component, input, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product, StoreService } from '../services/store.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="bg-white p-4 h-full flex flex-col border border-gray-200 hover:shadow-lg transition-shadow rounded-sm relative">
      @if (product().bestseller) {
        <div class="absolute top-0 left-0 bg-orange-600 text-white text-xs px-2 py-1 font-bold z-10 shadow-sm rounded-br-md">
          Más vendido
        </div>
      }
      
      <div class="bg-gray-50 flex items-center justify-center p-4 mb-2 cursor-pointer h-48" [routerLink]="['/product', product().id]">
        <img [ngSrc]="product().image" width="200" height="200" alt="{{product().title}}" class="max-h-full object-contain mix-blend-multiply">
      </div>

      <div class="flex-grow flex flex-col">
        <a [routerLink]="['/product', product().id]" class="text-base text-gray-900 font-medium hover:text-amazon-orange hover:underline line-clamp-2 mb-1 cursor-pointer">
          {{ product().title }}
        </a>

        <div class="flex items-center mb-1">
          <div class="text-amazon-orange text-sm mr-1">
            @for (star of [1,2,3,4,5]; track star) {
              <i class="fa-solid fa-star" [class.text-gray-300]="star > product().rating"></i>
            }
          </div>
          <span class="text-blue-600 text-xs hover:underline cursor-pointer">{{ product().reviews | number }}</span>
        </div>

        <!-- Euro Pricing Format -->
        <div class="text-2xl font-medium mb-1 relative flex items-start">
          <span>{{ Math.floor(product().price) }}</span>
          <span class="text-xs align-top mt-1">,{{ getCents(product().price) }}€</span>
        </div>

        @if (product().isPrime) {
          <div class="mb-2 flex items-center text-xs text-gray-500">
             <i class="fa-solid fa-check text-amazon-orange font-bold mr-1"></i> <span class="text-blue-600 font-bold italic">prime</span>
             <span class="ml-1">Entrega GRATIS</span>
          </div>
        }

        <div class="mt-auto">
           <button (click)="addToCart($event)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-sm py-1.5 rounded-full border border-yellow-500 shadow-sm">
             Añadir a la cesta
           </button>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  product = input.required<Product>();
  store = inject(StoreService);
  Math = Math;

  getCents(price: number): string {
    const cents = Math.round((price % 1) * 100);
    return cents < 10 ? `0${cents}` : `${cents}`;
  }

  addToCart(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.store.addToCart(this.product());
  }
}
