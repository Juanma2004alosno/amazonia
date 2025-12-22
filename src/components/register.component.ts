
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
      
      <!-- Logo -->
      <a routerLink="/" class="mb-6">
        <span class="text-4xl font-bold tracking-tighter text-black">amazon<span class="text-amazon-orange">ia</span><span class="text-base text-black">.es</span></span>
      </a>

      <!-- Register Card -->
      <div class="w-full max-w-[350px] border border-gray-300 rounded p-6 shadow-sm">
        <h1 class="text-3xl font-normal mb-4">Crear cuenta</h1>

        <div class="mb-3">
          <label class="block text-sm font-bold mb-1">Tu nombre</label>
          <input 
            type="text" 
            [(ngModel)]="name"
            placeholder="Nombre y apellidos"
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner text-sm"
          >
        </div>

        <div class="mb-3">
          <label class="block text-sm font-bold mb-1">Correo electrónico</label>
          <input 
            type="email" 
            [(ngModel)]="email" 
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner"
          >
        </div>

        <div class="mb-3">
          <label class="block text-sm font-bold mb-1">Contraseña</label>
          <input 
            type="password" 
            [(ngModel)]="password" 
            placeholder="Debe tener al menos 6 caracteres"
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner mb-1"
          >
          <p class="text-xs text-gray-500"><i class="fa-solid fa-info-circle text-blue-600"></i> La contraseña debe contener al menos 6 caracteres.</p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-bold mb-1">Vuelve a escribir la contraseña</label>
          <input 
            type="password" 
            [(ngModel)]="confirmPassword" 
            class="w-full bg-white text-black border border-gray-400 rounded px-3 py-1.5 focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange outline-none shadow-inner"
          >
        </div>

        <button (click)="onRegister()" class="w-full bg-yellow-300 hover:bg-yellow-400 border border-yellow-500 rounded shadow-sm py-1.5 text-sm transition-colors mb-4">
          Crear tu cuenta de Amazonia
        </button>

        <p class="text-xs text-gray-700 leading-snug mb-6 border-b border-gray-200 pb-6">
          Al crear una cuenta, aceptas las <span class="text-blue-700 hover:underline cursor-pointer">Condiciones de uso</span> y el <span class="text-blue-700 hover:underline cursor-pointer">Aviso de privacidad</span> de Amazonia.
        </p>

        <div class="text-sm">
           ¿Ya tienes una cuenta? <a routerLink="/login" class="text-blue-700 hover:underline hover:text-amazon-orange">Iniciar sesión <i class="fa-solid fa-caret-right text-xs"></i></a>
        </div>
      </div>

    </div>
  `
})
export class RegisterComponent {
  auth = inject(AuthService);
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  onRegister() {
    if (this.password === this.confirmPassword) {
      this.auth.register(this.name, this.email, this.password);
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}
