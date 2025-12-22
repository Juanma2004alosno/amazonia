
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { ProductCardComponent } from './product-card.component';
import { AiAssistantComponent } from './ai-assistant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AiAssistantComponent],
  template: `
    <div class="max-w-[1500px] mx-auto bg-gray-100 min-h-screen pb-10 relative">
      
      <!-- Hero Banner -->
      <div class="relative w-full h-[250px] md:h-[400px] bg-gradient-to-b from-gray-400 to-gray-200">
        <img src="https://picsum.photos/seed/amazonhero/1500/600" alt="Banner" class="w-full h-full object-cover mask-image-bottom">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent"></div>
      </div>

      <!-- Content Grid (Overlapping Banner) -->
      <div class="relative z-10 -mt-20 md:-mt-60 px-4">
        
        <!-- Category Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-5 flex flex-col shadow-md">
            <h2 class="text-xl font-bold mb-4">Ofertas de Electrónica</h2>
            <img src="https://picsum.photos/id/1/300/300" class="flex-grow object-cover mb-2 cursor-pointer">
            <a href="#" class="text-blue-600 text-sm hover:underline hover:text-amazon-orange">Ver más</a>
          </div>
          <div class="bg-white p-5 flex flex-col shadow-md">
            <h2 class="text-xl font-bold mb-4">Renueva tu Hogar</h2>
            <img src="https://picsum.photos/id/425/300/300" class="flex-grow object-cover mb-2 cursor-pointer">
            <a href="#" class="text-blue-600 text-sm hover:underline hover:text-amazon-orange">Ver más</a>
          </div>
          <div class="bg-white p-5 flex flex-col shadow-md">
            <h2 class="text-xl font-bold mb-4">Moda para Todos</h2>
            <img src="https://picsum.photos/id/103/300/300" class="flex-grow object-cover mb-2 cursor-pointer">
            <a href="#" class="text-blue-600 text-sm hover:underline hover:text-amazon-orange">Ver más</a>
          </div>
          <div class="bg-white p-5 flex flex-col shadow-md justify-center items-center text-center">
            <h2 class="text-xl font-bold mb-4">Inicia sesión para una mejor experiencia</h2>
            <button class="bg-amazon-yellow w-full py-2 rounded-md font-bold shadow-sm mb-2 text-sm">Iniciar sesión de forma segura</button>
            <img src="https://picsum.photos/id/24/300/200" class="w-full h-32 object-cover mt-2">
          </div>
        </div>

        <!-- Product Grid -->
        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Selección del día</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             @for (product of store.products(); track product.id) {
               <app-product-card [product]="product"></app-product-card>
             }
          </div>
        </div>

      </div>
    </div>
    
    <app-ai-assistant></app-ai-assistant>
  `,
  styles: [`
    .mask-image-bottom {
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
    }
  `]
})
export class HomeComponent {
  store = inject(StoreService);
}
