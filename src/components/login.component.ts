
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
      
      <!-- Logo -->
      <a routerLink="/" class="mb-6">
        <span class="text-4xl font-bold tracking-tighter text-black">amazon<span class="text-amazon-orange">ia</span><span class="text-base text-black">.es</span></span>
      </a>

      <!-- Login Card -->
      <div class="w-full max-w-[350px] border border-gray-300 rounded p-6 shadow-sm">
        <h1 class="text-3xl font-normal mb-4">Iniciar sesión</h1>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">Dirección de e-mail</label>
          <input 
            type="email" 
            [(ngModel)]="email" 
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner"
          >
        </div>

        <div class="mb-6">
          <label class="block text-sm font-bold mb-1">Contraseña</label>
          <input 
            type="password" 
            [(ngModel)]="password" 
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner"
          >
        </div>

        <button (click)="onLogin()" class="w-full bg-yellow-300 hover:bg-yellow-400 border border-yellow-500 rounded shadow-sm py-1.5 text-sm transition-colors mb-4">
          Continuar
        </button>

        <p class="text-xs text-gray-700 leading-snug mb-6">
          Al continuar, aceptas las <span class="text-blue-700 hover:underline cursor-pointer">Condiciones de uso</span> y el <span class="text-blue-700 hover:underline cursor-pointer">Aviso de privacidad</span> de Amazonia.
        </p>

        <div class="text-sm text-blue-700 hover:underline hover:text-amazon-orange cursor-pointer mb-6">
          <i class="fa-solid fa-caret-right text-gray-500 mr-1"></i> ¿Necesitas ayuda?
        </div>
      </div>

      <!-- Divider -->
      <div class="w-full max-w-[350px] relative my-6 text-center">
        <div class="absolute top-1/2 left-0 w-full border-t border-gray-300"></div>
        <span class="relative bg-white px-2 text-xs text-gray-500">¿Eres nuevo en Amazonia?</span>
      </div>

      <!-- Create Account Button -->
      <a routerLink="/register" class="w-full max-w-[350px] bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded shadow-sm py-1.5 text-sm text-center transition-colors block text-black">
        Crea tu cuenta de Amazonia
      </a>

      <!-- Footer -->
      <div class="mt-8 border-t border-gray-200 w-full max-w-[350px] pt-6 text-center">
         <div class="flex justify-center gap-4 text-xs text-blue-700 mb-2">
            <span class="hover:underline cursor-pointer">Condiciones de uso</span>
            <span class="hover:underline cursor-pointer">Aviso de privacidad</span>
            <span class="hover:underline cursor-pointer">Ayuda</span>
         </div>
         <p class="text-xs text-gray-500">&copy; 1996-2023, Amazonia.com, Inc. o sus afiliados</p>
      </div>

    </div>
  `
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  email = '';
  password = '';

  onLogin() {
    if (this.auth.login(this.email, this.password)) {
      // Professional Redirect: Check if there is a returnUrl
      const params = this.route.snapshot.queryParams;
      const returnUrl = params['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    } else {
      alert('Credenciales inválidas. Por favor intenta de nuevo.');
    }
  }
}
