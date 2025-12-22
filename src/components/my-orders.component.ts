
import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  template: `
    <div class="bg-white min-h-screen pb-10">
      <div class="max-w-[1000px] mx-auto p-4 pt-6">
        
        <!-- Breadcrumbs -->
        <div class="text-sm text-blue-700 mb-4 hover:underline cursor-pointer">
          <a routerLink="/">Tu cuenta</a> <span class="text-gray-500 mx-1">›</span> <span class="text-amazon-orange">Mis pedidos</span>
        </div>

        <h1 class="text-3xl font-normal mb-6">Mis pedidos</h1>

        @if (!auth.currentUser()) {
           <!-- Guest State: Professional Login Prompt -->
           <div class="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-12 bg-white mt-8 shadow-sm">
              <h2 class="text-xl font-bold mb-4">Ver tus pedidos</h2>
              <p class="text-gray-600 mb-8 text-center max-w-md">Debes iniciar sesión para ver tu historial de pedidos, rastrear tus envíos en tiempo real y gestionar devoluciones de manera segura.</p>
              
              <div class="flex flex-col gap-3 w-full max-w-xs">
                 <a routerLink="/login" [queryParams]="{returnUrl: '/orders'}" class="bg-amazon-yellow hover:bg-amazon-orange border border-yellow-500 rounded-md shadow-sm px-4 py-2 text-sm text-black font-normal text-center transition-colors">
                    Iniciar sesión
                 </a>
                 <div class="text-center text-xs text-gray-500 my-2">Nuevo cliente? <a routerLink="/register" class="text-blue-700 hover:underline">Empieza aquí.</a></div>
              </div>
           </div>
        } @else {
           <!-- Logged In State -->
           
           <!-- Search Bar -->
           <div class="flex gap-2 mb-6 max-w-lg items-center">
              <label class="font-bold text-sm whitespace-nowrap hidden sm:block">Buscar pedidos:</label>
              <div class="flex-grow border border-gray-400 rounded-md flex overflow-hidden focus-within:ring-1 focus-within:ring-amazon-orange shadow-inner h-8">
                <div class="bg-gray-100 flex items-center px-2 border-r border-gray-400"><i class="fa-solid fa-magnifying-glass text-gray-500"></i></div>
                <input 
                  type="text" 
                  [(ngModel)]="searchTerm"
                  placeholder="Buscar en todos los pedidos" 
                  class="w-full px-2 py-1 outline-none text-sm"
                >
              </div>
              <button class="bg-gray-800 text-white px-5 py-1.5 rounded-full text-sm font-bold hover:bg-gray-700 h-8 flex items-center">Buscar</button>
           </div>

           <!-- Professional Tabs -->
           <div class="flex border-b border-gray-300 mb-6 text-sm overflow-x-auto">
             <div class="border-b-2 border-amazon-orange pb-3 px-2 font-bold cursor-pointer text-black whitespace-nowrap">Pedidos</div>
             <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer whitespace-nowrap">Comprar de nuevo</div>
             <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer whitespace-nowrap">Pedidos en curso</div>
             <div class="pb-3 px-4 text-blue-700 hover:text-amazon-orange hover:underline cursor-pointer whitespace-nowrap">Devoluciones</div>
           </div>

           <div class="mb-4 text-sm text-gray-700">
             <span class="font-bold">{{ filteredOrders().length }} pedidos</span> realizados en {{ currentYear }}
           </div>

           <!-- Orders List -->
           @if (filteredOrders().length === 0) {
              <div class="text-gray-700 border border-gray-200 rounded p-8 text-center bg-gray-50 shadow-inner">
                @if(searchTerm()) {
                   No se encontraron pedidos que coincidan con "<strong>{{searchTerm()}}</strong>".
                } @else {
                   No has realizado ningún pedido todavía con esta cuenta.
                   <a routerLink="/" class="text-blue-700 hover:underline block mt-2 font-bold">Empezar a comprar ofertas del día</a>
                }
              </div>
           } @else {
              <div class="flex flex-col gap-6">
                @for (order of filteredOrders(); track order.id) {
                  <div class="border border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors bg-white">
                    
                    <!-- Order Header -->
                    <div class="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-xs text-gray-600 border-b border-gray-200 gap-4">
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
                             <span class="text-blue-700 hover:underline hover:text-amazon-orange cursor-pointer">{{ auth.currentUser()?.name }}</span>
                          </div>
                       </div>
                       <div class="flex flex-col items-start md:items-end">
                          <span class="uppercase font-bold text-xs mb-1">N.º de pedido {{ order.id }}</span>
                          <div class="flex gap-2 text-blue-700 flex-wrap">
                             <span class="hover:underline hover:text-amazon-orange cursor-pointer">Ver detalles del pedido</span>
                             <span class="text-gray-300 hidden md:inline">|</span>
                             <span class="hover:underline hover:text-amazon-orange cursor-pointer">Ver factura</span>
                          </div>
                       </div>
                    </div>

                    <!-- Order Body -->
                    <div class="p-4 flex flex-col md:flex-row gap-6">
                       <div class="flex-grow">
                          <h3 class="font-bold text-lg mb-1" 
                              [class.text-green-700]="order.status === 'Entregado' || order.status === 'En camino'"
                              [class.text-red-700]="order.status === 'Devuelto'">
                              {{ order.status }} {{ order.status === 'Devuelto' ? '' : ((order.status === 'Entregado' ? 'el ' : 'previsto para el ') + (order.deliveryDate | date:'d MMM')) }}
                          </h3>
                          
                          @if(order.status === 'Devuelto') {
                             <div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 mb-4 text-sm text-gray-700">
                                <span class="font-bold">Devolución completada:</span> El reembolso de {{ order.total.toFixed(2) }}€ ha sido emitido.
                             </div>
                          } @else {
                             <p class="text-sm text-gray-600 mb-4">El paquete fue entregado en la recepción.</p>
                          }

                          @for (item of order.items; track item.id) {
                             <div class="flex gap-4 mb-4 items-start">
                                <div class="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-white border border-gray-100 p-1">
                                   <img [src]="item.image" class="max-w-full max-h-full object-contain">
                                </div>
                                <div class="flex flex-col">
                                   <a [routerLink]="['/product', item.id]" class="text-blue-700 hover:underline hover:text-amazon-orange font-bold text-sm line-clamp-2">{{ item.title }}</a>
                                   <p class="text-xs text-gray-500 mt-1">Vendido por: Amazonia Services</p>
                                   <p class="text-xs text-gray-500 font-bold mt-1 text-red-800">{{ item.price.toFixed(2).replace('.', ',') }} €</p>
                                   <div class="mt-2">
                                     <button class="bg-amazon-yellow hover:bg-amazon-orange border border-yellow-500 rounded-md px-3 py-1 text-xs shadow-sm transition-colors">
                                       <i class="fa-solid fa-arrows-rotate mr-1"></i> Comprar de nuevo
                                     </button>
                                   </div>
                                </div>
                             </div>
                          }
                       </div>

                       <!-- Action Buttons (Right Side) -->
                       <div class="flex flex-col gap-2 min-w-[220px]">
                          <button class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center text-black">
                             Rastrear paquete
                          </button>
                          
                          @if (order.status !== 'Devuelto') {
                            <button (click)="initiateReturn(order.id)" class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center text-black">
                               Devolver o reemplazar productos
                            </button>
                          } @else {
                             <button disabled class="w-full bg-gray-100 text-gray-400 border border-gray-200 rounded-lg py-1.5 text-sm shadow-sm text-center cursor-not-allowed">
                               Ver estado de devolución
                            </button>
                          }

                          <button class="w-full bg-white hover:bg-gray-100 border border-gray-300 rounded-lg py-1.5 text-sm shadow-sm transition-colors text-center text-black">
                             Escribir una opinión del producto
                          </button>
                       </div>
                    </div>

                  </div>
                }
              </div>
           }
        }

      </div>
      
      <!-- Fake Return Processing Modal (Visual) -->
      @if(isProcessingReturn()) {
         <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
               <i class="fa-solid fa-circle-notch fa-spin text-4xl text-amazon-orange mb-4"></i>
               <h3 class="font-bold text-lg mb-2">Procesando solicitud...</h3>
               <p class="text-sm text-gray-600">Generando etiqueta de devolución...</p>
            </div>
         </div>
      }

    </div>
  `
})
export class MyOrdersComponent {
  store = inject(StoreService);
  auth = inject(AuthService);
  
  searchTerm = signal('');
  isProcessingReturn = signal(false);
  currentYear = new Date().getFullYear();

  // Filter orders based on the current logged-in user's email AND search term
  filteredOrders = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return [];
    
    let orders = this.store.orders().filter(order => order.userEmail === user.email);
    
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
       orders = orders.filter(o => 
          o.id.includes(term) || 
          o.items.some(i => i.title.toLowerCase().includes(term))
       );
    }
    
    return orders;
  });

  initiateReturn(id: string) {
    if(confirm('¿Deseas devolver este pedido? Se generará una etiqueta de envío prepagada.')) {
      this.isProcessingReturn.set(true);
      
      // Simulate API delay for professional feel
      setTimeout(() => {
         this.store.returnOrder(id);
         this.isProcessingReturn.set(false);
      }, 1500);
    }
  }
}
