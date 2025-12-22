
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Checkout Header -->
      <header class="bg-gray-100 border-b border-gray-300 p-4 flex items-center justify-between">
         <a routerLink="/" class="text-3xl font-bold tracking-tighter text-black">
           amazon<span class="text-amazon-orange">ia</span><span class="text-sm text-black font-normal">.es</span>
         </a>
         <h1 class="text-2xl font-normal text-gray-700">Tramitar pedido</h1>
         <div class="text-xs text-gray-500"><i class="fa-solid fa-lock text-gray-400"></i> Pago seguro</div>
      </header>

      <div class="max-w-[1100px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Steps -->
        <div class="lg:col-span-2">
           
           <!-- Step 1: Shipping Address -->
           <div class="mb-4 border-b border-gray-200 pb-4">
             <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-bold flex items-center gap-4">
                   <span [class.text-amazon-orange]="currentStep() === 1" [class.text-gray-500]="currentStep() !== 1">1 Dirección de envío</span>
                </h2>
                @if(currentStep() > 1) {
                  <button (click)="currentStep.set(1)" class="text-blue-700 hover:underline text-sm">Cambiar</button>
                }
             </div>
             
             @if(currentStep() === 1) {
               <div class="border border-gray-300 rounded p-4 bg-gray-50">
                  <div class="grid grid-cols-1 gap-4">
                     <div>
                        <label class="block text-sm font-bold mb-1">Nombre completo</label>
                        <input type="text" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange" [value]="auth.currentUser()?.name || ''">
                     </div>
                     <div>
                        <label class="block text-sm font-bold mb-1">Dirección</label>
                        <input type="text" placeholder="Calle y número" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 mb-2 focus:ring-amazon-orange focus:border-amazon-orange">
                        <input type="text" placeholder="Apartamento, suite, unidad, etc. (opcional)" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange">
                     </div>
                     <div class="grid grid-cols-2 gap-4">
                        <div>
                           <label class="block text-sm font-bold mb-1">Código Postal</label>
                           <input type="text" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange">
                        </div>
                        <div>
                           <label class="block text-sm font-bold mb-1">Ciudad</label>
                           <input type="text" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange">
                        </div>
                     </div>
                  </div>
                  <button (click)="nextStep()" class="mt-4 bg-amazon-yellow hover:bg-amazon-orange px-4 py-1.5 rounded-md border border-yellow-500 text-sm shadow-sm transition-colors">
                     Usar esta dirección
                  </button>
               </div>
             }
           </div>

           <!-- Step 2: Payment Method -->
           <div class="mb-4 border-b border-gray-200 pb-4">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-bold flex items-center gap-4">
                   <span [class.text-amazon-orange]="currentStep() === 2" [class.text-gray-500]="currentStep() !== 2">2 Método de pago</span>
                </h2>
                @if(currentStep() > 2) {
                  <button (click)="currentStep.set(2)" class="text-blue-700 hover:underline text-sm">Cambiar</button>
                }
             </div>

             @if(currentStep() === 2) {
               <div class="border border-gray-300 rounded p-4 bg-gray-50">
                  <div class="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                     <i class="fa-regular fa-credit-card text-2xl text-gray-600"></i>
                     <span class="font-bold text-sm">Añadir una tarjeta de crédito o débito</span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                     <div class="md:col-span-2">
                        <label class="block text-sm font-bold mb-1">Número de tarjeta</label>
                        <input type="text" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange">
                     </div>
                     <div>
                        <label class="block text-sm font-bold mb-1">Nombre en la tarjeta</label>
                        <input type="text" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange" [value]="auth.currentUser()?.name || ''">
                     </div>
                     <div>
                        <label class="block text-sm font-bold mb-1">Fecha de vencimiento</label>
                        <input type="text" placeholder="MM/AA" class="w-full bg-white text-black border border-gray-400 rounded px-2 py-1 focus:ring-amazon-orange focus:border-amazon-orange">
                     </div>
                  </div>

                  <button (click)="nextStep()" class="mt-4 bg-amazon-yellow hover:bg-amazon-orange px-4 py-1.5 rounded-md border border-yellow-500 text-sm shadow-sm transition-colors">
                     Usar este método de pago
                  </button>
               </div>
             }
           </div>

           <!-- Step 3: Review Items -->
           <div class="mb-4">
              <h2 class="text-lg font-bold flex items-center gap-4 mb-2">
                 <span [class.text-amazon-orange]="currentStep() === 3" [class.text-gray-500]="currentStep() !== 3">3 Revisar productos y envío</span>
              </h2>

              @if(currentStep() === 3) {
                 <div class="border border-gray-300 rounded p-4">
                    @for(item of store.cart(); track item.id) {
                       <div class="flex gap-4 mb-4">
                          <img [src]="item.image" class="w-20 h-20 object-contain border border-gray-200 p-1">
                          <div>
                             <h4 class="font-bold text-sm">{{item.title}}</h4>
                             <p class="text-sm text-red-700 font-bold">{{item.price.toFixed(2).replace('.', ',')}} €</p>
                             <p class="text-xs text-gray-500">Cantidad: {{item.quantity}}</p>
                             <p class="text-xs text-gray-500">Vendido por: Amazonia Services</p>
                          </div>
                       </div>
                    }

                    <div class="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                       <div>
                          <p class="text-sm font-bold text-green-700">Fecha de entrega estimada: lunes, 25 de sept</p>
                       </div>
                       <button (click)="placeOrder()" class="bg-amazon-yellow hover:bg-amazon-orange px-6 py-2 rounded-md border border-yellow-500 text-sm shadow-sm font-bold transition-colors">
                          Finalizar pedido
                       </button>
                    </div>
                 </div>
              }
           </div>

        </div>

        <!-- Right Column: Summary -->
        <div class="lg:col-span-1">
           <div class="border border-gray-300 rounded-lg p-4 bg-gray-50 sticky top-4">
              <button (click)="placeOrder()" [disabled]="currentStep() < 3" class="w-full bg-amazon-yellow hover:bg-amazon-orange disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 py-2 rounded-md border border-yellow-500 text-sm shadow-sm mb-4 transition-colors font-bold text-center block">
                 Finalizar pedido
              </button>
              
              <div class="text-xs text-center text-gray-600 mb-4 border-b border-gray-200 pb-4">
                 Al realizar tu pedido, aceptas las Condiciones de uso y el Aviso de privacidad de Amazonia.
              </div>

              <h3 class="font-bold text-lg mb-2">Resumen del pedido</h3>
              
              <div class="flex justify-between text-sm mb-1">
                 <span>Productos:</span>
                 <span>{{store.cartTotal().toFixed(2).replace('.', ',')}} €</span>
              </div>
              <div class="flex justify-between text-sm mb-1">
                 <span>Envío:</span>
                 <span>0,00 €</span>
              </div>
              <div class="flex justify-between text-sm mb-4 border-b border-gray-200 pb-2">
                 <span>Total antes de impuestos:</span>
                 <span>{{store.cartTotal().toFixed(2).replace('.', ',')}} €</span>
              </div>

              <div class="flex justify-between text-xl font-bold text-red-700">
                 <span>Total del pedido:</span>
                 <span>{{store.cartTotal().toFixed(2).replace('.', ',')}} €</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  `
})
export class CheckoutComponent {
  store = inject(StoreService);
  router = inject(Router);
  auth = inject(AuthService);
  currentStep = signal(1);

  nextStep() {
    this.currentStep.update(v => v + 1);
  }

  placeOrder() {
    const user = this.auth.currentUser();

    if (!user) {
      // Force login if not authenticated
      alert('Por favor, inicia sesión para completar tu pedido.');
      this.router.navigate(['/login']);
      return;
    }

    // Capture data before clearing
    const items = this.store.cart();
    const total = this.store.cartTotal();
    
    // Save order with user email
    this.store.createOrder(items, total, user.email);
    
    // Clear cart and redirect
    this.store.clearCart();
    this.router.navigate(['/order-confirmation']);
  }
}
