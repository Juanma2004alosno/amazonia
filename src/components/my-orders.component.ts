
import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="bg-white min-h-screen pb-10">
      <div class="max-w-[1000px] mx-auto p-4 pt-6">
        
        <!-- Breadcrumbs -->
        <div class="text-sm text-blue-700 mb-4 hover:underline cursor-pointer">
          <a routerLink="/auth-account">Tu cuenta</a> <span class="text-gray-500 mx-1">›</span> <span class="text-amazon-orange">Mis pedidos</span>
        </div>

        <h1 class="text-3xl font-normal mb-6">Mis pedidos</h1>

        <!-- Search Bar Mock -->
        <div class="flex gap-2 mb-6 max-w-md">
           <div class="flex-grow border border-gray-400 rounded-md flex overflow-hidden focus-within:ring-1 focus-within:ring-amazon-orange shadow-inner">
             <div class="bg-gray-100 flex items-center px-2 border-r border-gray-400"><i class="fa-solid fa-magnifying-glass text-gray-500"></i></div>
             <input type="text" placeholder="Buscar en todos los pedidos" class="w-full px-2 py-1.5 outline-none">
           </div>
           <button class="bg-gray-800 text-white px-6 py-1.5 rounded-full text-sm font-bold hover:bg-gray-700">Buscar pedidos</button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-300 mb-6 text-sm">
          <div class="border-b-2 border-amazon-orange pb-3 px-2 font-bold cursor-pointer text-black">Pedidos</div>
          <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer">Comprar de nuevo</div>
          <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer">Pedidos en curso</div>
          <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer">Devoluciones</div>
        </div>

        <!-- Orders List -->
        @if (store.orders().length === 0) {
           <div class="text-gray-700 border border-gray-200 rounded p-8 text-center bg-gray-50">
             No has realizado ningún pedido todavía.
             <a routerLink="/" class="text-blue-700 hover:underline block mt-2">Empezar a comprar</a>
           </div>
        } @else {
           <div class="flex flex-col gap-6">
             @for (order of store.orders(); track order.id) {
               <div class="border border-gray-300 rounded-lg overflow-hidden">
                 
                 <!-- Order Header -->
                 <div class="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-xs md:text-sm text-gray-600 border-b border-gray-200 gap-4">
                    <div class="flex gap-8">
                       <div class="flex flex-col">
                          <span class="uppercase font-bold text-xs mb-1">Pedido el</span>
                          <span class="text-gray-800">{{ order.date | date:'d MMM yyyy' }}</span>
                       </div>
                       <div class="flex flex-col">
                          <span class="uppercase font-bold text-xs mb-1">Total</span>
                          <span class="text-gray-800">{{ order.total.toFixed(2).replace('.', ',') }} €</span>
                       </div>
                       <div class="flex flex-col hidden sm:flex">
                          <span class="uppercase font-bold text-xs mb-1">Enviar a</span>
                          <span class="text-blue-700 hover:underline hover:text-amazon-orange cursor-pointer">Usuario Ejemplo</span>
                       </div>
                    </div>
                    <div class="flex flex-col items-end">
                       <span class="uppercase font-bold text-xs mb-1">N.º de pedido {{ order.id }}</span>
                       <div class="flex gap-2 text-blue-700">
                          <span class="hover:underline hover:text-amazon-orange cursor-pointer">Ver detalles del pedido</span>
                          <span class="text-gray-300">|</span>
                          <span class="hover:underline hover:text-amazon-orange cursor-pointer">Ver factura</span>
                       </div>
                    </div>
                 </div>

                 <!-- Order Body -->
                 <div class="p-4 flex flex-col md:flex-row gap-6">
                    <div class="flex-grow">
                       <h3 class="font-bold text-lg mb-2" 
                           [class.text-green-700]="order.status === 'Entregado' || order.status === 'En camino'"
                           [class.text-red-700]="order.status === 'Devuelto'">
                           {{ order.status }} {{ order.status === 'Devuelto' ? '' : ((order.status === 'Entregado' ? 'el ' : 'previsto para el ') + (order.deliveryDate | date:'d MMM')) }}
                       </h3>
                       
                       @if(order.status === 'Devuelto') {
                          <p class="text-sm text-gray-600 mb-4">El reembolso ha sido procesado a tu método de pago original.</p>
                       } @else {
                          <p class="text-sm text-gray-600 mb-4">El paquete fue entregado en la recepción.</p>
                       }

                       @for (item of order.items; track item.id) {
                          <div class="flex gap-4 mb-4">
                             <div class="w-24 h-24 flex items-center justify-center bg-white">
                                <img [src]="item.image" class="max-w-full max-h-full object-contain">
                             </div>
                             <div class="flex flex-col">
                                <a [routerLink]="['/product', item.id]" class="text-blue-700 hover:underline hover:text-amazon-orange font-medium line-clamp-2">{{ item.title }}</a>
                                <p class="text-xs text-gray-500 mt-1">Vendido por: Amazonia Services</p>
                                <p class="text-xs text-gray-500 font-bold mt-1">{{ item.price.toFixed(2).replace('.', ',') }} €</p>
                                <div class="mt-2">
                                  <button class="bg-amazon-yellow hover:bg-amazon-orange border border-yellow-500 rounded-md px-3 py-1 text-xs shadow-sm">
                                    <i class="fa-solid fa-arrows-rotate mr-1"></i> Comprar de nuevo
                                  </button>
                                </div>
                             </div>
                          </div>
                       }
                    </div>

                    <!-- Action Buttons (Right Side) -->
                    <div class="flex flex-col gap-2 min-w-[220px]">
                       <button class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center">
                          Rastrear paquete
                       </button>
                       
                       @if (order.status !== 'Devuelto') {
                         <button (click)="returnOrder(order.id)" class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center">
                            Devolver o reemplazar productos
                         </button>
                       } @else {
                          <button disabled class="w-full bg-gray-100 text-gray-400 border border-gray-200 rounded-lg py-1.5 text-sm shadow-sm text-center cursor-not-allowed">
                            Devolución completada
                         </button>
                       }

                       <button class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center">
                          Escribir una opinión del producto
                       </button>
                       <button class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center">
                          Ver archivo de pedidos
                       </button>
                    </div>
                 </div>

               </div>
             }
           </div>
        }

      </div>
    </div>
  `
})
export class MyOrdersComponent {
  store = inject(StoreService);

  returnOrder(id: string) {
    if(confirm('¿Estás seguro de que deseas iniciar la devolución de este pedido?')) {
      this.store.returnOrder(id);
      alert('La devolución se ha iniciado correctamente. Imprime la etiqueta enviada a tu correo.');
    }
  }
}
