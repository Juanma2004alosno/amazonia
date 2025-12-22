
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white flex flex-col items-center pt-10">
      
      <div class="max-w-[800px] w-full p-6 border border-green-600 rounded-lg bg-white mb-6 shadow-sm">
         <div class="flex items-center gap-4 mb-4">
            <i class="fa-solid fa-circle-check text-green-600 text-3xl"></i>
            <div>
               <h1 class="text-green-700 font-bold text-2xl">¡Gracias, tu pedido ha sido confirmado!</h1>
               <p class="text-sm text-gray-600">Te hemos enviado un correo electrónico de confirmación.</p>
            </div>
         </div>
         
         <div class="flex gap-4 text-sm mb-4">
            <span class="font-bold text-gray-700">Número de pedido:</span>
            <span class="text-gray-600">405-2342342-9384723</span>
         </div>

         <div class="flex gap-8 text-sm">
            <div>
               <div class="font-bold text-gray-700 mb-1">Fecha de entrega estimada:</div>
               <div class="text-green-700 font-bold">Lunes, 25 de septiembre</div>
            </div>
         </div>
      </div>

      <div class="max-w-[800px] w-full flex justify-end">
         <a routerLink="/" class="bg-amazon-yellow hover:bg-amazon-orange px-6 py-2 rounded shadow-sm border border-yellow-500 font-bold text-sm text-black transition-colors">
            Seguir comprando
         </a>
      </div>

    </div>
  `
})
export class OrderSuccessComponent {}
