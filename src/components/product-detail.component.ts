
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StoreService, Product } from '../services/store.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="bg-white min-h-screen pb-10">
      <!-- Breadcrumb Mock -->
      <div class="bg-gray-100 px-4 py-2 text-xs text-gray-500">
        <span class="hover:underline cursor-pointer">Electrónica</span> <span class="mx-1">&rsaquo;</span>
        <span class="hover:underline cursor-pointer">Audio</span> <span class="mx-1">&rsaquo;</span>
        <span class="font-bold text-gray-700">Auriculares</span>
      </div>

      <div class="max-w-[1400px] mx-auto p-4 grid grid-cols-1 md:grid-cols-10 gap-8">
        
        <!-- Image Gallery (Left) -->
        <div class="md:col-span-4 flex">
           <div class="flex flex-col gap-2 mr-4">
              <!-- Thumbnails -->
              <div class="border border-amazon-orange rounded p-1 cursor-pointer shadow-sm">
                 <img [src]="product()?.image" class="w-10 h-10 object-contain">
              </div>
              <div class="border border-gray-200 hover:border-amazon-orange rounded p-1 cursor-pointer">
                 <img [src]="product()?.image" class="w-10 h-10 object-contain opacity-50">
              </div>
           </div>
           <div class="flex-grow flex items-center justify-center">
              @if (product(); as prod) {
                <img [ngSrc]="prod.image" width="500" height="500" class="max-w-full max-h-[500px] object-contain">
              }
           </div>
        </div>

        <!-- Product Info (Middle) -->
        <div class="md:col-span-4 flex flex-col">
           @if (product(); as prod) {
             <h1 class="text-2xl font-medium text-gray-900 mb-2">{{ prod.title }}</h1>
             <div class="flex items-center text-sm mb-2 border-b border-gray-200 pb-4">
                <div class="text-amazon-orange mr-2">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star-half-stroke"></i>
                </div>
                <span class="text-blue-700 hover:underline cursor-pointer mr-4">{{ prod.reviews }} valoraciones</span>
             </div>

             <div class="mb-4">
               <div class="flex items-start text-red-700">
                  <span class="text-3xl font-medium">{{ Math.floor(prod.price) }}</span>
                  <span class="text-xs mt-1.5 align-top">,{{ getCents(prod.price) }}€</span>
               </div>
               <div class="text-gray-500 text-sm">
                 Entrega GRATIS: <span class="font-bold text-black">lunes, 25 de sept</span>
               </div>
             </div>

             <div class="mb-6">
                <h3 class="font-bold text-sm mb-2">Acerca de este producto</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 leading-6">
                   <li>{{ prod.description }}</li>
                   <li>Producto de alta calidad garantizada.</li>
                   <li>Envío rápido y seguro a toda España.</li>
                   <li>Garantía de devolución de 30 días.</li>
                </ul>
             </div>
           }
        </div>

        <!-- Buy Box (Right) -->
        <div class="md:col-span-2">
           <div class="border border-gray-300 rounded-lg p-4 shadow-sm text-sm">
              @if (product(); as prod) {
                <div class="text-amazon-blue text-xl font-medium mb-2">{{ prod.price.toFixed(2).replace('.', ',') }} €</div>
                <div class="text-gray-600 mb-4">
                  Entrega GRATIS <span class="font-bold text-black">lunes, 25 de sept</span> en tu primer pedido.
                </div>
                <div class="text-green-700 font-medium text-lg mb-4">En stock.</div>
                
                <div class="flex items-center gap-2 mb-4">
                   <label class="text-xs">Cantidad:</label>
                   <select class="border rounded bg-gray-100 p-1 text-sm shadow-sm">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                   </select>
                </div>

                <button (click)="addToCart()" class="w-full bg-amazon-yellow hover:bg-amazon-orange rounded-full py-2 mb-2 shadow-sm border border-yellow-500 transition-colors">
                  Añadir a la cesta
                </button>
                <button class="w-full bg-amazon-orange hover:bg-orange-500 rounded-full py-2 mb-4 shadow-sm border border-orange-600 transition-colors">
                  Comprar ya
                </button>

                <div class="text-xs text-gray-500">
                   <div class="grid grid-cols-2 gap-1 mb-1">
                      <span>Enviado por</span> <span>Amazonia</span>
                   </div>
                   <div class="grid grid-cols-2 gap-1">
                      <span>Vendido por</span> <span>Amazonia Services</span>
                   </div>
                </div>
              }
           </div>
        </div>

      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(StoreService);
  product = signal<Product | undefined>(undefined);
  Math = Math;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.product.set(this.store.getProductById(id));
      }
    });
  }

  getCents(price: number): string {
    const cents = Math.round((price % 1) * 100);
    return cents < 10 ? `0${cents}` : `${cents}`;
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.store.addToCart(product);
      alert('Producto añadido a la cesta');
    }
  }
}
