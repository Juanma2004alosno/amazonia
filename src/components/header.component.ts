
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../services/store.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="bg-amazon-dark text-white font-sans">
      <!-- Top Bar -->
      <div class="flex items-center p-2 gap-2 md:gap-4">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center border border-transparent hover:border-white rounded p-1 cursor-pointer">
          <span class="text-2xl font-bold tracking-tighter">amazon<span class="text-amazon-yellow">ia</span><span class="text-sm text-white font-normal">.es</span></span>
        </a>

        <!-- Location (Spain) -->
        <div class="hidden md:flex flex-col items-start border border-transparent hover:border-white rounded p-1 cursor-pointer text-xs leading-tight min-w-[80px]">
          <span class="text-gray-300 ml-4">Enviar a</span>
          <div class="font-bold flex items-center">
            <i class="fa-solid fa-location-dot mr-1"></i> España
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex-grow flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-orange mx-2">
          <div class="bg-gray-200 text-gray-600 px-3 flex items-center text-xs border-r border-gray-300 cursor-pointer hover:bg-gray-300 rounded-l-md">
            Todos <i class="fa-solid fa-caret-down ml-1"></i>
          </div>
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            (keyup.enter)="onSearch()"
            class="flex-grow px-2 text-black outline-none" 
            placeholder="Buscar Amazonia.es"
          >
          <button (click)="onSearch()" class="bg-amazon-yellow hover:bg-amazon-orange px-4 text-amazon-dark transition-colors rounded-r-md">
            <i class="fa-solid fa-magnifying-glass text-xl"></i>
          </button>
        </div>

        <!-- Account / Login -->
        <div class="hidden md:flex flex-col border border-transparent hover:border-white rounded p-1 cursor-pointer text-xs leading-tight relative group">
          @if (auth.currentUser(); as user) {
            <span class="text-gray-100">Hola, {{ user.name }}</span>
            <span class="font-bold">Cuenta y listas <i class="fa-solid fa-caret-down text-gray-400"></i></span>
            
            <!-- Dropdown Menu (Simple Mock) -->
            <div class="absolute top-full right-0 w-48 bg-white text-black shadow-lg rounded-sm hidden group-hover:block z-50 p-2 mt-1 border border-gray-200">
               <div class="font-bold text-sm mb-2 border-b pb-1">Tu Cuenta</div>
               <a routerLink="/orders" class="block hover:underline text-sm py-1">Mis Pedidos</a>
               <a (click)="auth.logout()" class="block hover:underline text-sm py-1 text-amazon-blue">Cerrar sesión</a>
            </div>

          } @else {
            <a routerLink="/login" class="flex flex-col">
              <span class="text-gray-100">Hola, identifícate</span>
              <span class="font-bold">Cuenta y listas <i class="fa-solid fa-caret-down text-gray-400"></i></span>
            </a>
          }
        </div>

        <!-- Returns -->
        <a routerLink="/orders" class="hidden md:flex flex-col border border-transparent hover:border-white rounded p-1 cursor-pointer text-xs leading-tight">
          <span class="text-gray-100">Devoluciones</span>
          <span class="font-bold">y Pedidos</span>
        </a>

        <!-- Cart -->
        <a routerLink="/cart" class="flex items-end border border-transparent hover:border-white rounded p-2 cursor-pointer relative">
          <div class="relative">
            <span class="absolute -top-1 -right-1 text-amazon-orange font-bold text-base bg-amazon-dark rounded-full px-1 z-10">
              {{ store.cartCount() }}
            </span>
            <i class="fa-solid fa-cart-shopping text-3xl text-white"></i>
          </div>
          <span class="font-bold text-sm ml-1 mb-1 hidden md:inline">Cesta</span>
        </a>
      </div>

      <!-- Sub Navigation -->
      <div class="bg-amazon-light text-white text-sm flex items-center px-4 py-1 space-x-4 overflow-x-auto whitespace-nowrap">
        <div class="flex items-center font-bold cursor-pointer hover:text-gray-200">
          <i class="fa-solid fa-bars mr-1"></i> Todo
        </div>
        <a class="cursor-pointer border border-transparent hover:border-white px-1 py-0.5 rounded">Ofertas del Día</a>
        <a class="cursor-pointer border border-transparent hover:border-white px-1 py-0.5 rounded">Servicio al Cliente</a>
        <a class="cursor-pointer border border-transparent hover:border-white px-1 py-0.5 rounded">Listas</a>
        <a class="cursor-pointer border border-transparent hover:border-white px-1 py-0.5 rounded">Tarjetas de Regalo</a>
        <a class="cursor-pointer border border-transparent hover:border-white px-1 py-0.5 rounded">Vender</a>
      </div>
    </header>
  `
})
export class HeaderComponent {
  store = inject(StoreService);
  auth = inject(AuthService);
  router = inject(Router);
  searchTerm = '';

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    this.searchTerm = '';
  }
}
