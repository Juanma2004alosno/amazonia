
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Button -->
    <button (click)="toggleOpen()" class="fixed bottom-6 right-6 bg-amazon-dark hover:bg-gray-800 text-white rounded-full p-4 shadow-2xl z-50 flex items-center gap-2 transition-transform transform hover:scale-105 border border-gray-600">
      <i class="fa-solid fa-robot text-2xl text-amazon-blue"></i>
      <span class="font-bold hidden md:inline">Asistente Amazonia</span>
    </button>

    <!-- Chat Window -->
    @if (isOpen()) {
      <div class="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-300 overflow-hidden">
        
        <!-- Header -->
        <div class="bg-amazon-light text-white p-4 flex justify-between items-center bg-gradient-to-r from-amazon-light to-amazon-dark">
           <div class="flex items-center gap-2">
              <i class="fa-solid fa-sparkles text-amazon-yellow"></i>
              <h3 class="font-bold">Asistente de Compras</h3>
           </div>
           <button (click)="toggleOpen()" class="text-gray-300 hover:text-white">
             <i class="fa-solid fa-xmark text-lg"></i>
           </button>
        </div>

        <!-- Messages -->
        <div class="flex-grow overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
           <div class="self-start bg-white border border-gray-200 p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-sm max-w-[90%] text-sm">
             ¡Hola! Soy tu asistente virtual impulsado por IA. ¿Buscas algo en especial o necesitas recomendaciones?
           </div>
           
           @for (msg of messages(); track $index) {
             <div [class.self-end]="msg.role === 'user'" 
                  [class.self-start]="msg.role === 'ai'"
                  class="p-3 rounded-lg shadow-sm max-w-[90%] text-sm mb-2"
                  [ngClass]="{
                    'bg-amazon-blue text-white rounded-tr-none': msg.role === 'user',
                    'bg-white border border-gray-200 rounded-tl-none': msg.role === 'ai'
                  }">
               {{ msg.text }}
             </div>
           }

           @if (isLoading()) {
             <div class="self-start text-gray-500 text-xs italic flex items-center gap-1 ml-2">
               <i class="fa-solid fa-circle-notch fa-spin"></i> Pensando...
             </div>
           }
        </div>

        <!-- Input -->
        <div class="p-3 bg-white border-t border-gray-200">
           <div class="flex gap-2">
              <input 
                type="text" 
                [(ngModel)]="currentInput" 
                (keyup.enter)="sendMessage()"
                placeholder="Escribe tu consulta..."
                class="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange bg-white text-black"
                [disabled]="isLoading()"
              >
              <button 
                (click)="sendMessage()" 
                [disabled]="isLoading() || !currentInput.trim()"
                class="bg-amazon-yellow text-amazon-dark rounded-full w-10 h-10 flex items-center justify-center hover:bg-amazon-orange disabled:opacity-50 transition-colors">
                 <i class="fa-solid fa-paper-plane"></i>
              </button>
           </div>
        </div>
      </div>
    }
  `
})
export class AiAssistantComponent {
  aiService = inject(AiService);
  
  isOpen = signal(false);
  isLoading = signal(false);
  currentInput = '';
  messages = signal<{role: 'user' | 'ai', text: string}[]>([]);

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  async sendMessage() {
    if (!this.currentInput.trim()) return;

    const userText = this.currentInput;
    this.currentInput = ''; // Clear input immediately
    
    // Add user message
    this.messages.update(msgs => [...msgs, { role: 'user', text: userText }]);
    
    this.isLoading.set(true);

    // Call AI
    const response = await this.aiService.askAssistant(userText);

    this.isLoading.set(false);
    this.messages.update(msgs => [...msgs, { role: 'ai', text: response }]);
  }
}
