import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  // Inicializamos el SDK con tu API Key
  private ai = new GoogleGenAI({ apiKey: 'AIzaSyCou8HPmTfs4Ln1fJJAkPFamzyU3DVxk38' });
  
  // Creamos una sesión de chat utilizando el modelo optimizado para texto y diálogos
  private chat = this.ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'Eres un asistente de programación experto, amable, conciso y hablas en español.'
    }
  });

  constructor() {}

  // Función para enviar un mensaje y recibir la respuesta de forma asíncrona
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text || 'No recibí una respuesta clara.';
    } catch (error) {
      console.error('Error al conectar con Gemini:', error);
      return 'Lo siento, ocurrió un error al procesar tu mensaje.';
    }
  }
}