
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai: GoogleGenAI;
  private model = 'gemini-2.5-flash';

  constructor(private storeService: StoreService) {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });
  }

  async askAssistant(userQuery: string): Promise<string> {
    const products = this.storeService.products();
    // Context with Euro symbol
    const productCatalog = products.map(p => `- ${p.title} (ID: ${p.id}, Precio: ${p.price}€, Categ: ${p.category})`).join('\n');

    const prompt = `
      Actúa como un asistente de ventas experto de Amazonia.
      Aquí está el catálogo de productos disponibles en la tienda:
      ${productCatalog}

      El usuario pregunta: "${userQuery}"

      Instrucciones:
      1. Recomienda productos del catálogo que coincidan con la solicitud.
      2. Sé amable, conciso y útil.
      3. IMPORTANTE: Menciona los precios SIEMPRE en Euros (€).
      4. Si no hay nada exacto, sugiere algo similar del catálogo.
      5. Responde en español.
      6. Mantén la respuesta breve (máximo 3 párrafos).
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt
      });
      return response.text || 'Lo siento, no pude procesar tu solicitud en este momento.';
    } catch (error) {
      console.error('AI Error:', error);
      return 'Hubo un error al conectar con el asistente inteligente. Por favor intenta más tarde.';
    }
  }
}
